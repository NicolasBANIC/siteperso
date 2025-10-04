# Site Vitrine Nicolas Banic

Site vitrine professionnel développé avec Next.js 15, TailwindCSS v4 et une identité graphique personnalisée autour du logo NB.

## 🚀 Technologies

- **Framework** : Next.js 15 (App Router)
- **Styling** : TailwindCSS v4
- **Typographie** : Poppins (Google Fonts)
- **Icônes** : Lucide React
- **Optimisation images** : next/image avec AVIF/WebP
- **SEO** : Metadata API, JSON-LD, Sitemap, Robots.txt

## 🎨 Identité Graphique

### Palette de couleurs
- **Bleu roi** : `#0047AB` (couleur principale)
- **Bleu pétrole** : `#006D77` (secondaire)
- **Gris anthracite** : `#111827` (fond dark mode)
- **Vert Matrix** : `#00FF41` (accents)

### Logo
Monogramme NB en bleu roi avec rotation 360° au survol.

### Design System
Classes utilitaires réutilisables définies dans `globals.css` :
- `.btn-primary` / `.btn-secondary`
- `.card`
- `.badge`
- `.section-title` / `.section-subtitle`
- `.container-page`

## 📁 Structure du Projet

```
src/
├── app/
│   ├── page.jsx                    # Accueil
│   ├── portfolio/page.jsx          # Portfolio avec filtres
│   ├── services/page.jsx           # Services détaillés
│   ├── tarifs/page.jsx             # Tarifs et formules
│   ├── apropos/page.jsx            # À propos
│   ├── temoignages/page.jsx        # Témoignages clients
│   ├── devis/page.jsx              # Formulaire de devis
│   ├── contact/page.jsx            # Contact
│   ├── mentions-legales/page.jsx   # Mentions légales
│   ├── politique-confidentialite/page.jsx
│   ├── layout.jsx                  # Layout principal
│   ├── globals.css                 # Styles globaux
│   ├── robots.js                   # Robots.txt
│   └── sitemap.js                  # Sitemap XML
├── components/
│   ├── Header.jsx                  # Header sticky
│   ├── Footer.jsx                  # Footer avec liens
│   ├── BackToTop.jsx               # Bouton retour en haut
│   ├── ScrollReveal.jsx            # Animations au scroll
│   ├── Container.jsx               # Container responsive
│   ├── Section.jsx                 # Section avec backgrounds
│   ├── ServiceCard.jsx             # Carte de service
│   ├── PricingCard.jsx             # Carte de tarification
│   ├── ProjectCard.jsx             # Carte de projet
│   ├── TestimonialCard.jsx         # Carte de témoignage
│   ├── FormulaireDevis.jsx         # Formulaire de devis
│   ├── FormulaireContact.jsx       # Formulaire de contact
│   └── ThemeToggle.jsx             # Toggle dark mode
└── public/
    └── images/
        ├── logoNB.png              # Logo principal
        ├── avatar.jpg              # Photo de profil
        └── logos/                  # Logos de technologies
```

## ✨ Fonctionnalités

### Navigation
- Header sticky avec backdrop-blur
- Menu burger mobile accessible (aria-controls, aria-expanded)
- Surbrillance du lien actif
- Logo avec rotation au survol

### Micro-interactions
- Animations au scroll avec IntersectionObserver
- Hover states raffinés sur tous les éléments interactifs
- Respect de `prefers-reduced-motion`
- Transitions fluides et performantes

### Portfolio
- Système de filtres par catégorie
- Cartes avec zoom image au hover
- Modale détaillée pour chaque projet
- Technologies utilisées affichées

### Formulaires
- Validation côté client
- Messages de feedback (succès/erreur)
- États de chargement
- Champs obligatoires marqués

### Accessibilité
- Contraste AA respecté (WCAG 2.1)
- Balises alt descriptives
- États de focus visibles
- Navigation au clavier
- Attributs ARIA appropriés

### SEO
- Metadata personnalisée par page
- OpenGraph et Twitter Cards
- JSON-LD (Schema.org)
- Sitemap XML dynamique
- Robots.txt configuré
- Images optimisées (AVIF/WebP)

### Performance
- Images optimisées avec next/image
- Lazy loading automatique
- Code splitting par route
- Compression activée
- Polices optimisées

## 🛠️ Installation

```bash
# Cloner le repository
git clone https://github.com/nicolasbanic/siteperso.git

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start
```

## 📝 Configuration

### Variables d'environnement
Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SITE_URL=https://nicolasbanic.dev
NEXT_PUBLIC_CONTACT_EMAIL=bonjour@nicolasbanic.dev
```

### Personnalisation

#### Couleurs
Modifier les variables CSS dans `src/app/globals.css` :

```css
:root {
  --color-accent: #0047AB;
  --color-accent-secondary: #006D77;
  --color-accent-matrix: #00FF41;
}
```

#### Contenu
- **Projets** : Modifier `src/app/portfolio/page.jsx`
- **Services** : Modifier `src/app/services/page.jsx`
- **Tarifs** : Modifier `src/app/tarifs/page.jsx`
- **Témoignages** : Modifier `src/app/temoignages/page.jsx`

## 🚀 Déploiement

### Vercel (recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres plateformes
Le site est compatible avec toutes les plateformes supportant Next.js :
- Netlify
- AWS Amplify
- Railway
- Render

## 📊 Performance

Objectifs Lighthouse :
- **Performance** : > 90
- **Accessibilité** : > 90
- **Best Practices** : > 90
- **SEO** : > 90

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Nicolas Banic**
- Site web : [nicolasbanic.dev](https://nicolasbanic.dev)
- LinkedIn : [linkedin.com/in/nicolasbanic](https://linkedin.com/in/nicolasbanic)
- GitHub : [github.com/nicolasbanic](https://github.com/nicolasbanic)
- Email : bonjour@nicolasbanic.dev

## 🙏 Remerciements

Design inspiré par les meilleures pratiques UX/UI modernes et l'approche sobre et professionnelle de sites premium.
