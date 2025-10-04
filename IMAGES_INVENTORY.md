# 📸 Inventaire des Images - Site Portfolio Nicolas Banic

## 🎯 Résumé
Ce document liste toutes les images disponibles dans `/public/images` et leur utilisation actuelle dans le projet.

---

## ✅ Images Utilisées

### 🏠 Page d'Accueil (Home)

| Fichier | Utilisation | Emplacement dans le code |
|---------|-------------|--------------------------|
| `hero-main.jpg` | Image principale du hero | `src/app/page.jsx` ligne 153 |
| `service-vitrine.jpg` | Carte service "Sites vitrines" | `src/app/page.jsx` ligne 12 |
| `service-ecommerce.jpg` | Carte service "E-commerce" | `src/app/page.jsx` ligne 23 |
| `service-webapp.svg` | Carte service "Applications web" | `src/app/page.jsx` ligne 34 |
| `service-seo.jpg` | Carte service "SEO & Référencement" | `src/app/page.jsx` ligne 45 |

### 🎨 Portfolio

| Fichier | Utilisation | Projet |
|---------|-------------|--------|
| `gtravaux.jpg` | Projet GTravaux | Site vitrine |
| `portfolio-gtravaux-mobile.jpg` | Version mobile GTravaux | Site vitrine |
| `atelier-bois.jpg` | Projet Atelier Bois | E-commerce |
| `atelier-metal.jpg` | Projet Atelier Métal | Site vitrine |
| `conseil-habitat.jpg` | Projet Conseil Habitat | Application web |
| `douceurs-lea.jpg` | Projet Douceurs de Léa | E-commerce |
| `portfolio-ecom-fashion.jpg` | Projet Fashion Store | E-commerce |
| `portfolio-saas-dashboard.jpg` | Projet SaaS Dashboard | Application web |

**Emplacement :** `src/app/portfolio/page.jsx`

### 👥 Témoignages

| Fichier | Utilisation |
|---------|-------------|
| `testimonial-avatar1.jpg` | Avatar client 1 et 3 |
| `testimonial-avatar2.jpg` | Avatar client 2, 4 et 5 |
| `testimonial-avatar3.jpg` | Avatar client 6 |
| `testimonial-avatar1.svg` | Version SVG (disponible) |
| `testimonial-avatar2.svg` | Version SVG (disponible) |
| `testimonial-avatar3.svg` | Version SVG (disponible) |

**Emplacement :** `src/app/temoignages/page.jsx`

### 🛠️ Technologies (Logos)

| Fichier | Technologie |
|---------|-------------|
| `logos/nextjs.svg` | Next.js |
| `logos/react.svg` | React |
| `logos/tailwind.svg` | TailwindCSS |
| `logos/nodejs.svg` | Node.js |
| `logos/typescript.svg` | TypeScript |
| `logos/javascript.svg` | JavaScript |
| `logos/git.svg` | Git |
| `logos/figma.svg` | Figma |

**Emplacement :** `src/app/page.jsx` lignes 76-83

### 📄 Autres Pages

| Fichier | Utilisation | Emplacement |
|---------|-------------|-------------|
| `about-workspace.jpg` | Section À propos | `src/app/apropos/page.jsx` ligne 194 |
| `avatar.jpg` | Avatar personnel | Disponible mais non utilisé actuellement |
| `logoNB.png` | Logo dans le header | `src/components/Header.jsx` ligne 50 |
| `og-image.jpg` | Image Open Graph (partage social) | Disponible |
| `og-image.svg` | Version SVG de l'OG image | Disponible |

---

## 🔄 Images Processus (SVG)

Ces images sont **disponibles** mais **non utilisées** actuellement dans le code :

| Fichier | Description | Utilisation prévue |
|---------|-------------|-------------------|
| `process-step1.svg` | Icône Analyse | Section Processus - Étape 1 |
| `process-step2.svg` | Icône Design | Section Processus - Étape 2 |
| `process-step3.svg` | Icône Développement | Section Processus - Étape 3 |
| `process-step4.svg` | Icône Tests | Section Processus - Étape 4 |
| `process-step5.svg` | Icône Livraison | Section Processus - Étape 5 |

