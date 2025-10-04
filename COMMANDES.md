# 🛠️ Commandes Utiles - Site Nicolas Banic

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Installer une nouvelle dépendance
npm install nom-du-package

# Installer une dépendance de développement
npm install -D nom-du-package
```

## 🚀 Développement

```bash
# Lancer le serveur de développement
npm run dev

# Lancer sur un port spécifique
npm run dev -- -p 3001

# Lancer avec turbopack (plus rapide)
npm run dev -- --turbo
```

## 🏗️ Build & Production

```bash
# Build de production
npm run build

# Analyser le build
npm run build -- --profile

# Démarrer en mode production
npm start

# Lancer sur un port spécifique en production
npm start -- -p 3001
```

## 🧹 Nettoyage

```bash
# Nettoyer le cache Next.js
Remove-Item -Recurse -Force .next

# Nettoyer node_modules
Remove-Item -Recurse -Force node_modules

# Réinstaller les dépendances
Remove-Item -Recurse -Force node_modules
npm install

# Nettoyer tout et réinstaller
Remove-Item -Recurse -Force .next, node_modules
npm install
```

## 🔍 Analyse & Debug

```bash
# Analyser la taille du bundle
npm install -D @next/bundle-analyzer

# Vérifier les dépendances obsolètes
npm outdated

# Mettre à jour les dépendances
npm update

# Vérifier les vulnérabilités
npm audit

# Corriger les vulnérabilités automatiquement
npm audit fix
```

## 🎨 Linting & Formatting

```bash
# Installer ESLint (si pas déjà fait)
npm install -D eslint eslint-config-next

# Linter le code
npm run lint

# Corriger automatiquement les erreurs
npm run lint -- --fix

# Installer Prettier (optionnel)
npm install -D prettier eslint-config-prettier

# Formater le code avec Prettier
npx prettier --write .
```

## 🧪 Tests

```bash
# Installer Jest et React Testing Library
npm install -D jest @testing-library/react @testing-library/jest-dom

# Lancer les tests
npm test

# Lancer les tests en mode watch
npm test -- --watch

# Lancer les tests avec coverage
npm test -- --coverage
```

## 📊 Performance & SEO

```bash
# Analyser les performances avec Lighthouse
# (Ouvrir Chrome DevTools > Lighthouse)

# Générer un rapport de performance
npm run build
npm start
# Puis ouvrir http://localhost:3000 et lancer Lighthouse

# Vérifier le sitemap
# http://localhost:3000/sitemap.xml

# Vérifier le robots.txt
# http://localhost:3000/robots.txt
```

## 🚢 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer en preview
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Lister les déploiements
vercel ls
```

### Netlify

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter à Netlify
netlify login

# Déployer
netlify deploy

# Déployer en production
netlify deploy --prod
```

### Docker (Optionnel)

```bash
# Créer l'image Docker
docker build -t nicolasbanic-site .

# Lancer le container
docker run -p 3000:3000 nicolasbanic-site

# Avec docker-compose
docker-compose up -d
```

## 🔧 Configuration

### Variables d'environnement

```bash
# Créer le fichier .env.local
Copy-Item .env.example .env.local

# Éditer le fichier
notepad .env.local
```

### Next.js Config

```bash
# Éditer la configuration Next.js
notepad next.config.js

# Vérifier la configuration
npm run build
```

## 📝 Git

```bash
# Initialiser le repository
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit - Refonte complète"

# Ajouter le remote
git remote add origin https://github.com/nicolasbanic/siteperso.git

# Push vers GitHub
git push -u origin main

# Créer une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Merger une branche
git checkout main
git merge feature/nouvelle-fonctionnalite

# Voir l'historique
git log --oneline --graph
```

## 🖼️ Images

```bash
# Optimiser les images avec sharp
npm install sharp

# Convertir les images en WebP
npx @squoosh/cli --webp auto images/*.jpg

# Optimiser les SVG
npm install -g svgo
svgo public/images/*.svg
```

## 📦 Dépendances Principales

```bash
# Next.js
npm install next@latest react@latest react-dom@latest

# TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Lucide Icons
npm install lucide-react

# Framer Motion (animations avancées)
npm install framer-motion
```

## 🔐 Sécurité

```bash
# Vérifier les vulnérabilités
npm audit

# Corriger les vulnérabilités
npm audit fix

# Corriger les vulnérabilités (force)
npm audit fix --force

# Mettre à jour les dépendances de sécurité
npm update
```

## 📊 Monitoring

```bash
# Installer Sentry (monitoring d'erreurs)
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs

# Installer Plausible (analytics)
npm install next-plausible

# Installer Google Analytics
npm install @next/third-parties
```

## 🎯 Commandes Personnalisées

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build",
    "clean": "rm -rf .next node_modules",
    "reinstall": "npm run clean && npm install",
    "export": "next build && next export",
    "type-check": "tsc --noEmit"
  }
}
```

## 🆘 Dépannage

### Erreur de build

```bash
# Nettoyer et rebuilder
Remove-Item -Recurse -Force .next
npm run build
```

### Erreur de dépendances

```bash
# Supprimer le lock file et réinstaller
Remove-Item package-lock.json
Remove-Item -Recurse -Force node_modules
npm install
```

### Port déjà utilisé

```bash
# Trouver le processus qui utilise le port 3000
netstat -ano | findstr :3000

# Tuer le processus (remplacer PID par l'ID du processus)
taskkill /PID <PID> /F

# Ou utiliser un autre port
npm run dev -- -p 3001
```

### Problème de cache

```bash
# Nettoyer tous les caches
Remove-Item -Recurse -Force .next, node_modules/.cache
npm run dev
```

## 📚 Ressources

- [Next.js CLI](https://nextjs.org/docs/api-reference/cli)
- [npm Documentation](https://docs.npmjs.com/)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Git Documentation](https://git-scm.com/doc)

---

**Dernière mise à jour** : Janvier 2025