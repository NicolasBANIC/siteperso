# ✅ CHECKLIST DE VÉRIFICATION DES IMAGES

## 🎯 À VÉRIFIER APRÈS LANCEMENT DU SERVEUR

### 1. Démarrer le serveur de développement
```powershell
npm run dev
```

---

## 📄 PAGES À VÉRIFIER

### ✅ Page d'accueil (http://localhost:3000)
- [ ] Hero principal s'affiche (hero-main.jpg)
- [ ] 4 cartes services avec images (vitrine, ecommerce, webapp, seo)
- [ ] 3 étapes processus avec icônes SVG
- [ ] 8 logos technologies affichés
- [ ] Section sécurité avec icônes (fingerprint, commerce)
- [ ] CTA avec fond et icône fusée
- [ ] Aucune image cassée (pas de 404)

### ✅ Page À propos (http://localhost:3000/apropos)
- [ ] Portrait professionnel (avatar.jpg)
- [ ] Image workspace
- [ ] Aucune image cassée

### ✅ Page Portfolio (http://localhost:3000/portfolio)
- [ ] 8 projets affichés avec images
- [ ] Images GTravaux (desktop et mobile)
- [ ] Images Fashion Store, SaaS Dashboard
- [ ] Images Atelier Bois, Atelier Métal
- [ ] Images Conseil Habitat, Douceurs de Léa
- [ ] Modal projet affiche image en grand
- [ ] Aucune image cassée

### ✅ Page Processus (http://localhost:3000/processus)
- [ ] 5 étapes avec icônes SVG
- [ ] Icônes affichées 2 fois (petite et grande version)
- [ ] Aucune image cassée

### ✅ Page Témoignages (http://localhost:3000/temoignages)
- [ ] 6 témoignages avec avatars
- [ ] 3 avatars différents utilisés
- [ ] Avatars ronds et bien affichés
- [ ] Aucune image cassée

### ✅ Page Contact (http://localhost:3000/contact)
- [ ] Hero contact avec image
- [ ] Aucune image cassée

### ✅ Page 404 (http://localhost:3000/page-inexistante)
- [ ] Illustration 404 SVG affichée
- [ ] Aucune image cassée

### ✅ Header (toutes les pages)
- [ ] Logo NB affiché
- [ ] Logo tourne au survol
- [ ] Aucune image cassée

---

## 🔍 VÉRIFICATIONS TECHNIQUES

### Console du navigateur (F12)
- [ ] Aucune erreur 404 pour les images
- [ ] Aucun warning Next/Image
- [ ] Aucune erreur "isn't a valid image"

### Network (Onglet Réseau)
- [ ] Toutes les images chargent avec statut 200
- [ ] Images optimisées par Next/Image (format WebP si supporté)
- [ ] Tailles d'images appropriées selon viewport

### Lighthouse Audit
```
1. Ouvrir DevTools (F12)
2. Onglet "Lighthouse"
3. Cocher "Performance" et "Accessibility"
4. Cliquer "Analyze page load"
```
- [ ] Performance > 80
- [ ] Accessibility > 90
- [ ] Best Practices > 80
- [ ] SEO > 90

---

## 📱 TESTS RESPONSIVE

### Mobile (375px)
- [ ] Images hero responsive
- [ ] Cartes services empilées
- [ ] Portfolio en 1 colonne
- [ ] Avatars témoignages visibles
- [ ] Aucun débordement horizontal

### Tablette (768px)
- [ ] Images hero bien dimensionnées
- [ ] Cartes services en 2 colonnes
- [ ] Portfolio en 2 colonnes
- [ ] Layout équilibré

### Desktop (1920px)
- [ ] Images hero haute qualité
- [ ] Cartes services en 3 colonnes
- [ ] Portfolio en 3 colonnes
- [ ] Aucune pixellisation

---

## ♿ TESTS ACCESSIBILITÉ

### Lecteur d'écran
- [ ] Alt texts lus correctement
- [ ] Descriptions pertinentes
- [ ] Pas de "image" ou "photo" générique

### Navigation clavier
- [ ] Images cliquables accessibles (Tab)
- [ ] Focus visible sur images interactives

---

## 🌐 TESTS PARTAGE SOCIAL

### OpenGraph
1. Aller sur https://developers.facebook.com/tools/debug/
2. Entrer l'URL du site
3. Vérifier :
   - [ ] og-image.jpg s'affiche (1200×630)
   - [ ] Titre correct
   - [ ] Description correcte

### Twitter Card
1. Aller sur https://cards-dev.twitter.com/validator
2. Entrer l'URL du site
3. Vérifier :
   - [ ] Image de prévisualisation affichée
   - [ ] Carte "summary_large_image"

---

## 🐛 PROBLÈMES COURANTS

### Si une image ne s'affiche pas :
1. Vérifier que le fichier existe dans `/public/images/`
2. Vérifier l'orthographe du chemin (sensible à la casse)
3. Vérifier l'extension (.jpg, .svg, .png)
4. Redémarrer le serveur de développement

### Si une image est floue :
1. Vérifier les dimensions `width` et `height`
2. Vérifier la prop `sizes`
3. Vérifier la qualité de l'image source

### Si une image charge lentement :
1. Ajouter `priority` pour images above-the-fold
2. Vérifier la taille du fichier source
3. Optimiser l'image avec un outil de compression

---

## ✅ VALIDATION FINALE

Une fois toutes les cases cochées :
- [ ] Toutes les images s'affichent correctement
- [ ] Aucune erreur dans la console
- [ ] Performance acceptable (Lighthouse > 80)
- [ ] Responsive fonctionnel
- [ ] Accessibilité validée
- [ ] Partage social configuré

**🎉 INTÉGRATION VALIDÉE - PRÊT POUR LA PRODUCTION !**

---

## 📞 EN CAS DE PROBLÈME

1. Consulter `RAPPORT_INTEGRATION_IMAGES.md` pour les détails
2. Vérifier `INTEGRATION_IMAGES_RESUME.md` pour le mapping
3. Vérifier que tous les fichiers sont dans `/public/images/`
4. Redémarrer le serveur : `Ctrl+C` puis `npm run dev`

---

**Date de création :** $(Get-Date -Format "dd/MM/yyyy à HH:mm")