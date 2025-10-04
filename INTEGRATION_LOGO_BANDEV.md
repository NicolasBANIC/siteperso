# 🎨 Intégration Logo BANDEV - Snippets et Documentation

## 📦 Fichiers SVG Disponibles

### 1. **logo-bandev-optimized.svg** (Recommandé pour inline)
```svg
<svg viewBox="0 0 240 64" xmlns="http://www.w3.org/2000/svg" role="img" shape-rendering="geometricPrecision">
  <title>BANDEV</title>
  <desc>"BAN" encadré or, "DEV" souligné vert</desc>
  <g id="BAN">
    <rect fill="none" stroke="#D4AF37" stroke-width="3" x="2" y="8" width="92" height="48" rx="4"/>
    <path fill="#D4AF37" d="M16 44V20h12c3.3 0 5.9.8 7.8 2.4 1.9 1.6 2.8 3.8 2.8 6.6 0 1.8-.4 3.3-1.2 4.6-.8 1.3-2 2.2-3.4 2.8 1.7.5 3 1.4 3.9 2.8.9 1.4 1.3 3 1.3 4.8 0 3-1 5.3-2.9 7-1.9 1.7-4.6 2.5-8 2.5H16zm6.5-14.2h4.8c1.5 0 2.6-.3 3.4-1 .8-.7 1.2-1.6 1.2-2.8 0-1.2-.4-2.1-1.2-2.8-.8-.7-1.9-1-3.4-1h-4.8v7.6zm0 9.7h5.3c1.6 0 2.8-.4 3.7-1.1.9-.7 1.3-1.7 1.3-3 0-1.3-.4-2.3-1.3-3-.9-.7-2.1-1.1-3.7-1.1h-5.3v8.2zM48 44l9.5-24h6.8l9.5 24h-6.8l-1.5-4.2h-9.2L54.8 44H48zm9.8-9h5.4l-2.7-7.8-2.7 7.8zM78 44V20h7.2l10.8 14.2V20h6.2v24h-7.2L84.2 29.8V44H78z"/>
  </g>
  <g id="DEV">
    <path fill="#FFF" d="M110 44V20h11.5c3.8 0 6.8 1.1 9 3.2 2.2 2.1 3.3 5 3.3 8.8 0 3.8-1.1 6.7-3.3 8.8-2.2 2.1-5.2 3.2-9 3.2H110zm6.5-4.5h4.5c2.2 0 3.9-.6 5.1-1.9 1.2-1.3 1.8-3.1 1.8-5.6 0-2.5-.6-4.3-1.8-5.6-1.2-1.3-2.9-1.9-5.1-1.9h-4.5v15zM142 44V20h18v4.5h-11.5v5.2h10.8v4.5h-10.8v5.3H160V44h-18zm30 0L162.5 20h7.2l6.8 17.2L183.3 20h7.2L181 44h-9z"/>
    <line x1="110" y1="54" x2="190" y2="54" stroke="#00FF45" stroke-width="4" stroke-linecap="round"/>
  </g>
</svg>
```

### 2. **logo-bandev-mono.svg** (Variante monochrome)
Utilise `currentColor` pour s'adapter à la couleur du texte parent.

