# 🎯 Guide d'Application des Nouvelles Classes

## 📋 Comment Utiliser les Nouvelles Classes de Sections

Ce guide vous montre comment appliquer les nouvelles classes pour optimiser l'organisation visuelle de vos pages.

---

## 🎨 Choisir la Bonne Classe de Section

### Décision Rapide

```
Beaucoup de contenu (> 500 mots) → .section-auto
Contenu normal (200-500 mots)    → .section (défaut)
Peu de contenu (< 200 mots)      → .section-compact
Hero section (plein écran)       → .section-full
```

---

## 📝 Exemples Pratiques

### 1. Section Stats (Peu de Contenu)

**❌ AVANT :**
```jsx
<section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-16">
  <div className="container-page">
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {/* Stats */}
    </div>
  </div>
</section>
```

**✅ APRÈS :**
```jsx
<section className="section-compact border-b border-[var(--color-border)] bg-[var(--color-surface)]">
  <div className="container-centered">
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {/* Stats */}
    </div>
  </div>
</section>
```

**Changements :**
- `py-16` → Supprimé (géré par `.section-compact`)
- `.container-page` → `.container-centered`
- Ajout de `.section-compact` pour réduire la hauteur

---

### 2. Section Services (Contenu Normal)

**❌ AVANT :**
```jsx
<section className="container-page relative">
  <ParticlesBackground />
  
  <ScrollReveal direction="up">
    <div className="relative z-10 mb-16 space-y-4 text-center">
      <div className="eyebrow mx-auto">Services</div>
      <h2 className="section-title">
        Une expertise technique complète
      </h2>
      <p className="section-subtitle mx-auto">
        Du maquettage à la mise en production...
      </p>
    </div>
  </ScrollReveal>
  
  {/* Contenu */}
</section>
```

**✅ APRÈS :**
```jsx
<section className="section relative">
  <ParticlesBackground />
  
  <div className="section-content">
    <ScrollReveal direction="up">
      <div className="relative z-10 mb-16 space-y-4">
        <div className="eyebrow">Services</div>
        <h2 className="section-title">
          Une expertise technique complète
        </h2>
        <p className="section-subtitle">
          Du maquettage à la mise en production...
        </p>
      </div>
    </ScrollReveal>
    
    {/* Contenu */}
  </div>
</section>
```

**Changements :**
- `.container-page` → `.section` + `.section-content`
- Suppression de `text-center` et `mx-auto` (géré par `.section-content`)
- Centrage automatique du contenu

---

### 3. Hero Section (Plein Écran)

**❌ AVANT :**
```jsx
<section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#0047AB] via-[#006D77] to-[#0047AB]">
  <div className="container-page relative z-10 flex min-h-[90vh] items-center">
    {/* Contenu */}
  </div>
</section>
```

**✅ APRÈS :**
```jsx
<section className="section-full relative overflow-hidden bg-gradient-to-br from-[#0047AB] via-[#006D77] to-[#0047AB]">
  <div className="container-centered relative z-10 w-full">
    {/* Contenu */}
  </div>
</section>
```

**Changements :**
- `min-h-[90vh]` → `.section-full` (gère automatiquement)
- `.container-page` → `.container-centered`
- Suppression de `flex min-h-[90vh] items-center` (géré par `.section-full`)

---

### 4. Section Portfolio (Beaucoup de Contenu)

**❌ AVANT :**
```jsx
<section className="container-page">
  <div className="mb-16 space-y-4 text-center">
    <h2 className="section-title">Portfolio</h2>
    <p className="section-subtitle mx-auto">Mes réalisations</p>
  </div>
  
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {/* Grille de projets */}
  </div>
</section>
```

**✅ APRÈS :**
```jsx
<section className="section-auto">
  <div className="section-content mb-16">
    <h2 className="section-title">Portfolio</h2>
    <p className="section-subtitle">Mes réalisations</p>
  </div>
  
  <div className="container-centered">
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Grille de projets */}
    </div>
  </div>
</section>
```

**Changements :**
- Ajout de `.section-auto` pour hauteur adaptative
- `.section-content` pour l'intro centrée
- `.container-centered` pour la grille
- Suppression de `text-center` et `mx-auto`

---

## 🎯 Règles de Centrage des Textes

### Textes Centrés (Par Défaut)

