# 📐 Hiérarchie Visuelle - Typographie Inter

## 🎨 Vue d'ensemble de la hiérarchie

Ce document présente visuellement la hiérarchie typographique complète du site BANDEV.

---

## 📏 Échelle typographique

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  H1 / HERO TITLE                                             │
│  40-64px • Bold 700 • Line-height 1.1 • Letter-spacing -0.02em │
│  .text-hero                                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│                                                      │
│  H2 / SECTION TITLE                                 │
│  28-40px • SemiBold 600 • LH 1.2 • LS -0.01em      │
│  .text-heading-xl                                   │
│                                                      │
└────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│                                                │
│  H3 / SUBSECTION TITLE                        │
│  24-32px • SemiBold 600 • LH 1.25 • LS -0.005em │
│  .text-heading-lg                             │
│                                                │
└──────────────────────────────────────────────┘

┌────────────────────────────────────────┐
│                                          │
│  H4 / CARD TITLE                        │
│  20-24px • SemiBold 600 • LH 1.3        │
│  .text-heading-md                       │
│                                          │
└────────────────────────────────────────┘

┌──────────────────────────────────┐
│                                    │
│  H5 / SMALL HEADING               │
│  18-20px • SemiBold 600 • LH 1.4  │
│  .text-heading-sm                 │
│                                    │
└──────────────────────────────────┘

┌────────────────────────────┐
│                              │
│  BODY LARGE                 │
│  18-20px • Regular 400 • LH 1.6 │
│  .text-body-lg              │
│                              │
└────────────────────────────┘

┌──────────────────────────┐
│                            │
│  BODY / PARAGRAPH         │
│  16-18px • Regular 400 • LH 1.6 │
│  .text-body               │
│                            │
└──────────────────────────┘

┌────────────────────┐
│                      │
│  BODY SMALL         │
│  14-16px • Regular 400 • LH 1.5 │
│  .text-body-sm      │
│                      │
└────────────────────┘

┌──────────────┐
│                │
│  UI / BUTTON  │
│  14-16px • Medium 500 • LH 1.4 │
│  .text-ui     │
│                │
└──────────────┘

┌────────────┐
│              │
│  CAPTION    │
│  12-14px • Regular 400 • LH 1.5 │
│  .text-caption │
│              │
└────────────┘

┌──────────┐
│            │
│  EYEBROW  │
│  12-14px • SemiBold 600 • LS 0.08em │
│  .eyebrow │
│            │
└──────────┘
```

---

## 🎯 Graisses de police

```
┌─────────────────────────────────────────────────────┐
│                                                       │
│  BOLD 700                                            │
│  Usage : H1, Hero, Titres principaux                │
│  Classe : .font-bold                                │
│                                                       │
└─────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│                                                  │
│  SEMIBOLD 600                                   │
│  Usage : H2-H6, Boutons, CTA, Eyebrow          │
│  Classe : .font-semibold                       │
│                                                  │
└────────────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│                                            │
│  MEDIUM 500                               │
│  Usage : Navigation, UI, Badges           │
│  Classe : .font-medium                    │
│                                            │
└──────────────────────────────────────────┘

┌────────────────────────────────────┐
│                                      │
│  REGULAR 400                        │
│  Usage : Paragraphes, Texte principal │
│  Classe : .font-regular             │
│                                      │
└────────────────────────────────────┘
```

---

## ✍️ Letter-spacing

```
┌─────────────────────────────────────────────────────┐
│  TIGHTER (-0.02em)                                  │
│  Usage : H1, Grands titres                          │
│  Classe : .tracking-tighter                         │
└─────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  TIGHT (-0.01em)                                │
│  Usage : H2, H3                                 │
│  Classe : .tracking-tight                       │
└────────────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  NORMAL (0)                               │
│  Usage : Paragraphes                      │
│  Classe : .tracking-normal                │
└──────────────────────────────────────────┘

┌────────────────────────────────────┐
│  W I D E  (0.005em)               │
│  Usage : Boutons, UI               │
│  Classe : .tracking-wide           │
└────────────────────────────────────┘

┌──────────────────────────────┐
│  W I D E R  (0.01em)        │
│  Usage : Badges, Labels      │
│  Classe : .tracking-wider    │
└──────────────────────────────┘

