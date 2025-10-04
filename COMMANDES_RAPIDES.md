# ⚡ COMMANDES RAPIDES - VITRINE TECHNOLOGIQUE

## 🚀 DÉVELOPPEMENT

```bash
# Démarrer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
# http://localhost:3000
```

## 🔨 BUILD & PRODUCTION

```bash
# Build production
npm run build

# Démarrer en mode production
npm start

# Analyser le bundle
npm run build -- --analyze
```

## 🧪 TESTS & QUALITÉ

```bash
# Linter (ESLint)
npm run lint

# Formater le code (Prettier)
npm run format

# Vérifier les types TypeScript
npm run type-check
```

## 📦 GESTION DES DÉPENDANCES

```bash
# Installer les dépendances
npm install

# Mettre à jour les dépendances
npm update

# Vérifier les dépendances obsolètes
npm outdated

# Nettoyer node_modules et réinstaller
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

## 🎨 GÉNÉRATION D'IMAGES

### Images Prioritaires à Générer

1. **tech-showcase-bg.jpg** (1920x1080)
   - Fond abstrait technologique
   - Couleurs : Bleu Roi + Vert Matrix
   - Style : Futuriste, lignes de code, particules

2. **portfolio-webapp-crm.jpg** (800x600)
   - Interface CRM moderne
   - Dashboard avec graphiques
   - Style : Professionnel, épuré

3. **portfolio-restaurant-booking.jpg** (800x600)
   - Interface de réservation restaurant
   - Calendrier + formulaire
   - Style : Élégant, gastronomique

4. **mesh-gradient-1.jpg** (1920x1080)
   - Gradient mesh animé
   - Couleurs : Bleu Roi → Bleu Pétrole → Vert Matrix
   - Style : Fluide, moderne

5. **code-editor-mockup.jpg** (1200x800)
   - Éditeur de code VS Code
   - Code React/Next.js visible
   - Style : Dark mode, Matrix green accents

### Commande ChatGPT pour Génération

```
Génère une image [DESCRIPTION] avec les caractéristiques suivantes :
- Dimensions : [WIDTH]x[HEIGHT]
- Palette : Bleu Roi (#0047AB), Bleu Pétrole (#006D77), Vert Matrix (#00FF41)
- Style : Moderne, technologique, professionnel
- Format : JPG optimisé pour le web
- Nom du fichier : [FILENAME]
```

## 📸 OPTIMISATION D'IMAGES

```bash
# Avec TinyPNG (en ligne)
# https://tinypng.com/

# Avec Squoosh (en ligne)
# https://squoosh.app/

# Avec ImageMagick (local)
magick convert input.jpg -quality 85 -resize 1920x1080 output.jpg

# Convertir en WebP
magick convert input.jpg -quality 85 output.webp
```

## 🌐 DÉPLOIEMENT VERCEL

```bash
# Installer Vercel CLI
npm install -g vercel

# Login Vercel
vercel login

# Déployer en preview
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs
```

## 🔍 AUDIT LIGHTHOUSE

```bash
# Avec Chrome DevTools
# 1. Ouvrir DevTools (F12)
# 2. Onglet "Lighthouse"
# 3. Sélectionner "Performance, Accessibility, Best Practices, SEO"
# 4. Cliquer "Analyze page load"

# Avec Lighthouse CLI
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

## 🐛 DEBUGGING

```bash
# Voir les logs en temps réel
npm run dev

# Nettoyer le cache Next.js
Remove-Item -Recurse -Force .next
npm run dev

# Vérifier les erreurs de build
npm run build 2>&1 | Out-File -FilePath build-errors.log
```

## 📊 ANALYSE DU BUNDLE

```bash
# Installer l'analyseur
npm install --save-dev @next/bundle-analyzer

# Ajouter dans next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... config
})

# Analyser
$env:ANALYZE="true"; npm run build
```

## 🔐 VARIABLES D'ENVIRONNEMENT

```bash
# Créer .env.local
New-Item -Path .env.local -ItemType File

# Exemple de contenu
NEXT_PUBLIC_SITE_URL=https://bandev.fr
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
EMAIL_SERVER=smtp.gmail.com
EMAIL_FROM=bcnicolaspro@gmail.com
```

## 📝 GIT WORKFLOW

```bash
# Statut
git status

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "feat: add technological showcase components"

# Push
git push origin main

# Créer une branche
git checkout -b feature/new-component

# Merger une branche
git checkout main
git merge feature/new-component
```

## 🧹 NETTOYAGE

```bash
# Nettoyer tous les caches
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install

# Nettoyer les fichiers temporaires
Remove-Item -Recurse -Force *.log
Remove-Item -Recurse -Force .DS_Store
```

## 📚 DOCUMENTATION

```bash
# Générer la documentation des composants
npm install --save-dev jsdoc
npx jsdoc -c jsdoc.json

# Générer le sitemap
npm run build
# Le sitemap est généré automatiquement dans /public/sitemap.xml
```

## 🎯 TESTS RAPIDES

### Test 1 : Animations
1. Ouvrir http://localhost:3000
2. Scroller lentement
3. Vérifier : scroll reveal, hover effects, shimmer

### Test 2 : Particules
1. Ouvrir la page d'accueil
2. Bouger la souris sur le hero
3. Vérifier : particules fuient, lignes vertes vers curseur

### Test 3 : Theme Toggle
1. Cliquer sur le bouton soleil/lune
2. Vérifier : rotation, glow, transition smooth

### Test 4 : Code Typing
1. Scroller jusqu'à "Innovation Technologique"
2. Vérifier : code s'écrit automatiquement, boucle

### Test 5 : Globe 3D
1. Scroller jusqu'à "Innovation Technologique"
2. Vérifier : globe tourne, points visibles, lignes lat/long

### Test 6 : Dashboard
1. Scroller jusqu'à "Innovation Technologique"
2. Vérifier : stats changent toutes les 2s, barres animées

### Test 7 : Responsive
1. Ouvrir DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Tester : Mobile (375px), Tablette (768px), Desktop (1920px)

## 🚨 TROUBLESHOOTING

### Erreur : "Module not found"
```bash
npm install
```

### Erreur : "Port 3000 already in use"
```bash
# Trouver le processus
Get-Process -Name "node" | Stop-Process -Force
npm run dev
```

### Erreur : "Hydration failed"
```bash
# Nettoyer le cache
Remove-Item -Recurse -Force .next
npm run dev
```

### Erreur : "Image optimization error"
```bash
# Vérifier que les images existent dans /public/images/
# Vérifier les chemins dans le code
```

### Performance lente
```bash
# Réduire le nombre de particules
# Éditer ParticlesBackground.jsx : particleCount = 50 (au lieu de 100)

# Désactiver les animations sur mobile
# Ajouter dans globals.css :
@media (max-width: 768px) {
  .animate-parallax,
  .animate-float {
    animation: none !important;
  }
}
```

## 📞 SUPPORT

- 📧 Email : bcnicolaspro@gmail.com
- 🌐 Site : https://bandev.fr
- 💼 LinkedIn : https://www.linkedin.com/in/nicolasbanic
- 🐙 GitHub : https://github.com/NicolasBANIC

---

**Dernière mise à jour** : Janvier 2025