Utilisez `.section-content` pour :
- Introductions de sections
- Titres et sous-titres
- Textes courts (< 3 lignes)
- Appels à l'action

```jsx
<div className="section-content">
  <h2 className="section-title">Titre Centré</h2>
  <p className="section-subtitle">Sous-titre centré</p>
</div>
```

### Textes Alignés à Gauche

Utilisez `.section-content-left` pour :
- Paragraphes longs (> 3 lignes)
- Listes à puces
- Contenu détaillé
- Articles de blog

```jsx
<div className="section-content-left">
  <h2 className="section-title text-left">Titre à Gauche</h2>
  <p className="body-regular">
    Long paragraphe avec beaucoup de texte...
  </p>
</div>
```

---

## 📐 Hiérarchie Typographique

### Structure Recommandée

```jsx
<section className="section">
  <div className="section-content">
    {/* Eyebrow (surtitre) */}
    <div className="eyebrow mb-4">Services</div>
    
    {/* Titre principal */}
    <h2 className="section-title">
      Titre de la Section
    </h2>
    
    {/* Sous-titre / Description */}
    <p className="section-subtitle">
      Description courte et engageante de la section.
    </p>
  </div>
  
  {/* Contenu principal */}
  <div className="container-centered mt-12">
    {/* Cartes, grilles, etc. */}
  </div>
</section>
```

### Classes de Titres

```jsx
/* Titre Hero (page d'accueil) */
<h1 className="text-hero">Je construis vos applications web</h1>

/* Titre de section */
<h2 className="section-title">Services</h2>

/* Sous-titre de section */
<p className="section-subtitle">Description de la section</p>

/* Titre de carte */
<h3 className="heading-secondary">Titre de Carte</h3>

/* Titre tertiaire */
<h4 className="heading-tertiary">Sous-section</h4>
```

### Classes de Corps de Texte

```jsx
/* Texte large (intro, lead) */
<p className="body-large">
  Texte d'introduction important...
</p>

/* Texte normal (paragraphes) */
<p className="body-regular">
  Contenu standard de la page...
</p>

/* Petit texte (notes, légendes) */
<p className="body-small">
  Note ou légende...
</p>
```

---

## 🎨 Conteneurs et Largeurs

### Largeurs Disponibles

```jsx
/* Large (1280px) - Par défaut */
<div className="container-centered">
  {/* Contenu */}
</div>

/* Étroit (896px) - Pour textes longs */
<div className="container-narrow">
  {/* Article, blog */}
</div>

/* Très large (1536px) - Pour grilles */
<div className="container-wide">
  {/* Portfolio, galerie */}
</div>
```

### Quand Utiliser Chaque Largeur

**`.container-centered` (1280px)**
- Sections normales
- Grilles de services
- Formulaires
- Navigation

**`.container-narrow` (896px)**
- Articles de blog
- Pages de contenu
- Textes longs
- À propos

**`.container-wide` (1536px)**
- Portfolio (grilles 3-4 colonnes)
- Galeries d'images
- Tableaux de données
- Dashboards

---

## 🚀 Espacements Standardisés

### Classes d'Espacement

```jsx
/* Espacement normal */
<section className="section-spacing">
  {/* py-16 md:py-24 */}
</section>

/* Espacement réduit */
<section className="section-spacing-sm">
  {/* py-12 md:py-16 */}
</section>

/* Espacement large */
<section className="section-spacing-lg">
  {/* py-20 md:py-32 */}
</section>
```

### Quand Utiliser

**`.section-spacing` (Normal)**
- Sections standards
- Services, processus
- La plupart des sections

**`.section-spacing-sm` (Réduit)**
- Sections compactes
- Stats, badges
- Séparateurs visuels

**`.section-spacing-lg` (Large)**
- Hero sections
- Sections importantes
- Appels à l'action

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile */
< 768px   → Tailles minimales, 1 colonne

/* Tablet */
768px - 1024px → Tailles intermédiaires, 2 colonnes

/* Desktop */
> 1024px  → Tailles maximales, 3-4 colonnes
```

### Classes Responsive

```jsx
/* Grille responsive */
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {/* Auto-adaptatif */}
</div>

/* Texte responsive */
<h2 className="text-heading-xl">
  {/* clamp(1.75rem, 4vw, 2.5rem) */}