┌────────────────────────┐
│  W I D E S T  (0.08em) │
│  Usage : Eyebrow, UPPERCASE │
│  Classe : .tracking-widest  │
└────────────────────────┘
```

---

## 📐 Line-height

```
┌─────────────────────────────────────────────────────┐
│  TIGHT (1.1)                                        │
│  H1 / Hero Title                                    │
│  Titre principal                                    │
│  Classe : .leading-tight                            │
└─────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  SNUG (1.2)                                     │
│  H2 / Section Title                             │
│  Titre de section                               │
│  Classe : .leading-snug                         │
└────────────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  NORMAL (1.4)                             │
│  Boutons, UI, Navigation                  │
│  Éléments interactifs                     │
│  Classe : .leading-normal                 │
└──────────────────────────────────────────┘

┌────────────────────────────────────┐
│  RELAXED (1.6)                      │
│  Paragraphes, Texte long            │
│  Corps de texte principal           │
│  Lisibilité optimale                │
│  Classe : .leading-relaxed          │
└────────────────────────────────────┘
```

---

## 🎨 Composants visuels

### Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  NOUVEAU                                                      │
│  12-14px • SemiBold 600 • Uppercase • LS 0.08em              │
│  .eyebrow                                                    │
│                                                               │
│  Je construis vos applications web                           │
│  modernes et performantes                                    │
│  40-64px • Bold 700 • LH 1.1 • LS -0.02em                   │
│  .text-hero                                                  │
│                                                               │
│  Développeur Full-Stack spécialisé en Next.js, React        │
│  et Node.js. Je transforme vos idées en solutions digitales. │
│  18-20px • Regular 400 • LH 1.6                             │
│  .text-body-lg                                               │
│                                                               │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  Demander un devis  │  │  Voir mes projets   │          │
│  │  14-16px • SemiBold │  │  14-16px • Medium   │          │
│  │  .btn-primary       │  │  .btn-secondary     │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Section
```
┌────────────────────────────────────────────────────┐
│                                                      │
│  SERVICES                                           │
│  12-14px • SemiBold 600 • Uppercase • LS 0.08em    │
│  .eyebrow                                           │
│                                                      │
│  Des solutions web sur mesure                       │
│  28-40px • SemiBold 600 • LH 1.2 • LS -0.01em      │
│  .section-title                                     │
│                                                      │
│  Je crée des sites web et applications modernes    │
│  qui allient design élégant et performances.        │
│  16-18px • Regular 400 • LH 1.6                    │
│  .section-subtitle                                  │
│                                                      │
└────────────────────────────────────────────────────┘
```

### Card
```
┌──────────────────────────────────────────────┐
│                                                │
│  ┌──────────┐                                 │
│  │ Premium  │                                 │
│  │ 12-14px  │                                 │
│  │ .badge   │                                 │
│  └──────────┘                                 │
│                                                │
│  Sites Vitrines Premium                       │
│  20-24px • SemiBold 600 • LH 1.3              │
│  .text-heading-md                             │
│                                                │
│  Créez une présence en ligne professionnelle  │
│  qui convertit vos visiteurs en clients.      │
│  16-18px • Regular 400 • LH 1.6               │
│  .text-body                                   │
│                                                │
│  ✓ Next.js 15 + React 19                     │
│  ✓ SEO technique avancé                       │
│  ✓ Design responsive                          │
│  14-16px • Regular 400 • LH 1.5               │
│  .text-body-sm                                │
│                                                │
│  ┌─────────────────────┐                      │
│  │  En savoir plus     │                      │
│  │  14-16px • SemiBold │                      │
│  │  .btn-primary       │                      │
│  └─────────────────────┘                      │
│                                                │
└──────────────────────────────────────────────┘
```

---

## 📱 Responsive

### Mobile (< 640px)
```
H1 : 40px  (2.5rem)
H2 : 28px  (1.75rem)
H3 : 24px  (1.5rem)
H4 : 20px  (1.25rem)
Body : 16px (1rem)
UI : 14px  (0.875rem)
```

### Tablet (640px - 1024px)
```
H1 : 40-64px  (viewport-based)
H2 : 28-40px  (viewport-based)
H3 : 24-32px  (viewport-based)
H4 : 20-24px  (viewport-based)
Body : 16-18px (viewport-based)
UI : 14-16px  (viewport-based)
```

### Desktop (> 1024px)
```
H1 : 64px  (4rem)
H2 : 40px  (2.5rem)
H3 : 32px  (2rem)
H4 : 24px  (1.5rem)
Body : 18px (1.125rem)
UI : 16px  (1rem)
```

---

## 🎯 Contraste visuel

### Hiérarchie par graisse
```
┌─────────────────────────────────────────────────────┐
│  TITRE PRINCIPAL (Bold 700)                         │
│  Impact maximal, attention immédiate                │
└─────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  Titre de section (SemiBold 600)              │
│  Importance élevée, structure claire           │
└────────────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Navigation et UI (Medium 500)           │
│  Éléments interactifs, lisibilité        │
└──────────────────────────────────────────┘

