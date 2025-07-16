# Blog Template (Qwik + QwikCity + Tailwind)

[![Qwik Version](https://img.shields.io/badge/Qwik-v1.2+-blue.svg)](https://qwik.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.3+-06B6D4.svg)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v3.9+-FF7AC1.svg)](https://daisyui.com/)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

Un template de blog haute performance avec stack moderne.

## ✨ Fonctionnalités

- ⚡ **Qwik** pour le chargement instantané
- 🎨 **Tailwind CSS + DaisyUI** pour le styling
- 🌐 **QwikCity** pour le routage SSR/SSG
- 🐳 **Docker** pour des déploiements simplifiés
- 📱 Responsive design
- 🌗 Thèmes personnalisables

## 🏗 Structure du projet

```text
├── Dockerfile
├── tailwind.config.js    # Configuration Tailwind+DaisyUI
├── src/
│   ├── routes/           # Pages du blog
│   ├── components/       # Composants réutilisables
│   ├── styles/
│   │   └── globals.css   # Styles globaux et thème
│   └── layouts/          # Layouts principaux
└── public/               # Assets statiques
```

## 🚀 Démarrage

### Pré-requis

- [Node.js](https://nodejs.org/en/download/)
- Bun
- Docker (optionnel)

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/HellKaiser45/Blog-Template.git
cd Blog-Template

# 2. Installer les dépendances (avec Bun recommandé)
bun install

# 3. Lancer le serveur de développement
bun run dev
```

Ouvrir <http://localhost:5173> dans votre navigateur.

## Déploiement avec Docker

```bash
# Build de l'image (remplacer l'URL)
docker build --build-arg SITE_ORIGIN=votredomaine.com -t blog-template .

# Lancer le container
docker run -d -p 80:80 --name my-blog blog-template
```

## Personnalisation

1. Modifier le theme

- Éditez `src/globals.css`
- Référez-vous à la documentation DaisyUI

2. Ajouter du contenu

- Créez de nouveaux articles dans src/routes/articles/article-slug/index.mdx
- Utilisez les composants existants ou créez-en de nouveaux

## Ressources

- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Qwik](https://qwik.builder.io/)
