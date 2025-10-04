# 🧪 GUIDE DE TEST DES OPTIMISATIONS

**Date :** $(date)  
**Objectif :** Valider toutes les optimisations appliquées

---

## 📋 PRÉ-REQUIS

Avant de commencer les tests, assurez-vous que :
- ✅ Toutes les modifications de la Phase 2 sont appliquées
- ✅ Vous êtes dans le répertoire du projet : `c:\Users\Banic\Documents\siteperso`
- ✅ Node.js et npm sont installés

---

## 🚀 ÉTAPE 1 : INSTALLATION DES DÉPENDANCES

### Commande
```powershell
npm install
```

### Vérifications
```powershell
# Vérifier que sharp est installé
npm list sharp

# Vérifier que svgo est installé
npm list svgo

# Vérifier que @next/bundle-analyzer est installé
npm list @next/bundle-analyzer
```

### Résultat attendu
```
sharp@0.33.x
svgo@3.x.x
@next/bundle-analyzer@15.x.x
```

### En cas d'erreur
```powershell
# Nettoyer et réinstaller
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

---

## 🖼️ ÉTAPE 2 : OPTIMISATION DES IMAGES

### 2.1 Optimiser les images JPG/PNG

```powershell
npm run optimize:images
```

**Durée estimée :** 6-12 minutes

**Ce qui se passe :**
- Compression des JPG/PNG (85-90% qualité)
- Génération des versions WebP (85% qualité)
- Génération des versions AVIF (80% qualité)
- Redimensionnement des images >2560px
- Détection des fichiers vides (0KB)

**Résultat attendu :**
```
✅ Optimized: services-hero.jpg (2766 KB → 450 KB, -84%)
✅ Generated: services-hero.webp (320 KB)
✅ Generated: services-hero.avif (280 KB)
...
📊 Total saved: 70 MB (-82%)
```

### 2.2 Optimiser les SVG

```powershell
npm run optimize:svg
```

**Durée estimée :** 2-3 minutes

**Ce qui se passe :**
- Suppression des métadonnées inutiles
- Optimisation des paths
- Suppression des commentaires
- Minification

**Résultat attendu :**
```
✅ Optimized: process-step1.svg (1400 KB → 45 KB, -97%)
✅ Optimized: process-step2.svg (1486 KB → 48 KB, -97%)
...
📊 Total saved: 9 MB (-90%)
```

### 2.3 Vérifier les images optimisées

```powershell
# Lister les images dans public/images
Get-ChildItem -Path "public\images" -Recurse | Select-Object Name, Length | Sort-Object Length -Descending
```

**Vérifications :**
- ✅ Aucune image JPG >500 KB
- ✅ Aucune image SVG >100 KB
- ✅ Présence de fichiers .webp et .avif
- ✅ Aucun fichier 0 KB

---

## 🏗️ ÉTAPE 3 : BUILD DE PRODUCTION

### 3.1 Build

```powershell
npm run build
```

**Durée estimée :** 2-5 minutes

**Ce qui se passe :**
- Compilation TypeScript
- Optimisation du code (tree shaking, minification)
- Génération des pages statiques
- Optimisation des images Next.js
- Suppression des console.log

**Résultat attendu :**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (12/12)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         95 kB
├ ○ /services                            3.8 kB         93 kB
├ ○ /portfolio                           4.1 kB         94 kB
...
```

**Vérifications :**
- ✅ Aucune erreur de compilation
- ✅ First Load JS <100 KB par page
- ✅ Aucun warning TypeScript
- ✅ Build terminé avec succès

### En cas d'erreur

#### Erreur : "Module not found"
```powershell
npm install
npm run build
```

