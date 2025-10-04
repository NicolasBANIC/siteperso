# 🎯 PHASE 3 - PLAN D'ACTION COMPLET

**Date :** $(date)  
**Statut :** 🚀 En cours d'exécution  
**Priorité :** 🔥 HAUTE

---

## ✅ ÉTAPE 1 : OPTIMISATION DES IMAGES (EN COURS)

### Commande Exécutée
```powershell
npm run optimize:images
```

### Résultats Attendus
- ✅ 18 JPG optimisés → Gain -28 MB (-80%)
- ✅ 18 WebP générés → Gain supplémentaire -3 MB
- ✅ 18 AVIF générés → Gain supplémentaire -1 MB
- ⚠️ 6 images vides détectées (à remplacer)

### Images Vides à Traiter
1. `conseil-habitat.jpg` (0 KB)
2. `gtravaux.jpg` (0 KB)
3. `douceurs-lea.jpg` (0 KB)
4. `atelier-metal.jpg` (0 KB)
5. `atelier-bois.jpg` (0 KB)
6. `hero-placeholder.jpg` (0 KB)

**Action :** Voir `IMAGES_HERO_SECTIONS.md` pour les spécifications.

---

## 🔄 ÉTAPE 2 : OPTIMISATION DES SVG (PROCHAINE)

### Commande à Exécuter
```powershell
npm run optimize:svg
```

### Gains Attendus
| Fichier | Avant | Après | Gain |
|---------|-------|-------|------|
| `process-step5.svg` | 1.4 MB | 50 KB | -97% |
| `process-step2.svg` | 1.4 MB | 50 KB | -97% |
| `process-step1.svg` | 1.4 MB | 50 KB | -96% |
| `techno-react.svg` | 1.4 MB | 50 KB | -96% |
| `process-step3.svg` | 1.3 MB | 50 KB | -96% |
| `techno-nextjs.svg` | 1.3 MB | 50 KB | -96% |
| `404-illustration.svg` | 1.3 MB | 50 KB | -96% |
| `process-step4.svg` | 1.0 MB | 50 KB | -95% |
| `techno-typescript.svg` | 834 KB | 40 KB | -95% |

**Total :** ~10 MB → ~0.5 MB (**-95%**)

---

## 🧹 ÉTAPE 3 : NETTOYAGE DES PNG INUTILES

### Fichiers à Supprimer
```powershell
# Supprimer les PNG doublons (versions JPG optimisées disponibles)
Remove-Item "c:\Users\Banic\Documents\siteperso\public\images\services-hero.png"
Remove-Item "c:\Users\Banic\Documents\siteperso\public\images\tarifs-hero.png"
Remove-Item "c:\Users\Banic\Documents\siteperso\public\images\processus-hero.png"
Remove-Item "c:\Users\Banic\Documents\siteperso\public\images\temoignages-hero.png"
Remove-Item "c:\Users\Banic\Documents\siteperso\public\images\apropos-hero.png"
Remove-Item "c:\Users\Banic\Documents\siteperso\public\images\portfolio-hero.png"
```

**Gain :** -3.7 MB

---

## 🔧 ÉTAPE 4 : REFACTORISER PAGE D'ACCUEIL

### Analyse de `src/app/page.jsx`

#### Opportunités d'Optimisation Identifiées

**1. Boutons CTA Dupliqués (Lignes 273-290)**

**Avant :**
```jsx
<Link 
  href="/devis" 
  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-ui font-semibold text-[#0047AB] shadow-2xl transition-all hover:scale-105 hover:shadow-white/30"
>
  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
  <span className="relative">Demander un devis</span>
  <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
</Link>
```

**Après :**
```jsx
<CTAButton href="/devis" variant="primary" showIcon>
  Demander un devis
</CTAButton>
```

**Gain :** -15 lignes de code

---

**2. Classes Répétitives à Remplacer**

| Avant | Après | Occurrences |
|-------|-------|-------------|
| `text-hero font-bold tracking-tighter leading-tight` | `.heading-hero` | 1 |
| `text-body-lg leading-relaxed text-white/90 font-regular` | `.body-large` | 1 |
| `text-heading-sm font-semibold text-[var(--color-foreground)]` | `.heading-tertiary` | 4+ |
| `text-body-sm text-[var(--color-muted)]` | `.body-small` | 4+ |

**Gain :** -40% de classes Tailwind, +50% lisibilité

---

**3. Animations Non GPU-Accelerated**

**Éléments à optimiser :**
- Scroll indicator (ligne 317) : `animate-bounce`
- Stats cards (ligne 330) : animations ScrollReveal
- Service cards : hover effects

**Action :** Ajouter classe `.gpu-accelerated` à tous les éléments animés.

**Gain :** +20% FPS (50fps → 60fps)

---

**4. Section CTA en Bas de Page**

**Localisation :** Fin du fichier (à vérifier)

**Action :** Remplacer par `<CTASection>` component.

**Gain :** -30 lignes de code

---

### Plan de Refactoring

#### Modifications à Appliquer

**1. Imports à Ajouter**
```jsx
import CTAButton from '@/components/CTAButton';
import CTASection from '@/components/CTASection';
```

**2. Hero Section - Boutons CTA**
- Remplacer les 2 boutons par `<CTAButton>`
- Appliquer `.heading-hero` au titre
- Appliquer `.body-large` au paragraphe

**3. Stats Section**
- Appliquer `.heading-tertiary` aux labels
- Appliquer `.body-small` aux descriptions
- Ajouter `.gpu-accelerated` aux cards

**4. Services Section**
- Vérifier utilisation de `<ServiceCard>` (déjà optimisé)
- Appliquer utility classes aux titres

