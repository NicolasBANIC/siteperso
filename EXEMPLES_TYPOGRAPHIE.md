# 🎨 Exemples d'utilisation de la typographie Inter

Ce document présente des exemples concrets d'utilisation du nouveau système typographique Inter dans vos composants React/Next.js.

---

## 📖 Table des matières

1. [Hero Sections](#hero-sections)
2. [Sections de contenu](#sections-de-contenu)
3. [Cards et composants](#cards-et-composants)
4. [Formulaires](#formulaires)
5. [Navigation](#navigation)
6. [Boutons et CTA](#boutons-et-cta)
7. [Badges et labels](#badges-et-labels)
8. [Listes et features](#listes-et-features)

---

## 🚀 Hero Sections

### Exemple 1 : Hero avec formulaire
```jsx
<section className="relative min-h-[90vh] overflow-hidden">
  <div className="container-page">
    {/* Eyebrow */}
    <span className="eyebrow">
      Disponible pour de nouveaux projets
    </span>

    {/* Titre principal */}
    <h1 className="text-hero font-bold tracking-tighter leading-tight mt-4">
      Je construis vos{" "}
      <span className="gradient-text">
        applications web
      </span>{" "}
      modernes et performantes
    </h1>

    {/* Sous-titre */}
    <p className="text-body-lg leading-relaxed mt-6 text-white/90">
      Développeur Full-Stack spécialisé en{" "}
      <strong className="font-semibold">Next.js</strong>,{" "}
      <strong className="font-semibold">React</strong> et{" "}
      <strong className="font-semibold">Node.js</strong>.
    </p>

    {/* CTA */}
    <div className="flex gap-4 mt-8">
      <Link href="/devis" className="btn-primary">
        Demander un devis
      </Link>
      <Link href="/portfolio" className="btn-secondary">
        Voir mes projets
      </Link>
    </div>
  </div>
</section>
```

### Exemple 2 : Hero simple
```jsx
<section className="py-20 text-center">
  <div className="container-page">
    <span className="eyebrow">Services</span>
    
    <h1 className="text-display font-bold tracking-tight leading-tight mt-4">
      Des solutions web sur mesure pour votre entreprise
    </h1>
    
    <p className="text-body mt-6 max-w-2xl mx-auto">
      Je crée des sites web et applications modernes qui allient design élégant et performances techniques.
    </p>
  </div>
</section>
```

---

## 📄 Sections de contenu

### Exemple 1 : Section avec titre et sous-titre
```jsx
<section className="py-16">
  <div className="container-page">
    {/* En-tête de section */}
    <div className="text-center mb-12">
      <span className="eyebrow">Processus</span>
      
      <h2 className="section-title mt-4">
        Comment je travaille avec vous
      </h2>
      
      <p className="section-subtitle mt-4 mx-auto">
        Un processus éprouvé en 5 étapes pour garantir le succès de votre projet digital.
      </p>
    </div>

    {/* Contenu */}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Cards... */}
    </div>
  </div>
</section>
```

### Exemple 2 : Section avec texte long
```jsx
<section className="py-16">
  <div className="container-page max-w-4xl">
    <h2 className="text-heading-xl font-semibold tracking-tight mb-6">
      À propos de moi
    </h2>
    
    <div className="space-y-4">
      <p className="text-body leading-relaxed">
        Développeur web freelance passionné, je crée des expériences digitales qui allient esthétique moderne et performances techniques. Avec plus de 5 ans d'expérience, j'ai accompagné des dizaines d'entreprises dans leur transformation digitale.
      </p>
      
      <p className="text-body leading-relaxed">
        Ma spécialité ? Les technologies JavaScript modernes comme Next.js, React et Node.js. Je construis des sites ultra-rapides, optimisés pour le SEO et parfaitement responsive.
      </p>
      
      <p className="text-body-sm text-[var(--color-muted)] mt-6">
        Basé à Lyon, je travaille avec des clients partout en France et à l'international.
      </p>
    </div>
  </div>
</section>
```

---

## 🎴 Cards et composants

### Exemple 1 : Service Card
```jsx
<div className="card">
  {/* Badge */}
  <span className="badge mb-4">
    Premium
  </span>

  {/* Titre */}
  <h3 className="text-heading-md font-semibold tracking-tight mb-3">
    Sites Vitrines Premium
  </h3>

  {/* Description */}
  <p className="text-body text-[var(--color-muted)] mb-6">
    Créez une présence en ligne professionnelle qui convertit vos visiteurs en clients. Architecture Next.js pour des performances optimales.
  </p>

  {/* Features */}
  <ul className="space-y-2 mb-6">
    <li className="flex items-start gap-2 text-body-sm">
      <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
      <span>Next.js 15 + React 19</span>
    </li>
    <li className="flex items-start gap-2 text-body-sm">
      <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
      <span>SEO technique avancé</span>
    </li>
  </ul>

  {/* CTA */}
  <Link href="/services" className="btn-primary w-full">
    En savoir plus
  </Link>
</div>
```

### Exemple 2 : Testimonial Card
```jsx
<div className="card">
  {/* Quote */}
  <p className="text-body leading-relaxed mb-6">
    "Nicolas a transformé notre vision en un site web exceptionnel. Son expertise technique et son sens du design ont dépassé nos attentes."
  </p>

  {/* Author */}
  <div className="flex items-center gap-4">
    <Image
      src="/images/avatar.jpg"
      alt="Client"
      width={48}
      height={48}
      className="rounded-full"
    />
    <div>
      <p className="text-ui font-semibold text-[var(--color-foreground)]">
        Marie Dupont
      </p>
      <p className="text-caption text-[var(--color-muted)]">
        CEO, TechStart
      </p>
    </div>
  </div>
</div>
```

### Exemple 3 : Pricing Card
```jsx
<div className="card text-center">
  {/* Plan name */}
  <span className="eyebrow">Starter</span>

  {/* Price */}
  <div className="my-6">
    <span className="text-display font-bold tracking-tight">
      1 500€
    </span>
    <span className="text-body-sm text-[var(--color-muted)]">
      / projet
    </span>
  </div>

  {/* Description */}
  <p className="text-body-sm text-[var(--color-muted)] mb-6">
    Parfait pour les petites entreprises qui veulent une présence en ligne professionnelle.
  </p>

  {/* Features */}
  <ul className="space-y-3 mb-8 text-left">
    <li className="flex items-center gap-2 text-body-sm">
      <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
      <span>Site vitrine 5 pages</span>
    </li>
    <li className="flex items-center gap-2 text-body-sm">
      <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
      <span>Design responsive</span>
    </li>
    <li className="flex items-center gap-2 text-body-sm">
      <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
      <span>SEO de base</span>
    </li>
  </ul>

  {/* CTA */}
  <Link href="/devis" className="btn-primary w-full">
    Choisir ce plan
  </Link>
</div>
```

---

## 📝 Formulaires

### Exemple 1 : Formulaire de contact
```jsx
<form className="space-y-6">
  {/* Titre */}
  <h3 className="text-heading-lg font-semibold tracking-tight mb-6">
    Contactez-moi
  </h3>

  {/* Champ nom */}
  <div>
    <label 
      htmlFor="name" 
      className="block text-ui font-medium mb-2"
    >
      Nom complet
    </label>
    <input
      type="text"
      id="name"
      className="w-full rounded-lg border border-[var(--color-border)] px-4 py-3 text-body"
      placeholder="Jean Dupont"
    />
  </div>

  {/* Champ email */}
  <div>
    <label 
      htmlFor="email" 
      className="block text-ui font-medium mb-2"
    >
      Email
    </label>
    <input
      type="email"
      id="email"
      className="w-full rounded-lg border border-[var(--color-border)] px-4 py-3 text-body"
      placeholder="jean@exemple.com"
    />
  </div>

  {/* Champ message */}
  <div>
    <label 
      htmlFor="message" 
      className="block text-ui font-medium mb-2"
    >
      Message
    </label>
    <textarea
      id="message"
      rows={5}
      className="w-full rounded-lg border border-[var(--color-border)] px-4 py-3 text-body"
      placeholder="Décrivez votre projet..."
    />
    <p className="text-caption text-[var(--color-muted)] mt-2">
      Minimum 50 caractères
    </p>
  </div>

  {/* Submit */}
  <button type="submit" className="btn-primary w-full">
    Envoyer le message
  </button>
</form>
```

---

## 🧭 Navigation

### Exemple 1 : Header navigation
```jsx
<nav className="flex items-center gap-6">
  <Link 
    href="/services" 
    className="text-ui font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
  >
    Services
  </Link>
  <Link 
    href="/portfolio" 
    className="text-ui font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
  >
    Portfolio
  </Link>
  <Link 
    href="/contact" 
    className="text-ui font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
  >
    Contact
  </Link>
</nav>
```

### Exemple 2 : Footer navigation
```jsx
<div>
  <h3 className="text-ui-sm font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-4">
    Navigation
  </h3>
  <ul className="space-y-2">
    <li>
      <Link 
        href="/services" 
        className="text-body-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
      >
        Services
      </Link>
    </li>
    <li>
      <Link 
        href="/portfolio" 
        className="text-body-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
      >
        Portfolio
      </Link>
    </li>
  </ul>
</div>
```

---

## 🔘 Boutons et CTA

### Exemple 1 : Boutons primaires et secondaires
```jsx
<div className="flex flex-wrap gap-4">
  {/* Bouton primaire */}
  <button className="btn-primary">
    Demander un devis
  </button>

  {/* Bouton secondaire */}
  <button className="btn-secondary">
    En savoir plus
  </button>

  {/* Bouton avec icône */}
  <Link href="/contact" className="btn-primary">
    Contactez-moi
    <ArrowRight className="h-5 w-5" />
  </Link>
</div>
```

### Exemple 2 : Boutons de taille personnalisée
```jsx
<div className="space-y-4">
  {/* Large */}
  <button className="btn-primary px-8 py-4 text-ui">
    Bouton large
  </button>

  {/* Normal */}
  <button className="btn-primary">
    Bouton normal
  </button>

  {/* Small */}
  <button className="btn-primary px-4 py-2 text-ui-sm">
    Bouton petit
  </button>
</div>
```

---

## 🏷️ Badges et labels

### Exemple 1 : Badges de technologie
```jsx
<div className="flex flex-wrap gap-2">
  <span className="badge">
    Next.js
  </span>
  <span className="badge">
    React
  </span>
  <span className="badge">
    TypeScript
  </span>
  <span className="badge">
    Tailwind CSS
  </span>
</div>
```

### Exemple 2 : Badges de statut
```jsx
<div className="flex flex-wrap gap-2">
  {/* Succès */}
  <span className="badge bg-green-100 text-green-700 border-green-200">
    ✓ Disponible
  </span>

  {/* Warning */}
  <span className="badge bg-yellow-100 text-yellow-700 border-yellow-200">
    ⚠ En cours
  </span>

  {/* Info */}
  <span className="badge bg-blue-100 text-blue-700 border-blue-200">
    ℹ Nouveau
  </span>
</div>
```

---

## ✅ Listes et features

### Exemple 1 : Liste de features
```jsx
<ul className="space-y-4">
  <li className="flex items-start gap-3">
    <CheckCircle2 className="h-6 w-6 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
    <div>
      <h4 className="text-heading-sm font-semibold mb-1">
        Performance optimale
      </h4>
      <p className="text-body-sm text-[var(--color-muted)]">
        Score Lighthouse >95 garanti sur tous les projets
      </p>
    </div>
  </li>

  <li className="flex items-start gap-3">
    <CheckCircle2 className="h-6 w-6 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
    <div>
      <h4 className="text-heading-sm font-semibold mb-1">
        SEO technique avancé
      </h4>
      <p className="text-body-sm text-[var(--color-muted)]">
        Optimisation complète pour les moteurs de recherche
      </p>
    </div>
  </li>
</ul>
```

### Exemple 2 : Liste simple
```jsx
<ul className="space-y-2">
  <li className="flex items-center gap-2 text-body">
    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
    <span>Next.js 15 + React 19</span>
  </li>
  <li className="flex items-center gap-2 text-body">
    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
    <span>Design responsive mobile-first</span>
  </li>
  <li className="flex items-center gap-2 text-body">
    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
    <span>Accessibilité WCAG 2.1 AA</span>
  </li>
</ul>
```

---

## 🎯 Bonnes pratiques

### 1. **Hiérarchie visuelle**
```jsx
{/* ✅ BON : Hiérarchie claire */}
<div>
  <h2 className="text-heading-xl font-semibold">Titre principal</h2>
  <h3 className="text-heading-md font-semibold">Sous-titre</h3>
  <p className="text-body">Paragraphe</p>
</div>

{/* ❌ MAUVAIS : Pas de hiérarchie */}
<div>
  <h2 className="text-2xl">Titre principal</h2>
  <h3 className="text-2xl">Sous-titre</h3>
  <p className="text-2xl">Paragraphe</p>
</div>
```

### 2. **Graisses appropriées**
```jsx
{/* ✅ BON : Graisses adaptées */}
<h1 className="font-bold">Titre Hero</h1>
<h2 className="font-semibold">Section</h2>
<p className="font-regular">Paragraphe</p>
<button className="font-semibold">CTA</button>

{/* ❌ MAUVAIS : Tout en bold */}
<h1 className="font-bold">Titre Hero</h1>
<h2 className="font-bold">Section</h2>
<p className="font-bold">Paragraphe</p>
<button className="font-bold">CTA</button>
```

### 3. **Letter-spacing**
```jsx
{/* ✅ BON : Letter-spacing adapté */}
<h1 className="tracking-tighter">Grand titre</h1>
<span className="eyebrow tracking-widest">SURTITRE</span>
<p className="tracking-normal">Paragraphe</p>

{/* ❌ MAUVAIS : Letter-spacing inadapté */}
<h1 className="tracking-widest">Grand titre</h1>
<span className="eyebrow tracking-tighter">SURTITRE</span>
```

### 4. **Line-height**
```jsx
{/* ✅ BON : Line-height adapté */}
<h1 className="leading-tight">Titre serré</h1>
<p className="leading-relaxed">Paragraphe aéré</p>

{/* ❌ MAUVAIS : Line-height inadapté */}
<h1 className="leading-relaxed">Titre trop aéré</h1>
<p className="leading-tight">Paragraphe trop serré</p>
```

---

## 📱 Responsive

### Exemple : Adaptation mobile/desktop
```jsx
<section>
  {/* Titre qui s'adapte automatiquement */}
  <h1 className="text-hero font-bold tracking-tighter leading-tight">
    {/* Mobile: 40px, Desktop: 64px */}
    Titre responsive
  </h1>

  {/* Paragraphe qui s'adapte */}
  <p className="text-body leading-relaxed">
    {/* Mobile: 16px, Desktop: 18px */}
    Texte qui s'adapte automatiquement
  </p>

  {/* Bouton qui s'adapte */}
  <button className="btn-primary">
    {/* Mobile: 14px, Desktop: 16px */}
    Call to action
  </button>
</section>
```

---

## ✨ Conclusion

Ces exemples vous permettent d'utiliser efficacement le nouveau système typographique Inter dans tous vos composants. N'hésitez pas à les adapter à vos besoins spécifiques !

**Rappel des classes principales** :
- **Titres** : `.text-hero`, `.text-heading-xl`, `.text-heading-lg`, etc.
- **Corps** : `.text-body`, `.text-body-lg`, `.text-body-sm`
- **UI** : `.text-ui`, `.text-ui-sm`
- **Composants** : `.btn-primary`, `.badge`, `.eyebrow`, `.section-title`

---

**Date** : Décembre 2024  
**Version** : 1.0  
**Auteur** : BANDEV - Nicolas Banic