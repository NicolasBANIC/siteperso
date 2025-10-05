# 🚀 Quick Start - Prochaine Session

**Objectif :** Continuer la refonte front-end jusqu'à 60% de composants refactorisés

---

## 📊 État Actuel

- ✅ **Composants refactorisés :** 17/40 (42%)
- ✅ **Build :** En cours de vérification
- ✅ **Design tokens :** 100% configurés
- ✅ **Accessibilité :** useReducedMotion intégré partout

---

## 🎯 Prochains Composants à Refactoriser (Par Priorité)

### 1. **TestimonialCard.jsx** (Priorité Haute)
**Localisation :** `src/components/TestimonialCard.jsx`

**Actions à faire :**
- [ ] Intégrer `useReducedMotion`
- [ ] Remplacer `var(--color-*)` par tokens Tailwind
- [ ] Appliquer `font-heading` pour nom du client
- [ ] Ajouter animations conditionnelles (hover scale)
- [ ] Uniformiser avec TestimonialCarousel

**Pattern à suivre :**
```javascript
const prefersReducedMotion = useReducedMotion();
const animationProps = prefersReducedMotion ? {} : { whileHover: { scale: 1.02 } };
```

---

### 2. **StatItem.jsx** (Priorité Haute)
**Localisation :** `src/components/StatItem.jsx`

**Actions à faire :**
- [ ] Intégrer `useReducedMotion`
- [ ] Utiliser `AnimatedCounter` pour les valeurs
- [ ] Appliquer tokens : `text-accent`, `text-foreground`, `text-muted`
- [ ] Ajouter `font-heading` pour les valeurs
- [ ] Animation d'apparition au scroll

---

### 3. **CTASection.jsx** (Priorité Haute)
**Localisation :** `src/components/CTASection.jsx`

**Actions à faire :**
- [ ] Vérifier utilisation de `Section` wrapper
- [ ] Appliquer gradient background : `from-accent/10 to-accentSecondary/10`
- [ ] Utiliser `CTAButton` pour les actions
- [ ] Ajouter animations conditionnelles
- [ ] Responsive layout (flex-col sur mobile)

---

### 4. **FormulaireContact.jsx** (Priorité Moyenne)
**Localisation :** `src/components/FormulaireContact.jsx`

**Actions à faire :**
- [ ] Intégrer `useReducedMotion`
- [ ] Appliquer tokens : `bg-surface`, `border-border`, `text-foreground`
- [ ] Focus-visible avec ring accent sur tous les inputs
- [ ] Animations de validation (success/error)
- [ ] Messages d'erreur accessibles (aria-describedby)

**Pattern validation :**
```javascript
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-error"
>
  {errorMessage}
</motion.div>
```

---

### 5. **FormulaireDevis.jsx** (Priorité Moyenne)
**Localisation :** `src/components/FormulaireDevis.jsx`

**Actions similaires à FormulaireContact.jsx**

---

## 🔧 Checklist de Refactorisation (Template)

Pour chaque composant, suivre cette checklist :

### 1. Imports
```javascript
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
```

### 2. Hook useReducedMotion
```javascript
const prefersReducedMotion = useReducedMotion();
```

### 3. Props Conditionnelles
```javascript
const animationProps = prefersReducedMotion ? {
  initial: { opacity: 1 },
  animate: { opacity: 1 }
} : {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};
```

### 4. Tokens Tailwind
Remplacer :
- `var(--color-background)` → `bg-background`
- `var(--color-surface)` → `bg-surface`
- `var(--color-foreground)` → `text-foreground`
- `var(--color-muted)` → `text-muted`
- `var(--color-accent)` → `bg-accent` / `text-accent`
- `var(--color-border)` → `border-border`

### 5. Typographie
- Titres : `font-heading`
- Corps : `font-sans` (par défaut)
- Code : `font-mono`

### 6. Espacements
- Sections : `py-section` (100px)
- Padding horizontal : `px-gutter` (24px)

