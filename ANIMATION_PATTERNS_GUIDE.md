# 🎬 Guide des Patterns d'Animation - Framer Motion

**Référence rapide pour animations cohérentes et accessibles**

---

## 🎯 Principe de Base

**Toujours utiliser `useReducedMotion` pour respecter les préférences utilisateur.**

```javascript
import { useReducedMotion } from '@/lib/useReducedMotion';

const prefersReducedMotion = useReducedMotion();
```

---

## 📦 Pattern 1 : Apparition au Scroll (Fade + Slide)

**Usage :** Sections, cartes, contenus qui apparaissent au scroll

```javascript
const animationProps = prefersReducedMotion ? {
  initial: { opacity: 1 },
  whileInView: { opacity: 1 }
} : {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

<motion.div
  viewport={{ once: true }}
  {...animationProps}
>
  {children}
</motion.div>
```

**Exemples :** Card, Section, ServiceCard

---

## 🎯 Pattern 2 : Hover Scale (Boutons, Cartes)

**Usage :** Boutons, cartes interactives, badges

```javascript
const hoverProps = prefersReducedMotion ? {} : {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 300, damping: 20 }
};

<motion.button
  {...hoverProps}
>
  {children}
</motion.button>
```

**Exemples :** Button, CTAButton, TechBadge

---

## 🔄 Pattern 3 : Hover Elevation (Cartes)

**Usage :** Cartes de services, projets, tarifs

```javascript
const hoverProps = prefersReducedMotion ? {} : {
  whileHover: { y: -8 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

<motion.div
  className="transition-shadow hover:shadow-xl"
  {...hoverProps}
>
  {children}
</motion.div>
```

**Exemples :** ServiceCard, ProjectCard, Card (variant service)

---

## 💫 Pattern 4 : Spring Animation (Badges, Modals)

**Usage :** Éléments qui "pop" à l'écran

```javascript
const springProps = prefersReducedMotion ? {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
} : {
  initial: { scale: 0, rotate: -45 },
  animate: { scale: 1, rotate: -45 },
  transition: { type: 'spring', stiffness: 200, damping: 15 }
};

<motion.div {...springProps}>
  {children}
</motion.div>
```

**Exemples :** PopularBadge, Notifications

---

## 🚪 Pattern 5 : AnimatePresence (Enter/Exit)

**Usage :** Éléments conditionnels (modals, tooltips, menus)

```javascript
const enterExitProps = prefersReducedMotion ? {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
} : {
  initial: { opacity: 0, y: 20, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.8 },
  transition: { type: 'spring', stiffness: 300, damping: 25 }
};

<AnimatePresence>
  {isVisible && (
    <motion.div {...enterExitProps}>
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

**Exemples :** BackToTop, Modal, Tooltip, Menu mobile

---

## 🎠 Pattern 6 : Carousel/Slider

**Usage :** Témoignages, galeries d'images

```javascript
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

<AnimatePresence initial={false} custom={direction} mode="wait">
  <motion.div
    key={currentIndex}
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  >
    {currentSlide}
  </motion.div>
</AnimatePresence>
```

**Exemples :** TestimonialCarousel

---

## 📊 Pattern 7 : Stagger Animation (Listes)

**Usage :** Listes d'éléments qui apparaissent séquentiellement

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, index) => (
    <motion.div key={index} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

**Exemples :** PortfolioGrid, Menu mobile

---

## 🌊 Pattern 8 : Parallax Scroll

**Usage :** Hero sections, backgrounds

```javascript
import { useScroll, useTransform } from 'framer-motion';

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, -150]);

// Désactiver sur mobile et reduced motion
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const shouldParallax = !prefersReducedMotion && !isMobile;

<motion.div
  style={shouldParallax ? { y } : {}}
>
  {children}
</motion.div>
```

**Exemples :** HeroSection

---

## 🔢 Pattern 9 : Animated Counter

**Usage :** Statistiques, compteurs

```javascript
const [count, setCount] = useState(0);

useEffect(() => {
  if (!inView) return;
  
  if (prefersReducedMotion) {
    setCount(end);
    return;
  }

  // Animation avec requestAnimationFrame
  let startTime;
  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percentage = Math.min(progress / duration, 1);
    const easeOutExpo = 1 - Math.pow(2, -10 * percentage);
    setCount(Math.floor(end * easeOutExpo));
    
    if (percentage < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
}, [inView, prefersReducedMotion]);
```

**Exemples :** AnimatedCounter, StatItem

---

## 🎨 Pattern 10 : Gradient Animation

**Usage :** Backgrounds, boutons premium

```javascript
// CSS dans Tailwind
className="bg-gradient-to-r from-accent to-accentSecondary"

// Animation de position (optionnel)
const gradientAnimation = prefersReducedMotion ? {} : {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: 'linear'
  }
};

<motion.div
  className="bg-gradient-to-r from-accent via-accentSecondary to-accent bg-[length:200%_100%]"
  {...gradientAnimation}
>
  {children}