#### Erreur : "Out of memory"
```powershell
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### Erreur : "Type error"
Vérifier les imports dans les fichiers modifiés

---

## 🌐 ÉTAPE 4 : TEST LOCAL

### 4.1 Démarrer le serveur

```powershell
npm start
```

**Résultat attendu :**
```
> next start
✓ Ready on http://localhost:3000
```

### 4.2 Ouvrir le navigateur

Ouvrir : http://localhost:3000

### 4.3 Tests visuels

#### Page d'accueil (/)
- ✅ Vidéo de fond chargée et fluide
- ✅ Effet Matrix visible
- ✅ Animations ScrollReveal fluides
- ✅ Boutons CTA avec effet shimmer
- ✅ Pas de décalage de layout (CLS)

#### Page Services (/services)
- ✅ Image hero chargée rapidement
- ✅ Effet parallax fluide (60fps)
- ✅ Boutons CTAButton fonctionnels
- ✅ Section Process bien centrée
- ✅ CTASection affichée correctement

#### Page Portfolio (/portfolio)
- ✅ Image hero optimisée
- ✅ Filtres de catégories fonctionnels
- ✅ Cards projets avec hover fluide
- ✅ Modal projet s'ouvre correctement
- ✅ Badges et titres bien stylés

#### Tests responsive
```
Desktop : 1920x1080
Tablette : 768x1024
Mobile : 375x667
```

- ✅ Layout adapté à chaque taille
- ✅ Images responsive
- ✅ Menu mobile fonctionnel
- ✅ Boutons accessibles
- ✅ Textes lisibles

---

## 📊 ÉTAPE 5 : AUDIT LIGHTHOUSE

### 5.1 Ouvrir DevTools

1. Ouvrir Chrome/Edge
2. Aller sur http://localhost:3000
3. F12 → Onglet "Lighthouse"

### 5.2 Configuration Lighthouse

**Paramètres :**
- ✅ Mode : Navigation
- ✅ Device : Desktop ET Mobile
- ✅ Categories : Performance, Accessibility, Best Practices, SEO

### 5.3 Lancer l'audit

**Desktop :**
```
Performance : 95+ (objectif)
Accessibility : 95+ (objectif)
Best Practices : 95+ (objectif)
SEO : 100 (objectif)
```

**Mobile :**
```
Performance : 90+ (objectif)
Accessibility : 95+ (objectif)
Best Practices : 95+ (objectif)
SEO : 100 (objectif)
```

### 5.4 Métriques Core Web Vitals

**Objectifs :**
```
LCP (Largest Contentful Paint) : <2.5s ✅
FID (First Input Delay) : <100ms ✅
CLS (Cumulative Layout Shift) : <0.1 ✅
TTFB (Time to First Byte) : <600ms ✅
```

### 5.5 Analyser les résultats

#### Si Performance <95
**Causes possibles :**
- Images non optimisées
- JavaScript trop lourd
- Fonts non préchargées

**Solutions :**
```powershell
# Réexécuter optimisation images
npm run optimize:images

# Analyser le bundle
npm run analyze
```

#### Si Accessibility <95
**Causes possibles :**
- Alt text manquants
- Contraste insuffisant
- ARIA labels manquants

**Solutions :**
Vérifier les composants modifiés

#### Si SEO <100
**Causes possibles :**
- Meta descriptions manquantes
- Balises Hn mal structurées

**Solutions :**
Vérifier les metadata dans les pages

---

## 🎨 ÉTAPE 6 : VALIDATION CENTRAGE

### 6.1 Vérifier le centrage visuel

**Pages à vérifier :**
- / (Accueil)
- /services
- /portfolio
- /processus
- /tarifs
- /temoignages
- /apropos
- /contact

**Éléments à vérifier :**
- ✅ Titres centrés horizontalement
- ✅ Paragraphes alignés correctement
- ✅ Sections espacées uniformément
- ✅ Cards alignées dans les grilles
- ✅ Boutons centrés dans les sections CTA

### 6.2 Utiliser les DevTools

**Activer la grille CSS :**
1. F12 → Elements
2. Sélectionner un container
3. Activer "Grid" ou "Flexbox" overlay

**Vérifier :**
- ✅ `.container-centered` appliqué
- ✅ `.center-content` pour sections
- ✅ `.center-text` pour titres
- ✅ Espacements uniformes (section-spacing)

---

## 🔍 ÉTAPE 7 : TESTS ANIMATIONS

### 7.1 Tester les animations 60 FPS

**Ouvrir Performance Monitor :**
1. F12 → More tools → Performance monitor
2. Observer "Frames per second"

**Actions à tester :**
- Scroll sur page d'accueil (vidéo + Matrix)
- Scroll sur page Services (parallax hero)
- Hover sur ServiceCard
- Hover sur ProjectCard
- Ouverture modal Portfolio

**Résultat attendu :**
- ✅ FPS constant à 60
- ✅ Pas de drops <50 FPS
- ✅ Animations fluides

### 7.2 Tester GPU acceleration

**Ouvrir Rendering :**
1. F12 → More tools → Rendering
2. Activer "Paint flashing"
3. Activer "Layer borders"

**Vérifier :**
- ✅ Éléments `.gpu-accelerated` sur leur propre layer
- ✅ Pas de repaint complet au scroll
- ✅ Animations isolées

---

## 📱 ÉTAPE 8 : TESTS MOBILE

### 8.1 Mode Device Emulation

**DevTools :**
1. F12 → Toggle device toolbar (Ctrl+Shift+M)
2. Sélectionner "iPhone 12 Pro"
3. Tester toutes les pages

**Vérifications :**
- ✅ Layout responsive
- ✅ Textes lisibles (>16px)
- ✅ Boutons cliquables (>44x44px)
- ✅ Images adaptées
- ✅ Menu mobile fonctionnel

### 8.2 Test sur appareil réel

**Si possible :**
1. Connecter smartphone au même réseau
2. Trouver l'IP locale : `ipconfig`
3. Ouvrir `http://[IP]:3000` sur mobile