### 7. Border Radius
- Petits éléments : `rounded-md` (6px)
- Cartes/boutons : `rounded-lg` (12px)
- Grandes cartes : `rounded-xl` (16px)

### 8. Ombres
- Cartes : `shadow-card`
- Hover : `hover:shadow-xl`

### 9. Gradients
- CTA/Important : `bg-gradient-to-r from-accent to-accentSecondary`

### 10. Accessibilité
- Focus-visible : `focus-visible:ring-2 focus-visible:ring-accent`
- ARIA labels : `aria-label`, `aria-describedby`
- Classes motion-reduce : `motion-reduce:transition-none`

---

## 📝 Commandes Utiles

### Vérifier le build
```bash
npm run build
```

### Lancer le dev server
```bash
npm run dev
```

### Rechercher un composant
```bash
# Dans PowerShell
Get-ChildItem -Path "src/components" -Filter "*.jsx" -Recurse
```

### Rechercher variables CSS obsolètes
```bash
# Rechercher var(--color-*)
rg "var\(--color-" src/components
```

---

## 🎨 Design Tokens - Référence Rapide

### Couleurs
```javascript
background: '#0A192F'      // Fond principal
surface: '#10253E'         // Cartes
foreground: '#F5F7FA'      // Texte principal
muted: '#A0AEC0'           // Texte secondaire
accent: '#0D99FF'          // Bleu principal
accentSecondary: '#10B981' // Vert Matrix
accentTertiary: '#9333EA'  // Violet
error: '#E53E3E'           // Erreur
```

### Typographie
```javascript
font-sans: Inter           // Corps de texte
font-heading: Space Grotesk // Titres
font-mono: Fira Code       // Code
```

### Espacements
```javascript
section: '100px'           // py-section
gutter: '24px'             // px-gutter
```

---

## 🐛 Problèmes Connus à Surveiller

### 1. Build en Cours
**Status :** En cours de vérification  
**Action :** Vérifier les erreurs de compilation avant de continuer

### 2. Variables CSS Restantes
**Localisation :** `src/app/page.jsx` (page d'accueil)  
**Action :** Refactoriser après les composants prioritaires

### 3. Images Hero Manquantes
**Référence :** `IMAGES_HERO_SECTIONS.md`  
**Action :** Générer avec DALL-E ou trouver alternatives

---

## 📚 Documentation de Référence

### Fichiers Importants
1. `REFONTE_PROGRESS.md` - Progression globale
2. `SESSION_RECAP_FINAL.md` - Récapitulatif dernière session
3. `tailwind.config.js` - Configuration tokens
4. `src/lib/useReducedMotion.js` - Hook accessibilité

### Composants Déjà Refactorisés (Exemples)
- `src/components/Button.jsx` - Exemple de base
- `src/components/Card.jsx` - Exemple polyvalent
- `src/components/BackToTop.jsx` - Exemple AnimatePresence

---

## 🎯 Objectif Session Suivante

**Target :** Passer de **42%** à **60%** de composants refactorisés

**Composants à faire (minimum 7) :**
1. TestimonialCard.jsx
2. StatItem.jsx
3. CTASection.jsx
4. FormulaireContact.jsx
5. FormulaireDevis.jsx
6. GlassmorphismCard.jsx
7. MockDashboard.jsx

**Estimation :** 2-3 heures de travail

---

## ✅ Checklist Avant de Commencer

- [ ] Vérifier que le build précédent a réussi
- [ ] Lire `SESSION_RECAP_FINAL.md` pour contexte
- [ ] Ouvrir `REFONTE_PROGRESS.md` pour suivre progression
- [ ] Avoir `tailwind.config.js` sous les yeux pour tokens
- [ ] Préparer terminal pour `npm run dev`

---

## 🚀 Let's Go!

**Commande pour démarrer :**
```bash
npm run dev
```

**Premier composant à ouvrir :**
```bash
code src/components/TestimonialCard.jsx
```

**Bonne chance ! 💪**