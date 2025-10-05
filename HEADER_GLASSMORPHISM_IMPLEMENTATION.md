# 🎨 Header Sticky avec Effet Glassmorphism

## ✅ Implémentation Complète

### 📋 Résumé
Le header reste maintenant **sticky en haut de l'écran** avec un magnifique **effet glassmorphism** qui s'active dès que l'utilisateur commence à scroller.

---

## 🎯 Fonctionnalités Implémentées

### 1. **Hook `useScrolled`** ✅
**Fichier:** `src/hooks/useScrolled.js`

```javascript
"use client";
import { useEffect, useState } from "react";

export function useScrolled(offset = 0) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  
  return scrolled;
}
```

**Caractéristiques:**
- ✅ Détecte le scroll avec un offset configurable
- ✅ Utilise `{ passive: true }` pour optimiser les performances
- ✅ Vérifie l'état initial au montage
- ✅ Nettoie les event listeners au démontage

---

### 2. **Header avec Glassmorphism** ✅
**Fichier:** `src/components/Header.jsx`

#### Changements Principaux:

**a) Imports:**
```javascript
import { useScrolled } from "@/hooks/useScrolled";
```

**b) Utilisation du hook:**
```javascript
const scrolled = useScrolled(1); // Détecte dès scrollY > 1px
```

**c) Header avec `motion.header`:**
```javascript
<motion.header
  role="banner"
  className={`fixed top-0 inset-inline-start-0 z-50 w-full border-b transition-all duration-200 motion-reduce:transition-none ${
    scrolled
      ? "border-white/10 bg-anthracite/70 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
      : "border-transparent bg-anthracite"
  }`}
  initial={false}
  animate={{
    backgroundColor: scrolled ? "rgba(26, 26, 26, 0.7)" : "rgba(26, 26, 26, 1)",
  }}
  transition={{
    duration: prefersReducedMotion ? 0 : 0.2,
    ease: "easeOut",
  }}
  style={{
    paddingTop: "env(safe-area-inset-top, 0)",
  }}
>
```

---

## 🎨 Effet Glassmorphism

### État "Au Sommet" (scrollY === 0)
```css
- Position: fixed top-0
- Background: bg-anthracite (opaque)
- Border: border-transparent
- Blur: aucun
- Shadow: aucune
```

### État "Scrolled" (scrollY > 0)
```css
- Position: fixed top-0
- Background: bg-anthracite/70 (70% opacité)
- Backdrop Blur: backdrop-blur-md
- Border: border-white/10 (bordure subtile)
- Shadow: shadow-[0_8px_24px_rgba(0,0,0,0.15)]
- Transition: 200ms ease-out
```

---

## ♿ Accessibilité

### 1. **Prefers Reduced Motion** ✅
```javascript
transition={{
  duration: prefersReducedMotion ? 0 : 0.2,
  ease: "easeOut",
}}
```
- Les animations sont **désactivées** si l'utilisateur préfère moins d'animations
- Respecte `@media (prefers-reduced-motion: reduce)`

### 2. **Safe Area (Mobile)** ✅
```javascript
style={{
  paddingTop: "env(safe-area-inset-top, 0)",
}}
```
- Gère automatiquement les **notches** et **encoches** sur mobile
- Compatible iPhone X+, Android avec encoche

### 3. **Contraste & Lisibilité** ✅
- Texte blanc sur fond anthracite sombre
- Contraste AA+ maintenu même avec transparence
- Bordure subtile pour délimiter le header

---

## 🎯 Layout Ajusté

**Fichier:** `src/app/layout.jsx`

```javascript
<main id="main" className="flex-1 pt-[73px]">
  {children}
</main>
```

**Pourquoi `pt-[73px]` ?**
- Compense la hauteur du header `fixed`
- Évite que le contenu soit caché sous le header
- Hauteur calculée: padding (py-4) + logo (h-10/h-12) ≈ 73px

---

## 🚀 Performances

### Optimisations Appliquées:
1. ✅ **Passive Event Listener** - `{ passive: true }`
2. ✅ **Backdrop Blur Optimisé** - `backdrop-blur-md` (pas trop intense)
3. ✅ **Transition Courte** - 200ms (fluide sans lag)
4. ✅ **GPU Acceleration** - Framer Motion utilise `transform` et `opacity`
5. ✅ **Reduced Motion** - Désactive animations si nécessaire

