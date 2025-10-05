# 📚 Guide d'Utilisation - Composants et Styles UI/UX

## 🎨 Comment Utiliser les Nouveaux Éléments

---

## 1. Matrix Rain

### Utilisation de Base
```jsx
import MatrixRain from "@/components/MatrixRain";

<section className="relative min-h-screen">
  {/* Matrix Rain en arrière-plan */}
  <div className="absolute inset-0 z-0">
    <MatrixRain />
  </div>
  
  {/* Votre contenu par-dessus */}
  <div className="relative z-10">
    <h1>Votre contenu ici</h1>
  </div>
</section>
```

### Personnalisation
```jsx
// Dans src/components/MatrixRain.jsx

// Changer l'opacité (ligne 88)
className="absolute inset-0 opacity-[0.15]"  // 0.15 = 15%

// Changer la couleur (ligne 53)
ctx.fillStyle = '#00FF41';  // Vert Matrix

// Changer la vitesse (ligne 74)
animationInterval = setInterval(draw, 50);  // 50ms = 20 FPS

// Changer le fade effect (ligne 50)
ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';  // Blanc pour fond clair
```

---

## 2. Logo BANDEV

### Utilisation dans le Header
```jsx
import Link from "next/link";

<Link href="/" className="transition-all duration-300 hover:scale-105">
  <img
    src="/brand/logo.svg"
    alt="BAN.DEV"
    width="312"
    height="60"
    className="h-10 w-auto md:h-[48px]"
  />
</Link>
```

### Utilisation Standalone
```jsx
// Logo seul
<img src="/brand/logo.svg" alt="BAN.DEV" className="h-12 w-auto" />

// Logo avec lien
<Link href="/">
  <img src="/brand/logo.svg" alt="BAN.DEV" className="h-12 w-auto" />
</Link>

// Logo avec effet hover personnalisé
<img 
  src="/brand/logo.svg" 
  alt="BAN.DEV" 
  className="h-12 w-auto transition-transform hover:scale-110"
/>
```

---

## 3. Boutons

### Bouton Primaire
```jsx
// Classe CSS
<button className="btn-primary">
  Cliquez ici
</button>

// Avec icône
<button className="btn-primary">
  <span>Cliquez ici</span>
  <ArrowRight className="h-5 w-5" />
</button>

// Avec lien
<Link href="/contact" className="btn-primary">
  Contactez-nous
</Link>
```

### Bouton Secondaire
```jsx
// Classe CSS
<button className="btn-secondary">
  En savoir plus
</button>

// Avec icône
<button className="btn-secondary">
  <span>En savoir plus</span>
  <ArrowRight className="h-5 w-5" />
</button>

// Avec lien
<Link href="/about" className="btn-secondary">
  À propos
</Link>
```

### Bouton avec Tailwind (personnalisé)
```jsx
// Bouton bleu avec hover
<button className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-full transition-all duration-300 hover:bg-[var(--color-accent-hover)] hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
  Bouton personnalisé
</button>

// Bouton vert Matrix
<button className="px-6 py-3 bg-[var(--color-accent-matrix)] text-[var(--color-foreground)] rounded-full transition-all duration-300 hover:bg-[var(--color-accent-matrix-hover)] hover:scale-105">
  Bouton Matrix
</button>

// Bouton doré
<button className="px-6 py-3 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] text-white rounded-full transition-all duration-300 hover:shadow-[var(--shadow-gold)] hover:-translate-y-1">
  Bouton Premium
</button>
```

---

## 4. Cartes

### Carte Simple
```jsx
<div className="card">
  <h3 className="text-h3 mb-4">Titre de la carte</h3>
  <p className="text-body">Contenu de la carte</p>
</div>
```

### Carte avec Hover Désactivé
```jsx
<div className="card" style={{ transform: 'none' }}>
  <h3 className="text-h3 mb-4">Carte sans hover</h3>
  <p className="text-body">Pas d'effet au survol</p>
</div>
```