### 3. **logo-bandev-inverse.svg** (Variante inversée)
"DEV" en noir (#0B0B0B) pour fond clair.

---

## 🔧 Intégration HTML/CSS

### **Snippet HTML (Header)**

```html
<header class="site-header" role="banner">
  <a class="brand" href="/" aria-label="Accueil BANDEV">
    <svg viewBox="0 0 240 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logo BANDEV">
      <title>BANDEV</title>
      <desc>"BAN" encadré or, "DEV" souligné vert</desc>
      <g id="BAN">
        <rect fill="none" stroke="#D4AF37" stroke-width="3" x="2" y="8" width="92" height="48" rx="4"/>
        <path fill="#D4AF37" d="M16 44V20h12c3.3 0 5.9.8 7.8 2.4 1.9 1.6 2.8 3.8 2.8 6.6 0 1.8-.4 3.3-1.2 4.6-.8 1.3-2 2.2-3.4 2.8 1.7.5 3 1.4 3.9 2.8.9 1.4 1.3 3 1.3 4.8 0 3-1 5.3-2.9 7-1.9 1.7-4.6 2.5-8 2.5H16zm6.5-14.2h4.8c1.5 0 2.6-.3 3.4-1 .8-.7 1.2-1.6 1.2-2.8 0-1.2-.4-2.1-1.2-2.8-.8-.7-1.9-1-3.4-1h-4.8v7.6zm0 9.7h5.3c1.6 0 2.8-.4 3.7-1.1.9-.7 1.3-1.7 1.3-3 0-1.3-.4-2.3-1.3-3-.9-.7-2.1-1.1-3.7-1.1h-5.3v8.2zM48 44l9.5-24h6.8l9.5 24h-6.8l-1.5-4.2h-9.2L54.8 44H48zm9.8-9h5.4l-2.7-7.8-2.7 7.8zM78 44V20h7.2l10.8 14.2V20h6.2v24h-7.2L84.2 29.8V44H78z"/>
      </g>
      <g id="DEV">
        <path fill="#FFF" d="M110 44V20h11.5c3.8 0 6.8 1.1 9 3.2 2.2 2.1 3.3 5 3.3 8.8 0 3.8-1.1 6.7-3.3 8.8-2.2 2.1-5.2 3.2-9 3.2H110zm6.5-4.5h4.5c2.2 0 3.9-.6 5.1-1.9 1.2-1.3 1.8-3.1 1.8-5.6 0-2.5-.6-4.3-1.8-5.6-1.2-1.3-2.9-1.9-5.1-1.9h-4.5v15zM142 44V20h18v4.5h-11.5v5.2h10.8v4.5h-10.8v5.3H160V44h-18zm30 0L162.5 20h7.2l6.8 17.2L183.3 20h7.2L181 44h-9z"/>
        <line x1="110" y1="54" x2="190" y2="54" stroke="#00FF45" stroke-width="4" stroke-linecap="round"/>
      </g>
    </svg>
  </a>
  <nav aria-label="Navigation principale">
    <!-- Liens de navigation -->
  </nav>
</header>
```

### **Snippet CSS**

```css
/* Header principal */
.site-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  position: sticky;
  top: 0;
  inset-inline-start: 0;
  background: var(--bg, #0b0b0b);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 50;
}

/* Logo BANDEV */
.brand {
  display: inline-block;
  line-height: 0;
  transition: opacity 0.2s ease;
}

.brand:hover {
  opacity: 0.8;
}

.brand svg {
  height: 24px;
  width: auto;
  display: block;
}

/* Responsive : agrandir sur desktop */
@media (min-width: 768px) {
  .brand svg {
    height: 28px;
  }
}

/* Support RTL (right-to-left) */
[dir="rtl"] .site-header {
  inset-inline-start: auto;
  inset-inline-end: 0;
}
```

---

## ⚛️ Intégration React/Next.js

### **Composant Logo (logo-bandev.jsx)**

```jsx
export default function LogoBandev({ className = "h-6 md:h-7" }) {
  return (
    <svg 
      viewBox="0 0 240 64" 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      className={className}
      aria-label="Logo BANDEV"
    >
      <title>BANDEV</title>
      <desc>"BAN" encadré or, "DEV" souligné vert</desc>
      <g id="BAN">
        <rect fill="none" stroke="#D4AF37" strokeWidth="3" x="2" y="8" width="92" height="48" rx="4"/>
        <path fill="#D4AF37" d="M16 44V20h12c3.3 0 5.9.8 7.8 2.4 1.9 1.6 2.8 3.8 2.8 6.6 0 1.8-.4 3.3-1.2 4.6-.8 1.3-2 2.2-3.4 2.8 1.7.5 3 1.4 3.9 2.8.9 1.4 1.3 3 1.3 4.8 0 3-1 5.3-2.9 7-1.9 1.7-4.6 2.5-8 2.5H16zm6.5-14.2h4.8c1.5 0 2.6-.3 3.4-1 .8-.7 1.2-1.6 1.2-2.8 0-1.2-.4-2.1-1.2-2.8-.8-.7-1.9-1-3.4-1h-4.8v7.6zm0 9.7h5.3c1.6 0 2.8-.4 3.7-1.1.9-.7 1.3-1.7 1.3-3 0-1.3-.4-2.3-1.3-3-.9-.7-2.1-1.1-3.7-1.1h-5.3v8.2zM48 44l9.5-24h6.8l9.5 24h-6.8l-1.5-4.2h-9.2L54.8 44H48zm9.8-9h5.4l-2.7-7.8-2.7 7.8zM78 44V20h7.2l10.8 14.2V20h6.2v24h-7.2L84.2 29.8V44H78z"/>
      </g>
      <g id="DEV">
        <path fill="#FFF" d="M110 44V20h11.5c3.8 0 6.8 1.1 9 3.2 2.2 2.1 3.3 5 3.3 8.8 0 3.8-1.1 6.7-3.3 8.8-2.2 2.1-5.2 3.2-9 3.2H110zm6.5-4.5h4.5c2.2 0 3.9-.6 5.1-1.9 1.2-1.3 1.8-3.1 1.8-5.6 0-2.5-.6-4.3-1.8-5.6-1.2-1.3-2.9-1.9-5.1-1.9h-4.5v15zM142 44V20h18v4.5h-11.5v5.2h10.8v4.5h-10.8v5.3H160V44h-18zm30 0L162.5 20h7.2l6.8 17.2L183.3 20h7.2L181 44h-9z"/>
        <line x1="110" y1="54" x2="190" y2="54" stroke="#00FF45" strokeWidth="4" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
```

### **Utilisation dans Header.jsx**

```jsx
import Link from "next/link";
import LogoBandev from "@/components/LogoBandev";

export default function Header() {
  return (
    <header role="banner" className="site-header">
      <Link href="/" className="brand" aria-label="Accueil BANDEV">
        <LogoBandev />
      </Link>
      <nav aria-label="Navigation principale">
        {/* Navigation */}
      </nav>
    </header>
  );
}
```

---

## 🎨 Variantes d'Utilisation

### **1. Logo Monochrome (s'adapte à la couleur du texte)**

```html
<a href="/" class="brand text-blue-600">
  <!-- Le logo sera bleu (#2563eb) -->
  <svg viewBox="0 0 240 64" xmlns="http://www.w3.org/2000/svg">
    <!-- Utiliser logo-bandev-mono.svg -->
  </svg>
</a>
```

### **2. Logo Inversé (pour fond clair)**

```html
<header class="bg-white">
  <a href="/" class="brand">
    <!-- Utiliser logo-bandev-inverse.svg -->
    <!-- "DEV" sera en noir au lieu de blanc -->
  </a>
</header>
```

### **3. Logo avec Animation Hover**

```css
.brand svg {
  transition: transform 0.3s ease;
}

.brand:hover svg {
  transform: scale(1.05);
}

/* Ou rotation */
.brand:hover svg {
  transform: rotate(5deg);
}
```

---

## 📐 Tailles Recommandées

| Contexte | Hauteur | Largeur (auto) | Classes Tailwind |
|----------|---------|----------------|------------------|
| **Header Mobile** | 24px | ~90px | `h-6 w-auto` |
| **Header Desktop** | 28px | ~105px | `md:h-7 w-auto` |
| **Footer** | 32px | ~120px | `h-8 w-auto` |
| **Hero Section** | 48px | ~180px | `h-12 w-auto` |
| **Favicon** | 64px | ~240px | `h-16 w-auto` |

---

## ♿ Accessibilité

### **Checklist**
- ✅ `role="img"` sur le SVG
- ✅ `<title>` pour le nom du logo
- ✅ `<desc>` pour description détaillée
- ✅ `aria-label` sur le lien parent
- ✅ Contrastes respectés (Or #D4AF37 sur fond sombre : ratio 4.5:1)
- ✅ Focus visible sur le lien (outline ring)

### **Test Lecteur d'Écran**
Le lecteur annoncera : **"Accueil BANDEV, lien, Logo BANDEV, BAN encadré or, DEV souligné vert"**

---

## 🚀 Performance

### **Avantages du SVG Inline**
- ✅ **0 requête HTTP** supplémentaire
- ✅ **~2 KB** (minifié et gzippé)
- ✅ **Vectoriel** : net sur tous les écrans (Retina, 4K)
- ✅ **Cacheable** : dans le bundle HTML/JS
- ✅ **Manipulable** : CSS/JS peuvent modifier les couleurs

### **Comparaison PNG vs SVG**
| Métrique | PNG (40x40) | SVG Inline |
|----------|-------------|------------|
| Poids | ~5 KB | ~2 KB |
| Requêtes HTTP | +1 | 0 |
| Qualité Retina | Floue | Parfaite |
| Couleurs modifiables | ❌ | ✅ |

---

## 🎯 Cas d'Usage Avancés

### **1. Logo Animé au Chargement**

```css
@keyframes logoFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.brand svg {
  animation: logoFadeIn 0.6s ease-out;
}
```

### **2. Logo avec Effet Glow**

```css
.brand svg #underline {
  filter: drop-shadow(0 0 8px #00FF45);
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 8px #00FF45); }
  50% { filter: drop-shadow(0 0 16px #00FF45); }
}
```

### **3. Logo Responsive avec Texte**

```html
<a href="/" class="brand-with-text">
  <svg><!-- Logo SVG --></svg>
  <span class="brand-text">Développeur Web Freelance</span>
</a>
```

```css
.brand-with-text {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-text {
  font-size: 14px;
  color: #94a3b8;
}

@media (max-width: 640px) {
  .brand-text {
    display: none;
  }
}
```

---

## 📝 Notes Importantes

1. **Toujours utiliser `viewBox`** au lieu de `width`/`height` pour le responsive
2. **Préférer SVG inline** pour le header (0 requête HTTP)
3. **Utiliser les fichiers séparés** pour les images répétées (footer, etc.)
4. **Tester sur fond clair ET sombre** pour vérifier les contrastes
5. **Minifier le SVG** avant production (déjà fait dans les fichiers fournis)

---

**Fichiers disponibles** :
- `/public/images/logos/logo-bandev.svg`
- `/public/images/logos/logo-bandev-optimized.svg`
- `/public/images/logos/logo-bandev-mono.svg`
- `/public/images/logos/logo-bandev-inverse.svg`

**Documentation complète** : `CHANGELOG_CORRECTIONS_LOGO.md`