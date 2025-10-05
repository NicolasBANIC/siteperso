# ⚡ Quick Reference - Refonte BANDEV

**Référence ultra-rapide pour développement**

---

## 📊 Status Actuel

```
Progression : 42% (17/40 composants)
Build       : ✅ SUCCESS
Phase       : Phase 2 (50% complétée)
```

---

## 🎨 Design Tokens

### Couleurs
```css
bg-background      /* #0A192F - Fond */
bg-surface         /* #10253E - Cartes */
text-foreground    /* #F5F7FA - Texte */
text-muted         /* #A0AEC0 - Texte secondaire */
bg-accent          /* #0D99FF - Bleu */
bg-accentSecondary /* #10B981 - Vert Matrix */
border-border      /* Bordures */
```

### Typographie
```css
font-heading       /* Space Grotesk - Titres */
font-sans          /* Inter - Corps */
font-mono          /* Fira Code - Code */
```

### Espacements
```css
py-section         /* 100px - Sections */
px-gutter          /* 24px - Padding horizontal */
```

### Autres
```css
rounded-lg         /* 12px - Border radius */
shadow-card        /* Ombre cartes */
```

---

## 🎬 Patterns Animation

### 1. Apparition au Scroll
```javascript
const prefersReducedMotion = useReducedMotion();
const animationProps = prefersReducedMotion ? {
  initial: { opacity: 1 }
} : {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

<motion.div {...animationProps} viewport={{ once: true }}>
```

### 2. Hover Scale
```javascript
const hoverProps = prefersReducedMotion ? {} : {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

<motion.button {...hoverProps}>
```

### 3. AnimatePresence
```javascript
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

---

## ✅ Checklist Refactorisation

```
[ ] Ajouter 'use client'
[ ] Importer useReducedMotion
[ ] Remplacer var(--color-*) par tokens
[ ] Ajouter font-heading aux titres
[ ] Créer animationProps conditionnelles
[ ] Ajouter classes motion-reduce:*
[ ] Vérifier focus-visible
[ ] Tester avec prefers-reduced-motion
```

---

## 🚀 Commandes

```bash
npm run dev          # Dev server
npm run build        # Build production
rg "var\(--color-"   # Trouver variables CSS
```

---

## 📂 Fichiers Importants

```
tailwind.config.js              # Tokens
src/lib/useReducedMotion.js     # Hook accessibilité
QUICK_START_NEXT_SESSION.md     # Guide démarrage
ANIMATION_PATTERNS_GUIDE.md     # Patterns détaillés
REFONTE_PROGRESS.md             # Progression
```

---

## 🎯 Prochains Composants

```
1. TestimonialCard.jsx
2. StatItem.jsx
3. CTASection.jsx
4. FormulaireContact.jsx
5. FormulaireDevis.jsx
```

---

## 💡 Tips

- Toujours utiliser `useReducedMotion`
- Préférer tokens Tailwind à CSS variables
- Utiliser `font-heading` pour titres
- Gradient CTA : `from-accent to-accentSecondary`
- AnimatePresence pour modals/tooltips

---

**Dernière mise à jour :** $(date)