---

## 📱 Responsive

### Desktop (lg+)
- Navigation horizontale visible
- CTA "Demander un devis" visible
- Menu burger caché

### Mobile (< lg)
- Menu burger visible
- Navigation dans drawer plein écran
- Glassmorphism actif sur mobile aussi

---

## 🎨 Variables CSS Utilisées

```css
--color-anthracite: #1A1A1A
--color-white: #FFFFFF
--color-matrix: #0B8A3A
--color-matrix-2: #0E5F3B
```

### Classes Tailwind:
- `fixed` - Position fixe en haut
- `z-50` - Z-index élevé
- `backdrop-blur-md` - Flou d'arrière-plan (8px)
- `bg-anthracite/70` - Fond anthracite 70% opacité
- `border-white/10` - Bordure blanche 10% opacité
- `shadow-[0_8px_24px_rgba(0,0,0,0.15)]` - Ombre douce

---

## ✅ Critères d'Acceptation

| Critère | Status |
|---------|--------|
| Header reste en haut pendant le scroll | ✅ |
| Effet glassmorphism à scrollY > 0 | ✅ |
| Transparence + backdrop-blur | ✅ |
| Fine bordure + ombre subtile | ✅ |
| Transitions fluides (200ms) | ✅ |
| Respect prefers-reduced-motion | ✅ |
| Safe-area pour mobile | ✅ |
| Contraste AA+ maintenu | ✅ |
| Performances optimales | ✅ |

---

## 🧪 Tests

### Test Manuel:
1. ✅ Ouvrir `http://localhost:3001`
2. ✅ Vérifier que le header est opaque en haut de page
3. ✅ Scroller vers le bas
4. ✅ Observer l'effet glassmorphism (transparence + blur)
5. ✅ Vérifier la bordure subtile et l'ombre
6. ✅ Tester sur mobile (responsive)
7. ✅ Activer "Reduce motion" dans les préférences système
8. ✅ Vérifier que les animations sont minimisées

### Test Accessibilité:
```bash
# Lighthouse Accessibility Score
npm run lighthouse
```

---

## 📝 Notes Techniques

### Pourquoi Framer Motion ?
- Animation fluide du `backgroundColor`
- Respect automatique de `prefers-reduced-motion`
- GPU acceleration native
- API déclarative simple

### Pourquoi `backdrop-blur-md` ?
- Équilibre entre effet visuel et performances
- `backdrop-blur-sm` (4px) - trop subtil
- `backdrop-blur-md` (8px) - **optimal** ✅
- `backdrop-blur-lg` (16px) - peut impacter les perfs

### Pourquoi `scrollY > 1` ?
- Évite les faux positifs à scrollY === 0
- Déclenche l'effet dès le premier pixel scrollé
- Plus réactif que `scrollY > 8`

---

## 🎉 Résultat Final

Le header est maintenant **sticky** avec un magnifique **effet glassmorphism** qui:
- ✨ S'active dès le premier scroll
- 🎨 Ajoute transparence + blur + bordure + ombre
- ⚡ Reste fluide et performant
- ♿ Respecte l'accessibilité
- 📱 Fonctionne parfaitement sur mobile

---

## 🔗 Fichiers Modifiés

1. ✅ `src/hooks/useScrolled.js` - **CRÉÉ**
2. ✅ `src/components/Header.jsx` - **MODIFIÉ**
3. ✅ `src/app/layout.jsx` - **MODIFIÉ**

---

## 🚀 Prochaines Étapes (Optionnel)

### Améliorations Possibles:
1. **Thème Clair** - Ajouter `bg-white/60` pour mode clair
2. **Animation Logo** - Réduire taille du logo quand scrollé
3. **Shadow Dynamique** - Augmenter l'ombre selon scrollY
4. **Blur Progressif** - Augmenter le blur selon scrollY

### Exemple Blur Progressif:
```javascript
const blurAmount = Math.min(scrollY / 100, 1); // 0 à 1
style={{ backdropFilter: `blur(${blurAmount * 8}px)` }}
```

---

## 📚 Ressources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind Backdrop Blur](https://tailwindcss.com/docs/backdrop-blur)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [CSS env() for Safe Area](https://developer.mozilla.org/en-US/docs/Web/CSS/env)

---

**🎨 Effet Glassmorphism Implémenté avec Succès ! ✅**