**5. CTA Section Finale**
- Remplacer par `<CTASection>` component

---

## 📊 GAINS ATTENDUS APRÈS PHASE 3

### Performance

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| **Lighthouse Performance** | 85 | 95+ | **+12%** |
| **LCP** | 3.5s | 2.1s | **-40%** |
| **FID** | 100ms | <100ms | Stable |
| **CLS** | <0.1 | <0.1 | Stable |
| **TBT** | 200ms | 150ms | **-25%** |
| **FPS (animations)** | 50fps | 60fps | **+20%** |

### Code

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| **Lignes de code** | ~5000 | ~4500 | **-10%** |
| **Code duplication** | ~500 lignes | ~100 lignes | **-80%** |
| **CSS classes** | ~2000 | ~1500 | **-25%** |
| **Images (poids)** | 48.7 MB | 16.5 MB | **-66%** |

### Bande Passante

| Connexion | Avant | Après | Gain |
|-----------|-------|-------|------|
| **4G** | 8.5s | 3.2s | **-62%** |
| **3G** | 18s | 7s | **-61%** |
| **Fibre** | 2.5s | 1.2s | **-52%** |

---

## ✅ CHECKLIST D'EXÉCUTION

### Phase 3A : Images (EN COURS)
- [x] Lancer `npm run optimize:images`
- [ ] Vérifier les images optimisées
- [ ] Remplacer les originaux par les versions .optimized
- [ ] Supprimer les fichiers .optimized (renommer)

### Phase 3B : SVG (PROCHAINE)
- [ ] Lancer `npm run optimize:svg`
- [ ] Vérifier les SVG optimisés
- [ ] Tester l'affichage sur le site

### Phase 3C : Nettoyage (PROCHAINE)
- [ ] Supprimer les PNG inutiles
- [ ] Identifier les images vides à remplacer
- [ ] Créer/trouver les images manquantes

### Phase 3D : Refactoring Page d'Accueil (PROCHAINE)
- [ ] Importer CTAButton et CTASection
- [ ] Remplacer les boutons CTA
- [ ] Appliquer utility classes
- [ ] Ajouter GPU acceleration
- [ ] Remplacer section CTA finale
- [ ] Tester responsive
- [ ] Vérifier animations

### Phase 3E : Build et Test (FINALE)
- [ ] `npm run build`
- [ ] `npm start`
- [ ] Tester toutes les pages
- [ ] Audit Lighthouse
- [ ] Vérifier Core Web Vitals
- [ ] Tests responsive complets

---

## 🚀 COMMANDES RAPIDES

### Optimisation Images
```powershell
# Déjà en cours
npm run optimize:images
```

### Optimisation SVG
```powershell
npm run optimize:svg
```

### Nettoyage PNG
```powershell
Remove-Item "c:\Users\Banic\Documents\siteperso\public\images\*-hero.png"
```

### Build et Test
```powershell
npm run build
npm start
```

### Audit Lighthouse
```powershell
# Ouvrir DevTools → Lighthouse → Generate Report
# Ou utiliser CLI
npx lighthouse http://localhost:3000 --view
```

---

## 📚 DOCUMENTATION ASSOCIÉE

- **`ANALYSE_IMAGES_ACTUELLE.md`** - Analyse détaillée des images
- **`IMAGES_HERO_SECTIONS.md`** - Spécifications des images manquantes
- **`QUICK_START_PHASE3.md`** - Guide rapide Phase 3
- **`PHASE2_COMPLETE_RAPPORT_FINAL.md`** - Rapport Phase 2
- **`README_PHASE2.md`** - Vue d'ensemble Phase 2

---

## 🎯 PROCHAINES ÉTAPES APRÈS PHASE 3

### Phase 4 : Refactoriser Pages Restantes (1-2h)

**Pages à optimiser :**
1. **Témoignages** (`temoignages/page.jsx`)
2. **Contact** (`contact/page.jsx`)

**Pattern :**
- Importer CTAButton/CTASection
- Remplacer boutons et sections CTA
- Appliquer utility classes
- Ajouter GPU acceleration
- Tester et valider

### Phase 5 : Tests Finaux et Audit (30 min)

**Checklist :**
- [ ] Audit Lighthouse sur toutes les pages (>95)
- [ ] Tests responsive complets
- [ ] Vérification centrage et espacements
- [ ] Tests animations (60fps)
- [ ] Tests accessibilité (WCAG 2.1 AA)
- [ ] Tests SEO (balises, alt text, structure)
- [ ] Bundle analysis (`npm run analyze`)

---

## 📈 MÉTRIQUES DE SUCCÈS

### Objectifs Phase 3

- ✅ Images optimisées : <500 KB par image
- ✅ SVG optimisés : <100 KB par SVG
- ✅ PNG inutiles supprimés : 0 doublons
- ✅ Page d'accueil refactorisée : -10% de code
- ✅ Build réussi : 0 erreurs, 0 warnings
- ✅ Lighthouse Performance : >95
- ✅ LCP : <2.5s
- ✅ FPS : 60fps constant

### Validation Finale

**Commandes de validation :**
```powershell
# Vérifier taille des images
Get-ChildItem -Path "public\images" -Recurse | Where-Object {$_.Length -gt 500KB}

# Vérifier taille des SVG
Get-ChildItem -Path "public\images" -Filter "*.svg" | Where-Object {$_.Length -gt 100KB}

# Build de production
npm run build

# Analyse du bundle
npm run analyze
```

---

**Date de création :** $(date)  
**Statut :** 🚀 Phase 3 en cours  
**Prochaine action :** Attendre fin optimisation images, puis lancer SVG