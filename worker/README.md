# Serveur de voix — Petit Hibou (Cloudflare Worker)

Sert à deux choses quand le jeu est en ligne (https) :
- **Parle avec Hibou** : vraie conversation orale en anglais (OpenAI Realtime, WebRTC).
- **Voix naturelle** pour lire les questions (OpenAI TTS).

La clé OpenAI reste dans le Worker ; l’iPad reçoit seulement une clé de 2 minutes.

## Installation (une fois, ~10 min)
1. **OpenAI** — platform.openai.com → Billing : ajouter un crédit prépayé (ex. 10 $) et **mettre une limite mensuelle** (Limits → budget, ex. 15 $). Créer une clé API (Projects → API keys). Ne pas la coller dans le chat.
2. **Cloudflare** — créer un compte gratuit sur dash.cloudflare.com.
3. Dans ce dossier `worker/` :
   ```
   npx wrangler login
   npx wrangler secret put OPENAI_API_KEY     (coller la clé)
   npx wrangler secret put FAMILY_CODE        (inventer un code, ex. 8 chiffres)
   npx wrangler deploy
   ```
   Wrangler affiche l’adresse, ex. `https://petithibou-voice.<compte>.workers.dev`.
4. Donner l’URL à Claude (ou la mettre dans `js/config.js` → `VOICE_URL`).
5. Sur l’iPad : ⚙️ Parents → **Code familial** → entrer le code (une seule fois, gardé sur l’iPad).

## Coût (à vérifier sur openai.com/api/pricing)
- Conversation : modèle `gpt-realtime-2.1-mini` ≈ quelques cents par minute. Limite par défaut 15 min/jour (réglable dans Parents), 6 min max par conversation.
- Lecture des questions : `gpt-4o-mini-tts`, fractions de cent par phrase ; mise en cache pendant la séance.
- Cloudflare Worker : gratuit (100 000 requêtes/jour).

## Réglages
`wrangler.toml` : origines permises (zhangandrew.com, playtimexd.github.io), modèles et voix (`marin`, `cedar`, `coral`…).
