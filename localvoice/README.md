# Voix locale (PC familial, gratuit)
Whisper (écoute) + Ollama qwen3:8b (réponse) + Kokoro (voix) — anglais, français, chinois.

Installation (déjà faite sur ce PC) :
```
python -m venv .venv
.venv\Scripts\python -m pip install faster-whisper fastapi "uvicorn[standard]" python-multipart httpx soundfile
.venv\Scripts\python -m pip install torch --index-url https://download.pytorch.org/whl/cu124
.venv\Scripts\python -m pip install "kokoro>=0.9.4" "misaki[zh]"
```
Lancer : clic droit `start.ps1` → Exécuter avec PowerShell (garder la fenêtre ouverte). Ollama doit tourner.
Le script ouvre un tunnel HTTPS gratuit (cloudflared) et donne son adresse au worker, pour que le jeu trouve le PC tout seul.
Mesuré : ~1–1,5 s par réponse (RTX 3090 Ti).
