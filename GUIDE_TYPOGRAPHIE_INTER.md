# 🎨 Guide Typographique Inter - BANDEV

## 📖 Vue d'ensemble

Ce guide présente le système typographique complet du site BANDEV, basé sur la police **Inter** de Google Fonts. La hiérarchie est conçue pour être moderne, professionnelle et entièrement responsive.

---

## 🔠 Police de caractères

### **Inter** (Google Fonts)
- **Graisses disponibles** : 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Optimisations** : `font-display: swap` pour des performances optimales
- **Variable CSS** : `--font-inter`

---

## 📏 Hiérarchie typographique

### **Titres et Headers**

#### H1 / Hero Title
```css
font-size: clamp(2.5rem, 5vw, 4rem);     /* 40-64px */
font-weight: 700;                         /* Bold */
line-height: 1.1;
letter-spacing: -0.02em;
```
**Usage** : Titres principaux de page, hero sections
**Classes** : `.text-hero`, `h1`

#### H2 / Section Title
```css
font-size: clamp(1.75rem, 4vw, 2.5rem);  /* 28-40px */
font-weight: 600;                         /* SemiBold */
line-height: 1.2;
letter-spacing: -0.01em;
```
**Usage** : Titres de sections principales
**Classes** : `.text-heading-xl`, `.section-title`, `h2`

#### H3 / Subsection Title
```css
font-size: clamp(1.5rem, 3vw, 2rem);     /* 24-32px */
font-weight: 600;                         /* SemiBold */
line-height: 1.25;
letter-spacing: -0.005em;
```
**Usage** : Sous-titres de sections
**Classes** : `.text-heading-lg`, `h3`

#### H4 / Card Title
```css
font-size: clamp(1.25rem, 2.5vw, 1.5rem); /* 20-24px */
font-weight: 600;                          /* SemiBold */
line-height: 1.3;
```
**Usage** : Titres de cartes, composants
**Classes** : `.text-heading-md`, `h4`

---

### **Corps de texte**

#### Paragraphe Large
```css
font-size: clamp(1.125rem, 2vw, 1.25rem); /* 18-20px */
font-weight: 400;                          /* Regular */
line-height: 1.6;
```
**Usage** : Introductions, textes importants
**Classes** : `.text-body-lg`

#### Paragraphe Standard
```css
font-size: clamp(1rem, 2vw, 1.125rem);    /* 16-18px */
font-weight: 400;                          /* Regular */
line-height: 1.6;
margin-bottom: 1.5em;
```
**Usage** : Texte principal, descriptions
**Classes** : `.text-body`, `p`

#### Paragraphe Petit
```css
font-size: clamp(0.875rem, 1.5vw, 1rem);  /* 14-16px */
font-weight: 400;                          /* Regular */
line-height: 1.5;
```
**Usage** : Textes secondaires, notes
**Classes** : `.text-body-sm`

---

### **Éléments UI**

#### Boutons / CTA
```css
font-size: clamp(0.875rem, 2vw, 1rem);    /* 14-16px */
font-weight: 600;                          /* SemiBold */
line-height: 1.4;
letter-spacing: 0.005em;
```
**Usage** : Boutons, call-to-actions
**Classes** : `.btn-primary`, `.btn-secondary`, `.text-ui`

#### Menus / Navigation
```css
font-size: clamp(0.875rem, 2vw, 1rem);    /* 14-16px */
font-weight: 500;                          /* Medium */
line-height: 1.4;
letter-spacing: 0.005em;
```
**Usage** : Navigation, menus
**Classes** : `.text-ui`

#### Badges / Labels
```css
font-size: clamp(0.75rem, 1.5vw, 0.875rem); /* 12-14px */
font-weight: 500;                            /* Medium */
line-height: 1.4;
letter-spacing: 0.01em;
```
**Usage** : Badges, tags, labels
**Classes** : `.badge`, `.text-ui-sm`

#### Eyebrow / Surtitre
```css
font-size: clamp(0.75rem, 1.5vw, 0.875rem); /* 12-14px */
font-weight: 600;                            /* SemiBold */
letter-spacing: 0.08em;
text-transform: uppercase;
```
**Usage** : Surtitres, catégories
**Classes** : `.eyebrow`

#### Caption / Légende
```css
font-size: clamp(0.75rem, 1.5vw, 0.875rem); /* 12-14px */
font-weight: 400;                            /* Regular */
line-height: 1.5;
```
**Usage** : Légendes, petits textes
**Classes** : `.text-caption`, `small`

---

## 🎯 Classes utilitaires Tailwind

### Tailles de police
```html
<!-- Titres -->
<h1 class="text-hero">Hero Title</h1>
<h2 class="text-display">Display Title</h2>
<h2 class="text-heading-xl">Section Title</h2>
<h3 class="text-heading-lg">Subsection</h3>
<h4 class="text-heading-md">Card Title</h4>
<h5 class="text-heading-sm">Small Heading</h5>

<!-- Corps de texte -->
<p class="text-body-lg">Large paragraph</p>
<p class="text-body">Standard paragraph</p>
<p class="text-body-sm">Small paragraph</p>
<small class="text-caption">Caption text</small>

<!-- UI -->
<button class="text-ui">Button</button>
<span class="text-ui-sm">Small UI</span>
```