</h2>

/* Espacement responsive */
<section className="section">
  {/* padding-block: clamp(3rem, 8vw, 6rem) */}
</section>
```

---

## ✅ Checklist d'Application

### Pour Chaque Section

- [ ] Choisir la bonne classe de section (`.section`, `.section-compact`, `.section-full`, `.section-auto`)
- [ ] Utiliser `.section-content` ou `.section-content-left` pour l'intro
- [ ] Appliquer `.container-centered`, `.container-narrow`, ou `.container-wide`
- [ ] Vérifier la hiérarchie des titres (`.section-title`, `.section-subtitle`)
- [ ] Utiliser les classes de corps de texte (`.body-large`, `.body-regular`, `.body-small`)
- [ ] Tester le responsive sur mobile, tablet, desktop
- [ ] Vérifier les espacements (pas trop de blanc, pas trop serré)

### Pour le Header

- [ ] Logo centré verticalement
- [ ] Navigation alignée
- [ ] Bouton CTA centré
- [ ] Menu mobile fonctionnel
- [ ] Transitions fluides au scroll

### Pour les Textes

- [ ] Hiérarchie claire (H1 > H2 > H3 > p)
- [ ] Line-height confortable (1.6-1.7)
- [ ] Contrastes suffisants
- [ ] Tailles responsive avec `clamp()`
- [ ] Alignement cohérent (centré ou gauche)

---

## 🎯 Exemples de Pages Complètes

### Page d'Accueil

```jsx
export default function HomePage() {
  return (
    <>
      {/* Hero Section - Plein écran */}
      <section className="section-full relative overflow-hidden bg-gradient-to-br from-[#0047AB] via-[#006D77] to-[#0047AB]">
        <div className="container-centered relative z-10 w-full">
          {/* Contenu hero */}
        </div>
      </section>

      {/* Stats Section - Compacte */}
      <section className="section-compact border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="container-centered">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stats */}
          </div>
        </div>
      </section>

      {/* Services Section - Normale */}
      <section className="section relative">
        <div className="section-content mb-16">
          <div className="eyebrow">Services</div>
          <h2 className="section-title">
            Une expertise technique complète
          </h2>
          <p className="section-subtitle">
            Du maquettage à la mise en production...
          </p>
        </div>
        
        <div className="container-centered">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Services */}
          </div>
        </div>
      </section>

      {/* CTA Section - Compacte */}
      <section className="section-compact bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)]">
        <div className="section-content text-white">
          <h2 className="section-title text-white">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="section-subtitle text-white/90">
            Discutons de vos besoins
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Me contacter
          </Link>
        </div>
      </section>
    </>
  );
}
```

### Page Portfolio

```jsx
export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-full relative">
        <div className="section-content">
          <h1 className="text-hero">Portfolio</h1>
          <p className="body-large">
            Découvrez mes réalisations
          </p>
        </div>
      </section>

      {/* Projets Section - Auto */}
      <section className="section-auto">
        <div className="section-content mb-16">
          <div className="eyebrow">Réalisations</div>
          <h2 className="section-title">Mes Projets</h2>
          <p className="section-subtitle">
            Une sélection de mes meilleurs travaux
          </p>
        </div>
        
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Grille de projets */}
          </div>
        </div>
      </section>
    </>
  );
}
```

---

## 📚 Ressources

### Fichiers de Référence

- `/src/app/globals.css` - Toutes les classes CSS
- `/src/components/Header.jsx` - Header optimisé
- `/public/brand/logo.svg` - Logo BANDEV
- `REFONTE_VISUELLE_COMPLETE.md` - Documentation complète

### Classes Principales

```css
/* Sections */
.section, .section-full, .section-compact, .section-auto

/* Conteneurs */
.section-content, .section-content-left
.container-centered, .container-narrow, .container-wide

/* Titres */
.section-title, .section-subtitle
.heading-primary, .heading-secondary, .heading-tertiary

/* Corps de texte */
.body-large, .body-regular, .body-small

/* Centrage */
.center-x, .center-y, .center-xy, .center-content, .center-text

/* Espacements */
.section-spacing, .section-spacing-sm, .section-spacing-lg
```

---

**Date de création :** 2025
**Version :** 1.0.0
**Statut :** ✅ Prêt à l'emploi