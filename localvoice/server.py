"""Petit Hibou local voice server — runs on the family PC (GPU), costs nothing per minute.

  listen : faster-whisper  (speech -> text, en / fr / zh)
  think  : Ollama qwen3     (the owl's answer)
  speak  : Kokoro            (text -> natural voice, en / fr / zh)

Endpoints (CORS for the hosted game; header X-Family-Code if .secrets/family-code.txt exists):
  GET  /health
  POST /start  json {lang, instructions}                       -> {reply, audio}
  POST /talk   multipart audio=<file>, meta=<json {lang, instructions, history}> -> {heard, reply, audio}
  POST /tts    json {text, lang, rate}                          -> audio/wav
Run with start.ps1 (also opens a free HTTPS tunnel so the iPad can use the microphone).
"""
import base64, io, json, os, re, sys, tempfile, threading, time
from pathlib import Path

import httpx
import numpy as np
import soundfile as sf
from fastapi import FastAPI, File, Form, Header, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

ROOT = Path(__file__).resolve().parent.parent
CODE_FILE = ROOT / ".secrets" / "family-code.txt"
OLLAMA = os.environ.get("OLLAMA_URL", "http://127.0.0.1:11434")
LLM = os.environ.get("HIBOU_LLM", "qwen3:8b")
WHISPER = os.environ.get("HIBOU_WHISPER", "large-v3-turbo")
VOICES = {"en": ("a", "af_heart"), "fr": ("f", "ff_siwis"), "zh": ("z", "zf_xiaoxiao")}
TTS_LANG = {"en-CA": "en", "fr-CA": "fr", "zh-CN": "zh", "en": "en", "fr": "fr", "zh": "zh"}

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://(www\.)?zhangandrew\.com|https://playtimexd\.github\.io|http://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?",
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["content-type", "x-family-code"],
)

_lock = threading.Lock()
_whisper = None
_pipes = {}


def family_ok(code):
    if not CODE_FILE.exists():
        return True
    return (code or "").strip() == CODE_FILE.read_text(encoding="utf8").strip()


def whisper():
    global _whisper
    if _whisper is None:
        import torch  # noqa: F401  (loads the CUDA DLLs that ctranslate2 needs on Windows)
        from faster_whisper import WhisperModel
        try:
            _whisper = WhisperModel(WHISPER, device="cuda", compute_type="float16")
        except Exception as e:  # no GPU: still works, slower
            print("whisper on CPU:", e)
            _whisper = WhisperModel("small", device="cpu", compute_type="int8")
    return _whisper


def pipe(lang):
    if lang not in _pipes:
        from kokoro import KPipeline
        _pipes[lang] = KPipeline(lang_code=VOICES[lang][0], repo_id="hexgrad/Kokoro-82M")
    return _pipes[lang]


def speak_wav(text, lang, rate=1.0):
    lang = TTS_LANG.get(lang, "en")
    chunks = []
    with _lock:
        for _, _, audio in pipe(lang)(text, voice=VOICES[lang][1], speed=max(0.7, min(1.3, float(rate or 1)))):
            if audio is not None:
                chunks.append(audio.numpy() if hasattr(audio, "numpy") else np.asarray(audio))
    wav = np.concatenate(chunks) if chunks else np.zeros(2400, dtype=np.float32)
    buf = io.BytesIO()
    sf.write(buf, wav, 24000, format="WAV")
    return buf.getvalue()


def clean(text):
    text = re.sub(r"<think>.*?</think>", "", text, flags=re.S)
    text = re.sub(r"[*_#`]+", "", text)
    return text.strip()


