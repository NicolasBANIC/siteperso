# 🛠️ Commandes Utiles - Projet BANDEV

## 🚀 Développement

### Démarrer le serveur de développement
```bash
npm run dev
```
Ouvre http://localhost:3000

### Build de production
```bash
npm run build
```
Compile le projet pour la production

### Démarrer le serveur de production
```bash
npm run start
```
Lance le serveur avec le build de production

---

## 🧹 Qualité du Code

### Linter (ESLint)
```bash
# Vérifier les erreurs
npm run lint

# Corriger automatiquement
npm run lint:fix
```

### Formatter (Prettier)
```bash
# Vérifier le formatage
npm run format:check

# Formater automatiquement
npm run format
```

### Vérification TypeScript
```bash
npm run typecheck
```

### Tests complets
```bash
npm run test:all
```
Lance lint + typecheck + build

---

## 📊 Performance & SEO

### Lighthouse CI
```bash
npm run lighthouse
```
Lance les tests Lighthouse automatisés

### Analyser le bundle
```bash
npm run analyze
```
Génère un rapport de taille des bundles

---

## 🖼️ Optimisation des Assets

### Optimiser les SVG
```bash
npm run optimize:svg
```
Optimise tous les SVG dans `/public/images`

### Optimiser les images
```bash
npm run optimize:images
```
Compresse les images (nécessite script personnalisé)

---

## 🔍 Validation Zencoder

### Valider le projet
```bash
npm run validate
```
Lance les validations Zencoder (si configuré)

---

## 📦 Gestion des Dépendances

### Installer les dépendances
```bash
npm install
```

### Mettre à jour les dépendances
```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour (attention aux breaking changes)
npm update
```

### Installer une nouvelle dépendance
```bash
# Production
npm install <package-name>

# Développement
npm install -D <package-name>
```

---

## 🚀 Déploiement Vercel

### Déployer en preview
```bash
vercel
```

### Déployer en production
```bash
vercel --prod
```

### Lier le projet Vercel
```bash
vercel link
```

---

## 🐛 Debugging

### Nettoyer le cache Next.js
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next

# Puis rebuild
npm run build
```

### Nettoyer node_modules
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
npm install
```

### Vérifier les variables d'environnement
```bash
# Créer .env.local si nécessaire
# Ajouter vos variables :
# NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 📝 Git

### Commit avec message conventionnel
```bash
git add .
git commit -m "feat: ajouter composant Button accessible"
git push
```

### Types de commits recommandés
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, CSS
- `refactor:` Refactoring
- `perf:` Amélioration performance
- `test:` Tests
- `chore:` Maintenance

---

## 🎨 Tailwind CSS

### Générer les classes Tailwind
```bash
# Automatique avec npm run dev
# Mais si besoin de rebuild :
npx tailwindcss -i ./src/app/globals.css -o ./dist/output.css
```

### Purger les classes inutilisées
```bash
# Automatique en production avec npm run build
```

---

## 🔧 Utilitaires

### Créer un nouveau composant
```bash
# Créer le fichier
New-Item -Path "src/components/MonComposant.jsx" -ItemType File

# Ou avec TypeScript
New-Item -Path "src/components/MonComposant.tsx" -ItemType File
```

### Créer une nouvelle page
```bash
# Créer le dossier et le fichier
New-Item -Path "src/app/ma-page" -ItemType Directory
New-Item -Path "src/app/ma-page/page.jsx" -ItemType File
```

---

## 📊 Monitoring

### Vérifier les Core Web Vitals
1. Ouvrir Chrome DevTools (F12)
2. Onglet "Lighthouse"
3. Cocher "Performance", "Accessibility", "SEO"
4. Cliquer "Generate report"

### Tester sur mobile
1. Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Sélectionner un device (iPhone, Android)

---

## 🔐 Sécurité

### Vérifier les vulnérabilités
```bash
npm audit
```

### Corriger automatiquement
```bash
npm audit fix
```

### Corriger avec breaking changes
```bash
npm audit fix --force
```

---

## 📚 Documentation

### Générer la documentation
```bash
# Si JSDoc configuré
npx jsdoc -c jsdoc.json
```

### Lire la documentation Next.js
```bash
# Ouvrir dans le navigateur
start https://nextjs.org/docs
```

---

## 🎯 Raccourcis Utiles

### Développement rapide
```bash
# Tout en un : lint + typecheck + build
npm run test:all

# Si succès, déployer
vercel --prod
```

### Workflow recommandé
```bash
# 1. Développer
npm run dev

# 2. Vérifier
npm run lint:fix
npm run format

# 3. Tester
npm run build

# 4. Déployer
vercel --prod
```

---

## 🆘 En Cas de Problème

### Erreur de build
```bash
# 1. Nettoyer
Remove-Item -Recurse -Force .next

# 2. Rebuild
npm run build
```

### Erreur de dépendances
```bash
# 1. Supprimer node_modules
Remove-Item -Recurse -Force node_modules

# 2. Supprimer package-lock.json
Remove-Item package-lock.json

# 3. Réinstaller
npm install
```

### Port 3000 déjà utilisé
```bash
# Utiliser un autre port
$env:PORT=3001; npm run dev
```

---

## 📞 Ressources

- **Next.js Docs** : https://nextjs.org/docs
- **Tailwind CSS Docs** : https://tailwindcss.com/docs
- **Vercel Docs** : https://vercel.com/docs
- **React Docs** : https://react.dev
- **Framer Motion** : https://www.framer.com/motion/

---

**Dernière mise à jour** : $(date)
**Projet** : BANDEV - Site Vitrine Freelance
**Stack** : Next.js 15 + Tailwind v4 + Vercel