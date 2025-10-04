# 🚀 COMMANDES À EXÉCUTER - GUIDE ÉTAPE PAR ÉTAPE

**Suivez ces étapes dans l'ordre pour optimiser votre site.**

---

## ✅ ÉTAPE 1 : INSTALLATION DES DÉPENDANCES

### Commande
```bash
npm install
```

### Ce qui se passe
- Installation de `sharp` (traitement images)
- Installation de `svgo` (optimisation SVG)
- Installation de `@next/bundle-analyzer` (analyse bundle)
- Installation de `cross-env` (variables environnement)

### Durée estimée
⏱️ 2-3 minutes

### Vérification
```bash
npm list sharp svgo
```

Vous devriez voir :
```
├── sharp@0.33.5
└── svgo@3.3.2
```

---

## ✅ ÉTAPE 2 : OPTIMISATION DES IMAGES JPG/PNG

### Commande
```bash
npm run optimize:images
```

### Ce qui se passe
Le script va :
1. Scanner tous les JPG/PNG dans `/public/images/`
2. Compresser chaque image (85% qualité)
3. Générer version WebP (85% qualité)
4. Générer version AVIF (80% qualité)
5. Redimensionner si > 2560px

### Durée estimée
⏱️ 5-10 minutes (selon nombre d'images)

### Résultat attendu
```
📸 Optimisation de services-hero.jpg...
✅ services-hero.jpg optimisé (JPG + WebP + AVIF)

📸 Optimisation de portfolio-gtravaux.jpg...
✅ portfolio-gtravaux.jpg optimisé (JPG + WebP + AVIF)

...

✨ Optimisation terminée!
```

### Fichiers générés
Pour chaque image `photo.jpg`, vous aurez :
- `photo.optimized.jpg` (version compressée)
- `photo.webp` (format WebP)
- `photo.avif` (format AVIF, meilleure compression)

### Vérification
```bash
# Windows PowerShell
Get-ChildItem "public\images" -Filter "*.optimized.*" | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB, 2)}}
```

---

## ✅ ÉTAPE 3 : OPTIMISATION DES SVG

### Commande
```bash
npm run optimize:svg
```

### Ce qui se passe
Le script va :
1. Scanner tous les SVG dans `/public/images/`
2. Supprimer métadonnées inutiles
3. Optimiser les paths
4. Réduire précision des nombres
5. Minifier le code

### Durée estimée
⏱️ 1-2 minutes

### Résultat attendu
```
process-step1.svg:
  Done in 45 ms!
  1.4 MB → 42 KB (-97%)

process-step2.svg:
  Done in 38 ms!
  1.5 MB → 45 KB (-97%)

...

✨ Optimisation terminée!
```

### Vérification
Les SVG sont optimisés **en place** (fichiers originaux remplacés).

```bash
# Vérifier la taille des SVG
Get-ChildItem "public\images" -Filter "*.svg" | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB, 2)}}
```

---

## ✅ ÉTAPE 4 : VÉRIFICATION DES IMAGES OPTIMISÉES

### Comparer qualité visuelle

1. **Ouvrir les images dans un navigateur**
   ```
   Original : public/images/services-hero.jpg
   Optimisé : public/images/services-hero.optimized.jpg
   ```

2. **Vérifier qu'il n'y a pas de perte visible**
   - Netteté conservée ✅
   - Couleurs fidèles ✅
   - Pas d'artefacts ✅

3. **Si satisfait, remplacer les originaux**
   ```bash
   # Windows PowerShell
   Get-ChildItem "public\images" -Filter "*.optimized.jpg" | ForEach-Object {
     $original = $_.FullName -replace '\.optimized\.jpg$', '.jpg'
     Move-Item $_.FullName $original -Force
   }
   ```

---

## ✅ ÉTAPE 5 : BUILD DE TEST

### Commande
```bash
npm run build
```

### Ce qui se passe
- Compilation du projet Next.js
- Optimisation automatique du code
- Génération des pages statiques
- Tree shaking des imports inutilisés

### Durée estimée
⏱️ 2-5 minutes

### Résultat attendu
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (8/8)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         95 kB
├ ○ /services                            3.8 kB         93 kB
├ ○ /portfolio                           4.1 kB         94 kB
...

○  (Static)  prerendered as static content
```

### Vérification
Pas d'erreurs de build ✅

---

## ✅ ÉTAPE 6 : TEST EN LOCAL

### Commande
```bash
npm start
```

### Ce qui se passe
- Démarrage du serveur en mode production
- Serveur accessible sur http://localhost:3000

### Durée estimée
⏱️ Instantané

### Tests à faire

1. **Ouvrir le site**
   ```
   http://localhost:3000
   ```

2. **Vérifier visuellement**
   - ✅ Images chargent correctement
   - ✅ Mise en page intacte
   - ✅ Animations fluides
   - ✅ Responsive fonctionne

3. **Tester la navigation**
   - ✅ Toutes les pages accessibles
   - ✅ Liens fonctionnent
   - ✅ Formulaires OK

---

## ✅ ÉTAPE 7 : AUDIT LIGHTHOUSE

### Commande (dans Chrome DevTools)
1. Ouvrir http://localhost:3000
2. F12 → Onglet "Lighthouse"
3. Cocher : Performance, SEO, Accessibility, Best Practices
4. Mode : Desktop
5. Cliquer "Analyze page load"

### Durée estimée
⏱️ 1-2 minutes

### Scores attendus

| Catégorie | Cible | Statut |
|-----------|-------|--------|
| **Performance** | 95+ | ✅ |
| **SEO** | 100 | ✅ |
| **Accessibility** | 95+ | ✅ |
| **Best Practices** | 100 | ✅ |

### Métriques Core Web Vitals

| Métrique | Cible | Statut |
|----------|-------|--------|
| **LCP** | <1.5s | ✅ |
| **FID** | <50ms | ✅ |
| **CLS** | <0.05 | ✅ |

---

## ✅ ÉTAPE 8 : ANALYSE DU BUNDLE (OPTIONNEL)

### Commande
```bash
npm run analyze
```

### Ce qui se passe
- Build avec analyse activée
- Génération de graphiques interactifs
- Ouverture automatique dans le navigateur

### Durée estimée
⏱️ 3-5 minutes

### Résultat
Deux graphiques s'ouvrent :
1. **Client bundle** : JavaScript côté client
2. **Server bundle** : JavaScript côté serveur

### À vérifier
- ✅ Pas de dépendances inutiles
- ✅ Taille des chunks raisonnable
- ✅ Tree shaking effectif

---

## ✅ ÉTAPE 9 : INTÉGRATION DU COMPOSANT OPTIMIZEDIMAGE

### Remplacer les imports

**Avant :**
```jsx
import Image from 'next/image';

<Image src="/images/photo.jpg" alt="..." width={800} height={600} />
```

**Après :**
```jsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage src="/images/photo.jpg" alt="..." width={800} height={600} />
```

### Fichiers à modifier

1. **src/app/page.jsx**
   - Remplacer tous les `<Image>` par `<OptimizedImage>`

2. **src/components/ServiceCard.jsx**
   - Remplacer `<Image>` par `<ThumbnailImage>`

3. **src/components/ProjectCard.jsx**
   - Remplacer `<Image>` par `<ThumbnailImage>`

4. **src/components/TestimonialCard.jsx**
   - Remplacer `<Image>` par `<AvatarImage>`

### Vérification
```bash
npm run build
```

Pas d'erreurs ✅

---

## ✅ ÉTAPE 10 : APPLIQUER LES CLASSES DE CENTRAGE

### Exemples de modifications

**Avant :**
```jsx
<section className="py-16 md:py-24">
  <div className="mx-auto max-w-7xl px-6">
    <h2 className="text-center">Titre</h2>
  </div>
</section>
```

**Après :**
```jsx
<section className="section-spacing">
  <div className="container-centered">
    <h2 className="center-text">Titre</h2>
  </div>
</section>
```

### Fichiers à modifier
- Toutes les pages dans `src/app/`
- Tous les composants dans `src/components/`

### Vérification
Tester visuellement que tout est bien centré ✅

---

## ✅ ÉTAPE 11 : DÉPLOIEMENT

### Si vous utilisez Vercel

```bash
# Commit des modifications
git add .
git commit -m "Optimisations performance : images, CSS, config"
git push origin main
```

Vercel déploie automatiquement ✅

### Si vous utilisez un autre hébergeur

```bash
# Build production
npm run build

# Déployer le dossier .next et public/
```

---

## 📊 RÉSUMÉ DES COMMANDES

```bash
# 1. Installation
npm install

# 2. Optimisation images
npm run optimize:images

# 3. Optimisation SVG
npm run optimize:svg

# 4. Build test
npm run build

# 5. Test local
npm start

# 6. Analyse bundle (optionnel)
npm run analyze

# 7. Développement
npm run dev
```

---

## ⏱️ TEMPS TOTAL ESTIMÉ

| Étape | Durée |
|-------|-------|
| Installation | 2-3 min |
| Optimisation images | 5-10 min |
| Optimisation SVG | 1-2 min |
| Vérification | 5 min |
| Build test | 2-5 min |
| Test local | 5 min |
| Audit Lighthouse | 1-2 min |
| Intégration | 15-30 min |
| **TOTAL** | **36-62 min** |

---

## 🎯 CHECKLIST FINALE

- [ ] `npm install` exécuté sans erreur
- [ ] `npm run optimize:images` terminé
- [ ] `npm run optimize:svg` terminé
- [ ] Images optimisées vérifiées
- [ ] `npm run build` réussi
- [ ] `npm start` fonctionne
- [ ] Lighthouse score 95+
- [ ] OptimizedImage intégré
- [ ] Classes centrage appliquées
- [ ] Tests responsive OK
- [ ] Déploiement effectué

---

## 🆘 EN CAS DE PROBLÈME

### Erreur lors de npm install
```bash
# Supprimer et réinstaller
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Erreur lors de l'optimisation
```bash
# Vérifier que les dépendances sont installées
npm list sharp svgo

# Réinstaller si nécessaire
npm install sharp svgo --save-dev
```

### Build qui échoue
```bash
# Nettoyer le cache
Remove-Item -Recurse -Force .next
npm run build
```

### Images ne s'affichent pas
- Vérifier les chemins (doivent commencer par `/images/`)
- Vérifier que les fichiers existent dans `/public/images/`
- Vérifier la console du navigateur pour erreurs

---

**Bon courage ! 🚀**

Si vous suivez ces étapes, votre site sera optimisé à 100% !