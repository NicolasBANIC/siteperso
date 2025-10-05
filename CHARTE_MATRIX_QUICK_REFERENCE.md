# 🎨 Charte Matrix - Référence Rapide

## 🎯 Palette

```css
--color-anthracite: #1A1A1A;  /* Fond Header/Footer */
--color-white: #FFFFFF;        /* Texte sur anthracite */
--color-matrix: #0B8A3A;       /* Hover/Focus/CTA */
--color-matrix-2: #0E5F3B;     /* Gradients */
```

## 🔘 Boutons

```jsx
import Button from '@/components/Button';

// Primary (défaut)
<Button variant="primary">Action</Button>

// Secondary
<Button variant="secondary">Action</Button>

// Outline
<Button variant="outline">Action</Button>

// Avec lien
<Button href="/contact">Contact</Button>

// Tailles
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## 📝 Formulaires

```jsx
import { Input, Select } from '@/components/Input';

// Input texte
<Input
  type="text"
  label="Nom"
  required
/>

// Input email avec erreur
<Input
  type="email"
  label="Email"
  error="Email invalide"
/>

// Textarea
<Input
  type="textarea"
  label="Message"
/>

// Select
<Select label="Service" required>
  <option value="">Sélectionnez...</option>
  <option value="1">Option 1</option>
</Select>
```

## 🎨 Classes Tailwind

### Couleurs
```jsx
bg-anthracite text-white
bg-matrix text-matrix
bg-gradient-to-br from-matrix2 to-matrix
```

### Ombres
```jsx
shadow-elev-sm          // Élévation petite
shadow-elev-md          // Élévation moyenne
shadow-ring-matrix      // Glow Matrix
```

### Focus
```jsx
focus:outline-none 
focus-visible:ring-2 
focus-visible:ring-[rgba(11,138,58,0.35)]
```

### Hover Complet
```jsx
className="
  bg-anthracite text-white rounded-xl px-6 py-3
  shadow-elev-sm
  transition-all duration-fast
  hover:shadow-elev-md 
  hover:shadow-ring-matrix 
  hover:-translate-y-1
  motion-reduce:hover:translate-y-0
"
```

## 🎭 Lazy Loading

```jsx
import { useRef } from 'react';
import { useIsReady } from '@/lib/useIsReady';

const ref = useRef(null);
const isReady = useIsReady(ref);

<div 
  ref={ref}
  className={isReady ? 'with-effects' : ''}
>
  Contenu
</div>
```

## ♿ Accessibilité

### Contrastes
- Anthracite/Blanc : **15.3:1** (AAA)
- Matrix/Blanc : **4.8:1** (AA+)

### Focus
Toujours visible avec anneau vert Matrix

### Reduced Motion
```jsx
import { useReducedMotion } from '@/lib/useReducedMotion';

const prefersReducedMotion = useReducedMotion();
const animation = prefersReducedMotion ? {} : { y: -2 };
```

## 🚀 Démarrage

```bash
# Lancer le serveur
npm run dev

# Voir la démo
http://localhost:3000/charte-demo
```

## 📚 Documentation

- **`CHARTE_MATRIX_IMPLEMENTATION.md`** : Doc technique
- **`GUIDE_DEMARRAGE_CHARTE_MATRIX.md`** : Guide complet
- **`README_CHARTE_MATRIX.md`** : Vue d'ensemble

---

**Charte Matrix - Anthracite, Blanc, Vert Matrix**  
*BANDEV © 2025*