### GlassmorphismCard
```jsx
import GlassmorphismCard from "@/components/GlassmorphismCard";

// Variant par défaut
<GlassmorphismCard>
  <h3 className="text-h3 mb-4">Carte glassmorphism</h3>
  <p className="text-body">Avec effet de flou</p>
</GlassmorphismCard>

// Variant accent (bleu)
<GlassmorphismCard variant="accent">
  <h3 className="text-h3 mb-4">Carte accent</h3>
  <p className="text-body">Fond bleu léger</p>
</GlassmorphismCard>

// Variant gradient (bleu-vert)
<GlassmorphismCard variant="gradient">
  <h3 className="text-h3 mb-4">Carte gradient</h3>
  <p className="text-body">Dégradé bleu-vert</p>
</GlassmorphismCard>

// Variant gold (doré) - NOUVEAU
<GlassmorphismCard variant="gold">
  <h3 className="text-h3 mb-4">Carte premium</h3>
  <p className="text-body">Fond doré pour contenu premium</p>
</GlassmorphismCard>

// Sans effet hover
<GlassmorphismCard hover={false}>
  <h3 className="text-h3 mb-4">Carte statique</h3>
  <p className="text-body">Pas d'effet au survol</p>
</GlassmorphismCard>
```

---

## 5. Badges

### Badge Simple
```jsx
<span className="badge">
  Nouveau
</span>
```

### Badge avec Icône
```jsx
<span className="badge">
  <CheckCircle2 className="h-4 w-4" />
  <span>Vérifié</span>
</span>
```

### Badge Personnalisé
```jsx
// Badge bleu
<span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-[var(--color-accent)] transition-all duration-300 hover:scale-105">
  Badge bleu
</span>

// Badge vert succès
<span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-secondary)]/30 bg-[var(--color-accent-secondary)]/10 px-3 py-1 text-[var(--color-accent-secondary)] transition-all duration-300 hover:scale-105">
  Succès
</span>

// Badge doré
<span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1 text-[var(--color-gold)] transition-all duration-300 hover:scale-105">
  Premium
</span>
```

---

## 6. Formulaires

### Input Texte
```jsx
<div>
  <label htmlFor="name">Nom</label>
  <input 
    type="text" 
    id="name" 
    placeholder="Votre nom"
  />
</div>
```

### Input Email
```jsx
<div>
  <label htmlFor="email">Email</label>
  <input 
    type="email" 
    id="email" 
    placeholder="votre@email.com"
  />
</div>
```

### Textarea
```jsx
<div>
  <label htmlFor="message">Message</label>
  <textarea 
    id="message" 
    rows="5"
    placeholder="Votre message..."
  />
</div>
```

### Select
```jsx
<div>
  <label htmlFor="service">Service</label>
  <select id="service">
    <option value="">Choisir un service</option>
    <option value="web">Site web</option>
    <option value="app">Application</option>
    <option value="seo">SEO</option>
  </select>
</div>
```

### Formulaire Complet
```jsx
<form className="space-y-6">
  <div>
    <label htmlFor="name">Nom</label>
    <input type="text" id="name" placeholder="Votre nom" />
  </div>
  
  <div>
    <label htmlFor="email">Email</label>
    <input type="email" id="email" placeholder="votre@email.com" />
  </div>
  
  <div>
    <label htmlFor="message">Message</label>
    <textarea id="message" rows="5" placeholder="Votre message..." />
  </div>
  
  <button type="submit" className="btn-primary">
    Envoyer
  </button>
</form>
```

---

## 7. Navigation

### Lien de Navigation
```jsx
import Link from "next/link";
import { usePathname } from "next/navigation";

const pathname = usePathname();
const isActive = pathname === "/about";

<Link
  href="/about"
  className={`relative inline-flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-300 ${
    isActive
      ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[var(--color-accent)]"
      : "text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-hover)]"
  }`}
>
  À propos
</Link>
```

### Menu de Navigation Complet
```jsx
const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

<nav className="flex items-center gap-6">
  {links.map((link) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`relative inline-flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-300 ${
          isActive
            ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[var(--color-accent)]"
            : "text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-hover)]"
        }`}
      >
        {link.label}
      </Link>
    );
  })}
</nav>
```

---

## 8. Animations

### Shimmer (Brillance)
```jsx
// Déjà intégré dans GlassmorphismCard
<GlassmorphismCard>
  {/* Effet shimmer automatique */}
</GlassmorphismCard>

// Utilisation manuelle
<div className="relative overflow-hidden">
  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-[var(--color-accent-matrix)]/10 to-transparent" />
  <div className="relative z-10">
    Contenu avec shimmer
  </div>
</div>
```