</motion.div>
```

**Exemples :** Button, CTAButton, Hero backgrounds

---

## 🎭 Pattern 11 : Hover Overlay (Images)

**Usage :** Cartes de projets, galeries

```javascript
<div className="group relative overflow-hidden">
  <Image src={image} alt={alt} />
  
  <motion.div
    className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
    initial={false}
    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
  >
    <div className="absolute bottom-0 left-0 right-0 p-6">
      {content}
    </div>
  </motion.div>
</div>
```

**Exemples :** ProjectCard, PortfolioGrid

---

## 🔄 Pattern 12 : Loading Spinner

**Usage :** Preloader, états de chargement

```javascript
const spinnerVariants = prefersReducedMotion ? {
  animate: { opacity: [0.5, 1, 0.5] }
} : {
  animate: { rotate: 360 },
  transition: { duration: 1, repeat: Infinity, ease: 'linear' }
};

<motion.div
  variants={spinnerVariants}
  animate="animate"
>
  <Loader className="h-8 w-8" />
</motion.div>
```

**Exemples :** Preloader, LoadingSpinner

---

## 📱 Pattern 13 : Mobile Menu Drawer

**Usage :** Menu mobile, sidebars

```javascript
const drawerVariants = prefersReducedMotion ? {
  closed: { opacity: 0 },
  open: { opacity: 1 }
} : {
  closed: { x: '100%', opacity: 0 },
  open: { x: 0, opacity: 1 },
  transition: { type: 'spring', stiffness: 300, damping: 30 }
};

<AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <motion.div
        variants={drawerVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className="fixed right-0 top-0 bottom-0 w-80 bg-surface z-50"
      >
        {children}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

**Exemples :** Header (menu mobile)

---

## 🎯 Pattern 14 : Focus Animation

**Usage :** Inputs, formulaires

```javascript
const [isFocused, setIsFocused] = useState(false);

const focusProps = prefersReducedMotion ? {} : {
  animate: isFocused ? { scale: 1.02 } : { scale: 1 },
  transition: { duration: 0.2 }
};

<motion.input
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
  className="border-2 transition-colors focus:border-accent"
  {...focusProps}
/>
```

**Exemples :** FormulaireContact, FormulaireDevis

---

## ⚡ Pattern 15 : Pulse Animation (Badges)

**Usage :** Badges "Disponible", notifications

```javascript
// CSS Tailwind avec animation native
<div className="relative">
  <span className="absolute inline-flex h-full w-full rounded-full bg-accentSecondary opacity-60 motion-safe:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
  <span className="relative inline-flex h-3 w-3 rounded-full bg-accentSecondary" />
</div>
```

**Exemples :** HeroSection (badge "Disponible")

---

## 🎨 Classes CSS Utilitaires

### Motion Reduce (Accessibilité)
```css
/* Désactiver transitions */
motion-reduce:transition-none

/* Désactiver transformations */
motion-reduce:transform-none
motion-reduce:hover:scale-100

/* Désactiver animations */
motion-reduce:animate-none
```

### Transitions Standards
```css
/* Durées */
transition-all duration-200  /* Rapide (hover) */
transition-all duration-300  /* Moyen (cartes) */
transition-all duration-500  /* Lent (sections) */

/* Easing */
ease-in-out  /* Standard */
ease-out     /* Apparition */
ease-in      /* Disparition */
```

---

## 📋 Checklist Animation

Pour chaque animation, vérifier :

- [ ] `useReducedMotion` intégré
- [ ] Props conditionnelles selon `prefersReducedMotion`
- [ ] Classes `motion-reduce:*` pour fallback CSS
- [ ] Durée appropriée (200-600ms)
- [ ] Easing cohérent avec le type d'animation
- [ ] Performance (éviter animations sur `width`, `height`)
- [ ] Accessibilité (focus-visible, ARIA)

---

## 🚫 Anti-Patterns à Éviter

### ❌ Animations Toujours Actives
```javascript
// MAUVAIS
<motion.div whileHover={{ scale: 1.1 }}>
```

### ✅ Animations Conditionnelles
```javascript
// BON
const hoverProps = prefersReducedMotion ? {} : { whileHover: { scale: 1.1 } };
<motion.div {...hoverProps}>
```

---

### ❌ Animations sur Width/Height
```javascript
// MAUVAIS (performance)
animate={{ width: '100%', height: '200px' }}
```

### ✅ Animations sur Transform/Opacity
```javascript
// BON (performant)
animate={{ scale: 1, opacity: 1 }}
```

---

### ❌ Durées Trop Longues
```javascript
// MAUVAIS (frustrant)
transition={{ duration: 2 }}
```

### ✅ Durées Appropriées
```javascript
// BON
transition={{ duration: 0.3 }}
```

---

## 📚 Ressources

### Documentation Officielle
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Animations](https://tailwindcss.com/docs/animation)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

### Exemples dans le Projet
- `src/components/Button.jsx` - Hover scale
- `src/components/Card.jsx` - Apparition au scroll
- `src/components/BackToTop.jsx` - AnimatePresence
- `src/components/TestimonialCarousel.jsx` - Carousel
- `src/components/HeroSection.tsx` - Parallax

---

**Dernière mise à jour :** $(date)  
**Version :** 1.0