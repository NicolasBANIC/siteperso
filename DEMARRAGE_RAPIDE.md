# 🚀 Guide de Démarrage Rapide

## ⚡ Installation et Lancement (5 minutes)

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le serveur de développement
```bash
npm run dev
```

Le site sera accessible sur **http://localhost:3000**

### 3. Vérifier que tout fonctionne
- ✅ Header sticky avec logo NB
- ✅ Navigation fluide entre les pages
- ✅ Animations au scroll
- ✅ Formulaires de contact et devis
- ✅ Portfolio avec filtres
- ✅ Dark mode cohérent

---

## 📋 Checklist Avant Déploiement

### Images à Remplacer
- [ ] **Logo OpenGraph** : Créer `public/og-image.jpg` (1200x630px)
- [ ] **Favicon** : Remplacer `public/favicon.ico` avec votre logo
- [ ] **Photos de projets** : Remplacer les placeholders dans `public/images/`
- [ ] **Photo de profil** : Remplacer `public/images/avatar.jpg`

### Configuration
- [ ] **Variables d'environnement** : Copier `.env.example` vers `.env.local`
- [ ] **Informations de contact** : Vérifier dans `src/app/contact/page.jsx`
- [ ] **Liens réseaux sociaux** : Vérifier dans `src/components/Footer.jsx`
- [ ] **Metadata SEO** : Vérifier dans `src/app/layout.jsx`

### Tests
- [ ] **Lighthouse** : Lancer `npm run build` puis tester avec Lighthouse
- [ ] **Responsive** : Tester sur mobile, tablette, desktop
- [ ] **Formulaires** : Tester validation et soumission
- [ ] **Navigation** : Vérifier tous les liens
- [ ] **Accessibilité** : Tester navigation au clavier

---

## 🎨 Personnalisation Rapide

### Changer les Couleurs
Modifier les variables CSS dans `src/app/globals.css` :
```css
:root {
  --color-primary: #0047AB;      /* Bleu roi */
  --color-secondary: #006D77;    /* Bleu pétrole */
  --color-accent: #00FF41;       /* Vert Matrix */
  --color-dark: #111827;         /* Gris anthracite */
}
```

### Modifier le Contenu
- **Accueil** : `src/app/page.jsx`
- **Services** : `src/app/services/page.jsx`
- **Portfolio** : `src/app/portfolio/page.jsx`
- **À propos** : `src/app/apropos/page.jsx`
- **Tarifs** : `src/app/tarifs/page.jsx`

### Ajouter une Nouvelle Page
1. Créer un dossier dans `src/app/` (ex: `blog/`)
2. Créer `page.jsx` dans ce dossier
3. Utiliser les composants `Container` et `Section`
4. Ajouter le lien dans `Header.jsx`

---

## 🚀 Déploiement sur Vercel (Recommandé)

### Méthode 1 : Via GitHub (Automatique)
1. Pusher le code sur GitHub
2. Aller sur [vercel.com](https://vercel.com)
3. Cliquer sur "Import Project"
4. Sélectionner votre repository
5. Vercel détecte automatiquement Next.js
6. Cliquer sur "Deploy"

### Méthode 2 : Via CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

### Configuration Vercel
- **Framework Preset** : Next.js
- **Build Command** : `npm run build`
- **Output Directory** : `.next`
- **Install Command** : `npm install`

---

## 📊 Commandes Utiles

```bash
# Développement
npm run dev              # Lancer le serveur de développement

# Production
npm run build            # Créer le build de production
npm start                # Lancer le serveur de production

# Qualité du code
npm run lint             # Vérifier le code avec ESLint

# Nettoyage
rm -rf .next node_modules  # Nettoyer et réinstaller
npm install
```

---

## 🔧 Configuration des Formulaires

### Option 1 : Formspree (Gratuit, Simple)
1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un formulaire et copier l'endpoint
3. Modifier `FormulaireContact.jsx` et `FormulaireDevis.jsx` :
```javascript
const response = await fetch('https://formspree.io/f/VOTRE_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

### Option 2 : API Route Next.js + Nodemailer
1. Créer `src/app/api/contact/route.js`
2. Installer nodemailer : `npm install nodemailer`
3. Configurer l'envoi d'emails (voir documentation)

### Option 3 : Service tiers (EmailJS, SendGrid, etc.)
Voir la documentation du service choisi

---

## 📱 Tester le Site

### En Local
```bash
npm run dev
# Ouvrir http://localhost:3000
```

### Build de Production
```bash
npm run build
npm start
# Ouvrir http://localhost:3000
```

### Lighthouse (Performance)
1. Ouvrir Chrome DevTools (F12)
2. Aller dans l'onglet "Lighthouse"
3. Sélectionner "Desktop" ou "Mobile"
4. Cliquer sur "Generate report"
5. **Objectif : Score > 90 sur tous les critères**

---

## 🆘 Problèmes Courants

### Le serveur ne démarre pas
```bash
# Nettoyer et réinstaller
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Les images ne s'affichent pas
- Vérifier que les images sont dans `public/images/`
- Vérifier les chemins dans les composants (ex: `/images/logo.png`)
- Vérifier `next.config.js` pour la configuration des images

### Les animations ne fonctionnent pas
- Vérifier que `ScrollReveal.jsx` est bien importé
- Vérifier la console pour les erreurs JavaScript
- Tester avec `prefers-reduced-motion` désactivé

### Erreur de build
```bash
# Vérifier les erreurs
npm run build

# Si erreur TypeScript/ESLint
npm run lint
```

---

## 📚 Documentation Complète

Pour plus de détails, consultez :
- **README.md** : Vue d'ensemble du projet
- **REFONTE_COMPLETE.md** : Documentation technique exhaustive
- **CHECKLIST.md** : Liste de vérification complète
- **COMMANDES.md** : Toutes les commandes disponibles
- **ROADMAP.md** : Feuille de route et évolutions futures

---

## 🎯 Prochaines Étapes

1. **Remplacer les images placeholders**
2. **Configurer les formulaires** (Formspree ou API)
3. **Tester avec Lighthouse** (objectif >90)
4. **Déployer sur Vercel**
5. **Configurer le domaine** (nicolasbanic.dev)
6. **Soumettre le sitemap** à Google Search Console

---

## 💡 Conseils

- **Commit régulièrement** : `git add . && git commit -m "Description"`
- **Tester sur mobile** : Utiliser Chrome DevTools (F12 > Toggle device toolbar)
- **Optimiser les images** : Utiliser des formats WebP/AVIF
- **Surveiller la performance** : Lighthouse après chaque modification importante
- **Backup** : Pusher régulièrement sur GitHub

---

## 📞 Support

Pour toute question ou problème :
1. Consulter la documentation dans les fichiers `.md`
2. Vérifier la console du navigateur (F12)
3. Consulter la documentation Next.js : [nextjs.org/docs](https://nextjs.org/docs)
4. Consulter la documentation TailwindCSS : [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**Bon développement ! 🚀**