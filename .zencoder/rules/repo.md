# Stack et environnement
- **Framework**: Next.js 15 (App Router)
- **Style**: Tailwind CSS v4, configuration principale en français
- **Langue**: Contenus et interface 100 % francophones

# Organisation du projet
1. `src/app` : pages App Router (`/`, `/services`, `/portfolio`, `/temoignages`, `/apropos`, `/devis`, `/contact`).
2. `src/components` : composants réutilisables (Header, Footer, ThemeToggle, ProjectCard, TestimonialCard, FormulaireDevis, FormulaireContact, etc.).
3. `public/images` : assets d'illustration et placeholders utilisés via `next/image`.

# Règles de style globales
- `styles/globals.css` (ou `src/app/globals.css`) importe Tailwind via `@import` et `@plugin`.
- Activer le dark mode Tailwind et conserver la police Poppins.
- Palette principale : bleu `#2563eb` avec variations cohérentes.
- Respecter les conventions Tailwind pour les classes utilitaires.

# Pages attendues
- `/`
- `/services`
- `/portfolio`
- `/temoignages`
- `/apropos`
- `/devis`
- `/contact`

# Composants clés
- `Header`
- `Footer`
- `ThemeToggle`
- `ProjectCard`
- `TestimonialCard`
- `FormulaireDevis`
- `FormulaireContact`

# Bonnes pratiques
- Contenus rédigés en français, ton professionnel et rassurant.
- SEO de base : balises title/description, structure sémantique, liens internes pertinents.
- `next/image` obligatoire pour les visuels, avec placeholders locaux (`/images/...`) en fallback.
- Optimisations : images adaptées, chargement paresseux par défaut, alt text informatif.

# Rappels
- Supprimer ou ignorer tout dossier `pages/` pour éviter les conflits avec l'App Router.
- Éviter les conflits de lockfiles (préférer `package-lock.json`).
- Ajouter `outputFileTracingRoot` dans `next.config.js` si nécessaire.
- Toutes les contributions doivent respecter cette structure et ce style.