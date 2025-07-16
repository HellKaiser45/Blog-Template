# Blog Template (Qwik + QwikCity + Tailwind)

[![Qwik Version](https://img.shields.io/badge/Qwik-v1.2+-blue.svg)](https://qwik.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.3+-06B6D4.svg)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v3.9+-FF7AC1.svg)](https://daisyui.com/)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

Template de blog haute performance avec :

- ⚡ **Qwik** pour le chargement instantané
- 🎨 **Tailwind CSS + DaisyUI** pour le styling
- 🌐 **QwikCity** pour le routage SSR/SSG
- 🐳 **Docker** pour des déploiements simplifiés

## 🚀 Démarrage Rapide

# 1. Cloner le dépôt

`git clone https://github.com/HellKaiser45/Blog-Template.git`

`cd Blog-Template`

# 2. Installer les dépendances (avec Bun)

`bun install`

# 3. Lancer le dev server

`bun run dev`

Ouvrir : <http://localhost:5173>

🐳 Déploiement en Production (Docker)

```bash
# Build avec variable obligatoire
docker build --build-arg SITE_ORIGIN=https://votredomaine.com -t blog-template .

# Lancer le container
docker run -d -p 80:80 --name my-blog blog-template
```

🏗 Structure du Projet

```text
├── Dockerfile
├── tailwind.config.js  # Config Tailwind+DaisyUI
├── src/
│   ├── styles/
│   │   └── globals.css # Importe Tailwind
│   └── components/     # Composants avec classes Tailwind
└── public/             # Assets statiques
```