def chat(instructions, history, lang):
    sys = instructions + "\n\nThis is a SPOKEN conversation: answer in 1–2 short sentences plus one question, no lists, no emoji, no markdown."
    msgs = [{"role": "system", "content": sys}]
    for m in history[-16:]:
        if m.get("role") in ("user", "assistant") and m.get("content"):
            msgs.append({"role": m["role"], "content": str(m["content"])[:600]})
    if len(msgs) == 1:
        msgs.append({"role": "user", "content": {"en": "(The child just arrived. Greet them and start.)", "fr": "(L'enfant vient d'arriver. Salue-le et commence.)", "zh": "（孩子刚来。跟孩子打招呼，开始活动。）"}[lang]})
    r = httpx.post(f"{OLLAMA}/api/chat", json={"model": LLM, "messages": msgs, "stream": False, "think": False,
                                              "options": {"temperature": 0.7, "num_predict": 160}}, timeout=60)
    r.raise_for_status()
    return clean(r.json()["message"]["content"])


@app.get("/health")
def health():
    return {"ok": True, "llm": LLM, "whisper": WHISPER, "code": CODE_FILE.exists()}


@app.post("/start")
async def start(req: Request, x_family_code: str = Header(None)):
    if not family_ok(x_family_code):
        raise HTTPException(401, "code")
    body = await req.json()
    lang = body.get("lang") if body.get("lang") in VOICES else "en"
    reply = chat(str(body.get("instructions", ""))[:6000], [], lang)
    return {"reply": reply, "audio": base64.b64encode(speak_wav(reply, lang)).decode()}


@app.post("/talk")
async def talk(audio: UploadFile = File(...), meta: str = Form(...), x_family_code: str = Header(None)):
    if not family_ok(x_family_code):
        raise HTTPException(401, "code")
    m = json.loads(meta)
    lang = m.get("lang") if m.get("lang") in VOICES else "en"
    data = await audio.read()
    t0 = time.time()
    with tempfile.NamedTemporaryFile(suffix=Path(audio.filename or "a.webm").suffix or ".webm", delete=False) as f:
        f.write(data)
        path = f.name
    try:
        with _lock:
            segs, _ = whisper().transcribe(path, language=lang, vad_filter=True, beam_size=5)
            heard = " ".join(s.text.strip() for s in segs).strip()
    finally:
        os.unlink(path)
    t1 = time.time()
    history = list(m.get("history") or [])
    if not heard:
        reply = {"en": "Sorry, I didn't hear you. Can you say it again?", "fr": "Oups, je ne t'ai pas entendu. Peux-tu répéter?", "zh": "我没听清楚，你能再说一遍吗？"}[lang]
    else:
        history.append({"role": "user", "content": heard})
        reply = chat(str(m.get("instructions", ""))[:6000], history, lang)
    t2 = time.time()
    wav = speak_wav(reply, lang)
    print(f"talk {lang}: stt {t1 - t0:.1f}s llm {t2 - t1:.1f}s tts {time.time() - t2:.1f}s | {heard!r} -> {reply!r}")
    return {"heard": heard, "reply": reply, "audio": base64.b64encode(wav).decode()}


@app.post("/tts")
async def tts(req: Request, x_family_code: str = Header(None)):
    if not family_ok(x_family_code):
        raise HTTPException(401, "code")
    body = await req.json()
    text = str(body.get("text", ""))[:1500]
    if not text:
        raise HTTPException(400, "text")
    return Response(speak_wav(text, body.get("lang", "en"), body.get("rate", 1)), media_type="audio/wav",
                    headers={"cache-control": "public, max-age=31536000"})


@app.on_event("startup")
def warm():
    def go():
        try:
            whisper()
            for l in VOICES:
                speak_wav({"en": "Hello!", "fr": "Bonjour!", "zh": "你好！"}[l], l)
            httpx.post(f"{OLLAMA}/api/chat", json={"model": LLM, "messages": [{"role": "user", "content": "hi"}], "stream": False, "think": False, "options": {"num_predict": 1}}, timeout=120)
            print("warm: ready")
        except Exception as e:
            print("warm failed:", e)
    threading.Thread(target=go, daemon=True).start()
