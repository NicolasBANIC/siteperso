# ✅ Checklist Finale - Avant Déploiement

## 🎨 Contenu et Images

### Images à Créer/Remplacer
- [ ] **Logo OpenGraph** : `public/og-image.jpg` (1200x630px) avec logo NB et texte
- [ ] **Favicon** : `public/favicon.ico` avec logo NB
- [ ] **Photo de profil** : `public/images/avatar.jpg` (votre photo professionnelle)
- [ ] **Photos de projets** : Remplacer les placeholders dans `public/images/`
  - [ ] `gtravaux.jpg`
  - [ ] `atelier-bois.jpg`
  - [ ] `atelier-metal.jpg`
  - [ ] `douceurs-lea.jpg`
  - [ ] `conseil-habitat.jpg`
  - [ ] `commerce.svg`
- [ ] **Hero image** : `public/images/hero-placeholder.jpg` (image d'accueil)

### Contenu Textuel
- [ ] Vérifier les informations de contact dans `src/app/contact/page.jsx`
- [ ] Vérifier les liens réseaux sociaux dans `src/components/Footer.jsx`
- [ ] Vérifier les tarifs dans `src/app/tarifs/page.jsx`
- [ ] Vérifier les témoignages dans `src/app/temoignages/page.jsx`
- [ ] Vérifier les projets dans `src/app/portfolio/page.jsx`
- [ ] Vérifier la bio dans `src/app/apropos/page.jsx`

---

## ⚙️ Configuration

### Variables d'Environnement
- [ ] Copier `.env.example` vers `.env.local`
- [ ] Remplir `NEXT_PUBLIC_SITE_URL` (ex: https://nicolasbanic.dev)
- [ ] Remplir `NEXT_PUBLIC_CONTACT_EMAIL`
- [ ] Remplir `NEXT_PUBLIC_CONTACT_PHONE`
- [ ] Remplir les liens réseaux sociaux (LinkedIn, GitHub, etc.)

### Metadata SEO
- [ ] Vérifier le titre du site dans `src/app/layout.jsx`
- [ ] Vérifier la description dans `src/app/layout.jsx`
- [ ] Vérifier les keywords dans `src/app/layout.jsx`
- [ ] Vérifier les informations JSON-LD (nom, email, localisation)
- [ ] Vérifier que `og-image.jpg` existe pour OpenGraph

### Configuration Next.js
- [ ] Vérifier `next.config.js` (images, compression, etc.)
- [ ] Vérifier que `robots.js` est configuré correctement
- [ ] Vérifier que `sitemap.js` contient toutes les pages

---

## 🧪 Tests Fonctionnels

### Navigation
- [ ] Header sticky fonctionne sur toutes les pages
- [ ] Menu mobile s'ouvre et se ferme correctement
- [ ] Tous les liens de navigation fonctionnent
- [ ] Le logo redirige vers l'accueil
- [ ] Le bouton "Back to Top" apparaît et fonctionne
- [ ] Les liens du footer fonctionnent

### Pages
- [ ] **Accueil** : Hero, services, processus, technologies, stats, CTA
- [ ] **Portfolio** : Filtres fonctionnent, modale s'ouvre/ferme
- [ ] **Services** : Toutes les cartes s'affichent correctement
- [ ] **Tarifs** : Les 3 formules + maintenance + services à la carte
- [ ] **À propos** : Photo, stats, parcours, compétences, valeurs
- [ ] **Témoignages** : Témoignages avec étoiles et stats
- [ ] **Devis** : Formulaire complet avec validation
- [ ] **Contact** : Formulaire + coordonnées + carte (si applicable)
- [ ] **Mentions légales** : Contenu complet et à jour
- [ ] **Politique de confidentialité** : Contenu RGPD conforme

### Formulaires
- [ ] **Contact** : Validation des champs fonctionne
- [ ] **Contact** : Messages d'erreur s'affichent
- [ ] **Contact** : Message de succès s'affiche
- [ ] **Devis** : Validation des champs fonctionne
- [ ] **Devis** : Tous les champs requis sont validés
- [ ] **Devis** : Format email et téléphone validés
- [ ] Configurer l'envoi réel des emails (Formspree, API, etc.)

### Animations et Interactions
- [ ] Logo tourne au survol
- [ ] Sections apparaissent au scroll (ScrollReveal)
- [ ] Hover states sur les boutons
- [ ] Hover states sur les cartes (scale, shadow)
- [ ] Transitions fluides entre les pages
- [ ] Animations respectent `prefers-reduced-motion`

---

## 📱 Tests Responsive

### Mobile (< 768px)
- [ ] Menu burger fonctionne
- [ ] Header reste lisible
- [ ] Toutes les sections s'adaptent
- [ ] Les formulaires sont utilisables
- [ ] Les images s'adaptent
- [ ] Le texte reste lisible
- [ ] Les boutons sont cliquables (taille suffisante)

### Tablette (768px - 1024px)
- [ ] Layout s'adapte correctement
- [ ] Navigation reste fluide
- [ ] Grilles de cartes s'adaptent
- [ ] Images conservent leurs proportions

### Desktop (> 1024px)
- [ ] Layout utilise bien l'espace
- [ ] Container ne dépasse pas 1280px
- [ ] Toutes les sections sont bien espacées
- [ ] Les images sont nettes

---

## ♿ Accessibilité

### Navigation au Clavier
- [ ] Tab permet de naviguer dans le header
- [ ] Tab permet de naviguer dans les formulaires
- [ ] Enter/Space activent les boutons
- [ ] Escape ferme les modales
- [ ] Focus visible sur tous les éléments interactifs

### ARIA et Sémantique
- [ ] Tous les boutons d'icônes ont des `aria-label`
- [ ] Menu mobile a `aria-expanded` et `aria-controls`
- [ ] Modale a `role="dialog"` et `aria-modal="true"`
- [ ] Images décoratives ont `aria-hidden="true"`
- [ ] Images de contenu ont des `alt` descriptifs

### Contraste et Lisibilité
- [ ] Contraste texte/fond respecte AA (4.5:1)
- [ ] Taille de police minimum 16px
- [ ] Liens sont identifiables (couleur + soulignement au hover)
- [ ] Focus states sont visibles

---

## 🚀 Performance

### Build et Optimisation
- [ ] `npm run build` réussit sans erreur
- [ ] Aucun warning critique dans la console
- [ ] Images optimisées (WebP/AVIF)
- [ ] Polices chargées correctement (Poppins)

### Lighthouse (Objectif > 90)
- [ ] **Performance** : > 90
- [ ] **Accessibilité** : > 90
- [ ] **Best Practices** : > 90
- [ ] **SEO** : > 90

### Tests de Chargement
- [ ] Première page charge en < 3 secondes
- [ ] Images lazy-load correctement
- [ ] Pas de layout shift (CLS < 0.1)
- [ ] Animations fluides (60 FPS)

---

## 🔍 SEO

### Metadata
- [ ] Chaque page a un `<title>` unique
- [ ] Chaque page a une `<meta description>` unique
- [ ] OpenGraph tags configurés (og:title, og:description, og:image)
- [ ] Twitter Cards configurés
- [ ] Canonical URLs configurés

### Contenu
- [ ] Chaque page a un H1 unique
- [ ] Hiérarchie des titres respectée (H1 > H2 > H3)
- [ ] Texte alternatif sur toutes les images
- [ ] Liens internes entre les pages
- [ ] Contenu unique et pertinent

### Fichiers SEO
- [ ] `robots.txt` accessible sur `/robots.txt`
- [ ] `sitemap.xml` accessible sur `/sitemap.xml`
- [ ] JSON-LD Schema.org dans le layout
- [ ] Pas de contenu dupliqué

---

## 🌐 Déploiement

### Avant le Déploiement
- [ ] Commit et push sur GitHub
- [ ] Vérifier que `.env.local` n'est PAS commité
- [ ] Vérifier que `node_modules` n'est PAS commité
- [ ] Vérifier que `.next` n'est PAS commité

### Sur Vercel
- [ ] Créer un projet sur Vercel
- [ ] Connecter le repository GitHub
- [ ] Configurer les variables d'environnement
- [ ] Lancer le premier déploiement
- [ ] Vérifier que le site fonctionne en production

### Domaine Personnalisé
- [ ] Acheter le domaine (ex: nicolasbanic.dev)
- [ ] Configurer les DNS vers Vercel
- [ ] Activer HTTPS (automatique sur Vercel)
- [ ] Vérifier que le domaine fonctionne

---

## 📊 Après le Déploiement

### Analytics et Monitoring
- [ ] Configurer Google Analytics (optionnel)
- [ ] Configurer Google Search Console
- [ ] Soumettre le sitemap à Google
- [ ] Vérifier l'indexation des pages

### Tests en Production
- [ ] Tester toutes les pages en production
- [ ] Tester les formulaires en production
- [ ] Vérifier les emails reçus
- [ ] Tester sur différents navigateurs (Chrome, Firefox, Safari)
- [ ] Tester sur différents appareils (mobile, tablette, desktop)

### Communication
- [ ] Mettre à jour LinkedIn avec le nouveau site
- [ ] Mettre à jour GitHub avec le lien du site
- [ ] Partager sur les réseaux sociaux
- [ ] Mettre à jour CV avec le lien du site

---

## 🎯 Optimisations Futures (Optionnel)

### Court Terme
- [ ] Ajouter un blog
- [ ] Ajouter une newsletter
- [ ] Ajouter des animations plus avancées
- [ ] Ajouter un système de commentaires

### Moyen Terme
- [ ] Ajouter un espace client
- [ ] Ajouter un système de paiement
- [ ] Ajouter un chat en direct
- [ ] Ajouter des études de cas détaillées

### Long Terme
- [ ] Multilingue (EN/FR)
- [ ] PWA (Progressive Web App)
- [ ] Mode sombre/clair (toggle)
- [ ] Système de réservation en ligne

---

## ✅ Validation Finale

Une fois tous les points cochés :

1. **Build de production** : `npm run build`
2. **Test Lighthouse** : Score > 90 sur tous les critères
3. **Test responsive** : Mobile, tablette, desktop
4. **Test accessibilité** : Navigation clavier + lecteur d'écran
5. **Déploiement** : Push sur GitHub + déploiement Vercel
6. **Vérification production** : Tester le site en ligne

---

**🎉 Félicitations ! Votre site est prêt pour le déploiement !**

Pour toute question, consultez :
- `DEMARRAGE_RAPIDE.md` : Guide de démarrage
- `REFONTE_COMPLETE.md` : Documentation technique
- `COMMANDES.md` : Toutes les commandes
- `ROADMAP.md` : Évolutions futures