┌────────────────────────────────────┐
│  Paragraphe standard (Regular 400) │
│  Texte principal, lecture confortable │
└────────────────────────────────────┘
```

### Hiérarchie par taille
```
┌─────────────────────────────────────────────────────┐
│  HERO TITLE (40-64px)                               │
│  Attention maximale                                 │
└─────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  Section Title (28-40px)                       │
│  Structure principale                          │
└────────────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Subsection (24-32px)                    │
│  Sous-structure                          │
└──────────────────────────────────────────┘

┌────────────────────────────────────┐
│  Card Title (20-24px)              │
│  Composants                        │
└────────────────────────────────────┘

┌──────────────────────────────┐
│  Body Text (16-18px)         │
│  Contenu principal           │
└──────────────────────────────┘

┌────────────────────┐
│  UI / Caption (12-16px) │
│  Détails et labels │
└────────────────────┘
```

---

## ✨ Bonnes pratiques

### ✅ Hiérarchie claire
```
H1 (Bold 700, 40-64px)
  └─ H2 (SemiBold 600, 28-40px)
      └─ H3 (SemiBold 600, 24-32px)
          └─ Body (Regular 400, 16-18px)
```

### ✅ Contraste de graisse
```
Titre (SemiBold 600)
  └─ Paragraphe (Regular 400)
      └─ CTA (SemiBold 600)
```

### ✅ Espacement cohérent
```
H1
  ↓ margin-bottom: 1.5em
Body
  ↓ margin-bottom: 1.5em
Body
  ↓ margin-bottom: 2em
H2
```

---

## 🎨 Palette typographique complète

```
TITRES
├─ .text-hero          → 40-64px, Bold 700
├─ .text-display       → 32-48px, Bold 700
├─ .text-heading-xl    → 28-40px, SemiBold 600
├─ .text-heading-lg    → 24-32px, SemiBold 600
├─ .text-heading-md    → 20-24px, SemiBold 600
└─ .text-heading-sm    → 18-20px, SemiBold 600

CORPS
├─ .text-body-lg       → 18-20px, Regular 400
├─ .text-body          → 16-18px, Regular 400
├─ .text-body-sm       → 14-16px, Regular 400
└─ .text-caption       → 12-14px, Regular 400

UI
├─ .text-ui            → 14-16px, Medium 500
└─ .text-ui-sm         → 12-14px, Medium 500

COMPOSANTS
├─ .btn-primary        → 14-16px, SemiBold 600
├─ .btn-secondary      → 14-16px, Medium 500
├─ .badge              → 12-14px, Medium 500
├─ .eyebrow            → 12-14px, SemiBold 600
├─ .section-title      → 28-40px, Bold 700
└─ .section-subtitle   → 16-18px, Regular 400
```

---

## 📊 Récapitulatif

### Graisses
- **Bold 700** : H1, Hero, Titres principaux
- **SemiBold 600** : H2-H6, Boutons, CTA
- **Medium 500** : Navigation, UI, Badges
- **Regular 400** : Paragraphes, Texte

### Tailles
- **40-64px** : Hero, H1
- **28-40px** : Sections, H2
- **24-32px** : Sous-sections, H3
- **20-24px** : Cards, H4
- **16-18px** : Paragraphes
- **14-16px** : UI, Boutons
- **12-14px** : Badges, Captions

### Letter-spacing
- **-0.02em** : Grands titres (H1)
- **-0.01em** : Titres (H2, H3)
- **0** : Paragraphes
- **+0.005em** : Boutons, UI
- **+0.08em** : Eyebrow, Uppercase

### Line-height
- **1.1** : H1 (serré)
- **1.2** : H2, H3 (serré)
- **1.4** : UI, Boutons (normal)
- **1.6** : Paragraphes (aéré)

---

**Dernière mise à jour** : Décembre 2024  
**Version** : 1.0  
**Auteur** : BANDEV - Nicolas Banic