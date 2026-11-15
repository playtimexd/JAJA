# Petit Hibou — local voice (free, on this PC). Leave this window open while the child plays.
# 1. starts the voice server (Whisper + Ollama qwen3 + Kokoro) on port 5190
# 2. opens a free Cloudflare HTTPS tunnel (the iPad microphone needs https)
# 3. tells the voice worker the tunnel address, so the game finds this PC by itself
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $here
$secrets = Join-Path $root '.secrets'
New-Item -ItemType Directory -Force $secrets | Out-Null
$cfg = Join-Path $root 'js\config.js'
$workerUrl = (Select-String -Path $cfg -Pattern "VOICE_URL = '([^']*)'").Matches[0].Groups[1].Value
$secretFile = Join-Path $secrets 'local-secret.txt'

Write-Host '🦉 Petit Hibou — voix locale' -ForegroundColor Magenta
$server = Start-Process -PassThru -NoNewWindow -FilePath (Join-Path $here '.venv\Scripts\python.exe') `
  -ArgumentList '-m', 'uvicorn', 'server:app', '--host', '127.0.0.1', '--port', '5190' -WorkingDirectory $here

$log = Join-Path $env:TEMP 'hibou-tunnel.log'
if (Test-Path $log) { Remove-Item $log }
$tunnel = Start-Process -PassThru -WindowStyle Hidden -FilePath 'cloudflared' `
  -ArgumentList '--config', (Join-Path $here 'tunnel-empty.yml'), 'tunnel', '--no-autoupdate', '--url', 'http://127.0.0.1:5190' -RedirectStandardError $log

$url = $null
for ($i = 0; $i -lt 60 -and -not $url; $i++) {
  Start-Sleep -Seconds 1
  if (Test-Path $log) { $m = Select-String -Path $log -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' | Select-Object -First 1; if ($m) { $url = $m.Matches[0].Value } }
}
if (-not $url) { Write-Host "Tunnel: pas d'adresse (voir $log)" -ForegroundColor Red }
else {
  Write-Host "Tunnel: $url" -ForegroundColor Green
  if ($workerUrl -and (Test-Path $secretFile)) {
    $secret = (Get-Content $secretFile -Raw).Trim()
    try {
      Invoke-RestMethod -Method Post -Uri "$workerUrl/local-register" -Headers @{ 'x-local-secret' = $secret } -ContentType 'application/json' -Body (@{ url = $url } | ConvertTo-Json) | Out-Null
      Write-Host 'Le jeu trouvera ce PC automatiquement. ✔' -ForegroundColor Green
    } catch { Write-Host "Enregistrement auprès du worker impossible: $_" -ForegroundColor Yellow }
  } else { Write-Host 'Worker pas encore configuré : le jeu utilisera seulement OpenAI.' -ForegroundColor Yellow }
}
Write-Host 'Fermer cette fenêtre (ou Ctrl+C) arrête la voix locale.'
try { Wait-Process -Id $server.Id } finally { Stop-Process -Id $tunnel.Id -ErrorAction SilentlyContinue }