### Fade-in (Apparition)
```jsx
<div className="animate-fade-in">
  Contenu qui apparaît en fondu
</div>
```

### Slide-up (Glissement)
```jsx
<div className="animate-slide-up">
  Contenu qui glisse vers le haut
</div>
```

### Animations Personnalisées
```jsx
// Rotation
<div className="transition-transform duration-300 hover:rotate-6">
  Rotation au survol
</div>

// Scale (agrandissement)
<div className="transition-transform duration-300 hover:scale-110">
  Agrandissement au survol
</div>

// Translation
<div className="transition-transform duration-300 hover:-translate-y-2">
  Soulèvement au survol
</div>

// Combinaison
<div className="transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
  Effet combiné
</div>
```

---

## 9. Variables CSS

### Utilisation des Couleurs
```jsx
// Dans className
<div className="bg-[var(--color-surface)] text-[var(--color-foreground)]">
  Contenu
</div>

// Dans style
<div style={{ 
  backgroundColor: 'var(--color-surface)', 
  color: 'var(--color-foreground)' 
}}>
  Contenu
</div>
```

### Liste des Variables Disponibles

#### Couleurs
```css
--color-background      /* #FFFFFF - Fond principal */
--color-surface         /* #F8FAFB - Cartes, inputs */
--color-surface-hover   /* #EFF3F6 - États hover */
--color-foreground      /* #0A192F - Texte principal */
--color-muted           /* #64748B - Texte secondaire */

--color-accent          /* #0D99FF - Bleu principal */
--color-accent-hover    /* #0B7FDB - Bleu hover */
--color-accent-matrix   /* #00FF41 - Vert Matrix */
--color-accent-secondary /* #10B981 - Vert succès */

--color-gold            /* #D4AF37 - Or métallique */
--color-gold-light      /* #FFD700 - Or clair */
--color-gold-dark       /* #B8860B - Or foncé */

--color-border          /* rgba(10,25,47,0.12) - Bordure normale */
--color-border-hover    /* rgba(13,153,255,0.3) - Bordure hover */
```

#### Ombres
```css
--shadow-sm             /* 0 1px 3px rgba(0,0,0,0.08) */
--shadow-card           /* 0 2px 8px rgba(0,0,0,0.1) */
--shadow-elevation      /* 0 4px 16px rgba(0,0,0,0.15) */
--shadow-hover          /* 0 8px 24px rgba(13,153,255,0.2) */
--shadow-gold           /* 0 4px 16px rgba(212,175,55,0.25) */
```

#### Rayons
```css
--radius-sm             /* 4px */
--radius-md             /* 8px */
--radius-lg             /* 12px */
--radius-xl             /* 16px */
```

---

## 10. Classes Utilitaires

### Typographie
```jsx
// Titres
<h1 className="text-hero">Titre Hero</h1>
<h2 className="text-h2">Titre H2</h2>
<h3 className="text-h3">Titre H3</h3>

// Corps de texte
<p className="text-body">Texte normal</p>
<p className="text-body-lg">Texte large</p>
<p className="text-body-sm">Texte petit</p>

// UI
<span className="text-ui">Texte UI</span>
<span className="text-ui-sm">Texte UI petit</span>

// Eyebrow (surtitre)
<span className="eyebrow">Surtitre</span>
```

### Conteneurs
```jsx
// Container responsive
<div className="container">
  Contenu centré avec padding fluide
</div>

// Container de page
<div className="container-page">
  Contenu de page avec max-width
</div>
```

### Sections
```jsx
// Section normale
<section className="section">
  Contenu avec padding vertical
</section>

// Section pleine hauteur
<section className="section-full">
  Contenu centré verticalement
</section>

// Section compacte
<section className="section-compact">
  Contenu avec moins de padding
</section>

// Section auto
<section className="section-auto">
  Contenu sans min-height
</section>
```

### Centrage
```jsx
// Centrage flex
<div className="center-flex">
  Contenu centré (flex)
</div>

// Centrage grid
<div className="center-grid">
  Contenu centré (grid)
</div>
```

---

## 11. Responsive Design