**Vérifications :**
- ✅ Chargement rapide (<3s)
- ✅ Scroll fluide
- ✅ Tap responsive
- ✅ Vidéo désactivée (économie data)

---

## 📦 ÉTAPE 9 : ANALYSE DU BUNDLE

### 9.1 Générer le rapport

```powershell
npm run analyze
```

**Ce qui se passe :**
- Build avec bundle analyzer
- Génération de rapports HTML
- Ouverture automatique dans le navigateur

**Fichiers générés :**
- `.next/analyze/client.html`
- `.next/analyze/server.html`

### 9.2 Analyser le rapport

**Vérifications :**
- ✅ lucide-react : tree-shaked (seulement icônes utilisées)
- ✅ framer-motion : optimisé
- ✅ react-hook-form : optimisé
- ✅ Pas de duplications de modules
- ✅ Chunks bien séparés

**Taille cible :**
```
Main bundle : <100 KB
Page chunks : <50 KB chacun
Total JS : <300 KB
```

---

## ✅ CHECKLIST FINALE

### Code
- [ ] Build production réussi
- [ ] Aucune erreur TypeScript
- [ ] Aucun warning console
- [ ] Bundle size <300 KB

### Performance
- [ ] Lighthouse Performance >95 (desktop)
- [ ] Lighthouse Performance >90 (mobile)
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] Animations 60 FPS

### Images
- [ ] Toutes les images <500 KB
- [ ] Formats WebP/AVIF générés
- [ ] Aucun fichier 0 KB
- [ ] SVG optimisés <100 KB

### Visuel
- [ ] Centrage parfait sur toutes les pages
- [ ] Espacements uniformes
- [ ] Responsive mobile/tablette/desktop
- [ ] Cohérence typographique

### Accessibilité
- [ ] Lighthouse Accessibility >95
- [ ] Alt text présents
- [ ] ARIA labels corrects
- [ ] Contraste suffisant
- [ ] Navigation clavier

### SEO
- [ ] Lighthouse SEO 100
- [ ] Meta descriptions
- [ ] Balises Hn structurées
- [ ] Sitemap généré
- [ ] Robots.txt configuré

---

## 🐛 RÉSOLUTION DE PROBLÈMES

### Problème : Images non optimisées

**Symptômes :**
- Images toujours lourdes (>1 MB)
- Pas de fichiers .webp/.avif

**Solution :**
```powershell
# Vérifier sharp
npm list sharp

# Réinstaller si nécessaire
npm install sharp --save-dev

# Relancer optimisation
npm run optimize:images
```

---

### Problème : Build échoue

**Symptômes :**
- Erreur "Module not found"
- Erreur TypeScript

**Solution :**
```powershell
# Nettoyer
Remove-Item -Recurse -Force .next, node_modules

# Réinstaller
npm install

# Rebuild
npm run build
```

---

### Problème : Animations saccadées

**Symptômes :**
- FPS <60
- Scroll pas fluide

**Solution :**
1. Vérifier que `.gpu-accelerated` est appliqué
2. Vérifier dans DevTools → Rendering → Layer borders
3. Désactiver extensions navigateur
4. Tester en navigation privée

---

### Problème : Lighthouse Performance <90

**Symptômes :**
- LCP élevé
- TBT élevé

**Solution :**
```powershell
# Analyser le bundle
npm run analyze

# Vérifier images
Get-ChildItem -Path "public\images" -Recurse | Where-Object {$_.Length -gt 500KB}

# Réoptimiser
npm run optimize:images
```

---

## 📞 SUPPORT

Si vous rencontrez des problèmes non résolus par ce guide :

1. **Vérifier les logs :**
   ```powershell
   npm run build > build.log 2>&1
   ```

2. **Vérifier la console navigateur :**
   F12 → Console → Rechercher erreurs

3. **Vérifier les fichiers modifiés :**
   Comparer avec `MODIFICATIONS_APPLIQUEES_PHASE2.md`

---

**Temps total estimé pour tous les tests :** 1h30  
**Dernière mise à jour :** $(date)