### Graisses de police
```html
<p class="font-regular">Regular 400</p>
<p class="font-medium">Medium 500</p>
<p class="font-semibold">SemiBold 600</p>
<p class="font-bold">Bold 700</p>
```

### Letter-spacing
```html
<h1 class="tracking-tighter">-0.02em</h1>
<h2 class="tracking-tight">-0.01em</h2>
<p class="tracking-normal">0</p>
<button class="tracking-wide">0.005em</button>
<span class="tracking-wider">0.01em</span>
<span class="tracking-widest">0.08em (uppercase)</span>
```

### Line-height
```html
<h1 class="leading-tight">1.1</h1>
<h2 class="leading-snug">1.2</h2>
<button class="leading-normal">1.4</button>
<p class="leading-relaxed">1.6</p>
```

---

## 📱 Responsive Design

Toutes les tailles utilisent `clamp()` pour une adaptation fluide :

```css
/* Exemple : H1 */
font-size: clamp(
  2.5rem,  /* Minimum (mobile) : 40px */
  5vw,     /* Préféré (viewport) */
  4rem     /* Maximum (desktop) : 64px */
);
```

### Breakpoints de référence
- **Mobile** : < 640px → Tailles minimales
- **Tablet** : 640px - 1024px → Tailles intermédiaires (viewport-based)
- **Desktop** : > 1024px → Tailles maximales

---

## ✨ Bonnes pratiques

### 1. **Hiérarchie visuelle**
- Utilisez les graisses pour créer du contraste
- H1/H2 → Bold (700) ou SemiBold (600)
- Paragraphes → Regular (400)
- UI → Medium (500) ou SemiBold (600)

### 2. **Lisibilité**
- Line-height : 1.6 pour les paragraphes
- Line-height : 1.1-1.2 pour les titres
- Letter-spacing négatif pour les grands titres (-0.02em)
- Letter-spacing positif pour les petits textes en majuscules (0.08em)

### 3. **Espacements**
- Marges verticales : 1.5em à 2em entre paragraphes
- Marges inférieures marquées pour les titres
- Espacement cohérent dans les composants

### 4. **Accessibilité**
- Taille minimale : 16px (1rem) pour le corps de texte
- Contraste suffisant (WCAG AA minimum)
- Texte responsive sans zoom horizontal

---

## 🎨 Exemples d'utilisation

### Hero Section
```jsx
<section>
  <span className="eyebrow">Disponible pour de nouveaux projets</span>
  <h1 className="text-hero font-bold tracking-tighter leading-tight">
    Je construis vos applications web modernes
  </h1>
  <p className="text-body-lg leading-relaxed">
    Développeur Full-Stack spécialisé en Next.js et React
  </p>
  <button className="btn-primary">
    Demander un devis
  </button>
</section>
```

### Card Component
```jsx
<div className="card">
  <h3 className="text-heading-md font-semibold">
    Sites Vitrines Premium
  </h3>
  <p className="text-body text-[var(--color-muted)]">
    Créez une présence en ligne professionnelle qui convertit.
  </p>
  <span className="badge">Next.js</span>
</div>
```

### Navigation
```jsx
<nav>
  <Link className="text-ui font-medium hover:text-[var(--color-accent)]">
    Services
  </Link>
</nav>
```

---

## 🔧 Configuration technique

### Next.js Font Loading
```javascript
// src/app/layout.jsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});
```

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 5vw, 4rem)',
        // ... autres tailles
      },
    },
  },
};
```

### CSS Global
```css
/* src/app/globals.css */
html {
  font-family: var(--font-inter), system-ui, sans-serif;
}

body {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
  font-weight: 400;
}
```

---

## 📊 Récapitulatif des graisses

| Élément | Graisse | Usage |
|---------|---------|-------|
| **H1, Hero** | 700 (Bold) | Titres principaux |
| **H2, H3, H4** | 600 (SemiBold) | Sous-titres |
| **Boutons, CTA** | 600 (SemiBold) | Actions importantes |
| **Navigation, UI** | 500 (Medium) | Éléments interactifs |
| **Paragraphes** | 400 (Regular) | Texte principal |
| **Badges, Labels** | 500 (Medium) | Petits éléments UI |
| **Eyebrow** | 600 (SemiBold) | Surtitres |

---

## ✅ Checklist de vérification

- [x] Police Inter chargée via `next/font/google`
- [x] Variable CSS `--font-inter` configurée
- [x] Hiérarchie H1-H6 définie avec `clamp()`
- [x] Classes utilitaires créées (`.text-hero`, `.text-body`, etc.)
- [x] Graisses 400, 500, 600, 700 disponibles
- [x] Letter-spacing optimisé pour chaque niveau
- [x] Line-height adapté (1.1 pour titres, 1.6 pour texte)
- [x] Responsive avec `clamp()` sur tous les éléments
- [x] Classes Tailwind configurées dans `tailwind.config.js`
- [x] Composants `.btn-primary`, `.badge`, `.eyebrow` mis à jour

---

## 🚀 Résultat attendu

✨ **Site moderne et professionnel** avec :
- Typographie élégante et lisible
- Hiérarchie visuelle claire
- Adaptation fluide sur tous les écrans
- Performance optimale (font-display: swap)
- Cohérence parfaite dans tout le site

---

**Dernière mise à jour** : Décembre 2024  
**Version** : 1.0  
**Auteur** : BANDEV - Nicolas Banic