**Note :** Actuellement, la section Processus utilise des icônes Lucide React au lieu des SVG personnalisés.

---

## 🎨 Images Décoratives Disponibles

| Fichier | Type | Utilisation potentielle |
|---------|------|------------------------|
| `hero-placeholder.jpg` | JPG | Image de remplacement hero |
| `hero-placeholder.svg` | SVG | Image de remplacement hero |
| `commerce.svg` | SVG | Icône commerce |
| `fingerprint.svg` | SVG | Icône identité/sécurité |
| `rocket.svg` | SVG | Icône lancement/croissance |
| `service-webapp.jpg` | JPG | Alternative au SVG webapp |

---

## 📊 Statistiques

- **Total d'images disponibles :** 43 fichiers
- **Images utilisées :** ~25 fichiers
- **Images non utilisées :** ~18 fichiers
- **Logos technos :** 8 fichiers (tous utilisés)
- **Images portfolio :** 8 fichiers (tous utilisés)
- **Images témoignages :** 6 fichiers (3 JPG utilisés, 3 SVG disponibles)

---

## 🔧 Recommandations d'Optimisation

### 1. **Utiliser les SVG du processus**
Remplacer les icônes Lucide React par les SVG personnalisés dans la section Processus :
```jsx
// Au lieu de :
icon: Palette,

// Utiliser :
icon: "/images/process-step1.svg",
```

### 2. **Ajouter l'avatar personnel**
Utiliser `avatar.jpg` dans la section À propos ou dans le header :
```jsx
<Image src="/images/avatar.jpg" alt="Nicolas Banic" width={400} height={400} />
```

### 3. **Configurer les meta tags Open Graph**
Utiliser `og-image.jpg` dans le fichier `layout.jsx` ou `metadata` :
```jsx
export const metadata = {
  openGraph: {
    images: ['/images/og-image.jpg'],
  },
}
```

### 4. **Utiliser les SVG des témoignages**
Remplacer les JPG par les SVG pour de meilleures performances :
```jsx
avatar: "/images/testimonial-avatar1.svg" // Au lieu de .jpg
```

### 5. **Ajouter une image de fond CTA**
Créer une section CTA avec fond d'image :
```jsx
<div className="bg-[url('/images/hero-placeholder.jpg')] bg-cover">
  {/* Contenu CTA */}
</div>
```

---

## 🚀 Images Manquantes (selon la liste initiale)

Ces images étaient prévues mais ne sont pas présentes :

| Fichier manquant | Description |
|------------------|-------------|
| `techno-mongodb.svg` | Logo MongoDB |
| `techno-postgresql.svg` | Logo PostgreSQL |
| `cta-background.jpg` | Fond pour section CTA |
| `contact-illustration.svg` | Illustration section contact |
| `404-illustration.svg` | Illustration page 404 |

**Action recommandée :** Créer ou télécharger ces images si nécessaire.

---

## 📝 Notes Techniques

### Formats d'images
- **JPG** : Photos, images complexes (hero, portfolio, avatars)
- **SVG** : Logos, icônes, illustrations (meilleure qualité, poids léger)
- **PNG** : Logo avec transparence (logoNB.png)

### Optimisation Next.js
Toutes les images utilisent le composant `next/image` pour :
- ✅ Optimisation automatique
- ✅ Lazy loading
- ✅ Formats modernes (WebP)
- ✅ Responsive images

### Chemins d'accès
- **Dans le code :** `/images/nom-fichier.ext`
- **Sur le serveur :** `public/images/nom-fichier.ext`

---

## 🎯 Prochaines Étapes

1. ✅ **Intégrer les SVG du processus** dans `src/app/page.jsx`
2. ✅ **Ajouter l'avatar personnel** dans la page À propos
3. ✅ **Configurer l'Open Graph image** dans les metadata
4. ⏳ **Créer les images manquantes** (404, contact, CTA background)
5. ⏳ **Optimiser les images existantes** (compression, formats)

---

**Dernière mise à jour :** ${new Date().toLocaleDateString('fr-FR')}
**Auteur :** Nicolas Banic