### Breakpoints Tailwind
```jsx
// Mobile first
<div className="text-base md:text-lg lg:text-xl">
  Texte responsive
</div>

// Grille responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Colonne 1</div>
  <div>Colonne 2</div>
  <div>Colonne 3</div>
</div>

// Visibilité responsive
<div className="hidden lg:block">
  Visible uniquement sur desktop
</div>

<div className="block lg:hidden">
  Visible uniquement sur mobile
</div>
```

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 12. Accessibilité

### Respect de prefers-reduced-motion
```jsx
// Avec Tailwind
<div className="transition-transform hover:scale-105 motion-reduce:hover:scale-100">
  Animation désactivée si prefers-reduced-motion
</div>

// Avec CSS
<div className="hover-effect">
  Animation désactivée automatiquement
</div>
```

### Focus Visible
```jsx
// Focus ring bleu
<button className="focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]">
  Bouton avec focus visible
</button>

// Focus ring doré
<button className="focus:outline-none focus:ring-2 focus:ring-[var(--color-ring-gold)]">
  Bouton avec focus doré
</button>
```

### ARIA Labels
```jsx
// Bouton avec icône
<button aria-label="Fermer">
  <X className="h-5 w-5" />
</button>

// Navigation
<nav aria-label="Navigation principale">
  {/* Liens */}
</nav>

// Section
<section aria-labelledby="services-title">
  <h2 id="services-title">Nos services</h2>
</section>
```

---

## 📝 Exemples Complets

### Page Hero avec Matrix Rain
```jsx
<section className="relative min-h-[90vh] overflow-hidden bg-[var(--color-background)]">
  {/* Matrix Rain Background */}
  <div className="absolute inset-0 z-0">
    <MatrixRain />
  </div>
  
  {/* Content */}
  <div className="container-page relative z-10 flex min-h-[90vh] items-center">
    <div className="space-y-8">
      <span className="badge">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-matrix)] opacity-60 animate-ping"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-matrix)]"></span>
        </span>
        <span>Disponible pour de nouveaux projets</span>
      </span>
      
      <h1 className="text-hero font-bold">
        Créons ensemble votre{" "}
        <span className="text-[var(--color-accent-matrix)]">
          présence digitale
        </span>{" "}
        de demain
      </h1>
      
      <p className="text-body-lg text-[var(--color-muted)] max-w-xl">
        Développeur web passionné, je conçois des sites et applications sur mesure.
      </p>
      
      <div className="flex flex-wrap items-center gap-4">
        <Link href="/devis" className="btn-primary">
          Demander un devis
        </Link>
        <Link href="/portfolio" className="btn-secondary">
          Voir mes projets
        </Link>
      </div>
    </div>
  </div>
</section>
```

### Grille de Cartes
```jsx
<section className="section">
  <div className="container-page">
    <h2 className="text-h2 text-center mb-12">Nos services</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <GlassmorphismCard>
        <h3 className="text-h3 mb-4">Service 1</h3>
        <p className="text-body text-[var(--color-muted)] mb-6">
          Description du service
        </p>
        <Link href="/services/1" className="btn-primary">
          En savoir plus
        </Link>
      </GlassmorphismCard>
      
      <GlassmorphismCard variant="accent">
        <h3 className="text-h3 mb-4">Service 2</h3>
        <p className="text-body text-[var(--color-muted)] mb-6">
          Description du service
        </p>
        <Link href="/services/2" className="btn-primary">
          En savoir plus
        </Link>
      </GlassmorphismCard>
      
      <GlassmorphismCard variant="gold">
        <span className="badge mb-4">Premium</span>
        <h3 className="text-h3 mb-4">Service 3</h3>
        <p className="text-body text-[var(--color-muted)] mb-6">
          Description du service premium
        </p>
        <Link href="/services/3" className="btn-primary">
          En savoir plus
        </Link>
      </GlassmorphismCard>
    </div>
  </div>
</section>
```

---

## 🎉 Conclusion

Vous avez maintenant tous les outils pour créer une interface moderne, accessible et performante !

**N'oubliez pas** :
- ✅ Utilisez les variables CSS pour la cohérence
- ✅ Respectez l'accessibilité (ARIA, focus, motion-reduce)
- ✅ Testez sur mobile et desktop
- ✅ Optimisez les performances (animations GPU)
- ✅ Maintenez la cohérence du design system

**Bon développement ! 🚀**