# 🚀 Guide de Démarrage Rapide - BANDEV

## ⚡ En 5 minutes chrono !

Ce guide vous permet de mettre en ligne votre site **BANDEV** rapidement.

---

## 📋 Prérequis

- ✅ Node.js 18+ installé
- ✅ Compte GitHub (déjà fait ✓)
- ✅ Compte Gmail : `bcnicolaspro@gmail.com`
- ✅ SIRET : 841 375 652 00028

---

## 🎯 Étape 1 : Configuration Email (5 min)

### 1.1 Créer un mot de passe d'application Gmail

1. Allez sur https://myaccount.google.com/security
2. Activez la **validation en 2 étapes** (si pas déjà fait)
3. Cherchez **"Mots de passe des applications"**
4. Sélectionnez **"Mail"** et **"Autre (nom personnalisé)"**
5. Tapez : `BANDEV Website`
6. Cliquez sur **"Générer"**
7. **Copiez le mot de passe** (16 caractères)

### 1.2 Configurer les variables d'environnement

```bash
# Dans le dossier du projet
cp .env.local.example .env.local
```

Éditez `.env.local` et remplacez :

```env
CONTACT_EMAIL=bcnicolaspro@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=bcnicolaspro@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # ← Collez le mot de passe généré
COMPANY_NAME=BANDEV
COMPANY_SIRET=84137565200028
COMPANY_URL=https://bandev.fr
```

### 1.3 Installer Nodemailer

```bash
npm install nodemailer
```

### 1.4 Activer l'envoi d'emails

Ouvrez `src/app/api/contact/route.js` et :

1. **Décommentez** le bloc de code entre `/*` et `*/` (lignes 32-69)
2. **Supprimez** ou commentez la ligne 29 : `console.log('Nouveau message de contact:', { name, email, message });`

Votre fichier devrait ressembler à :

```javascript
// TODO: Intégrer avec votre service email Hostinger
// Pour l'instant, on simule un envoi réussi
// Vous devrez configurer nodemailer ou un autre service avec vos credentials Hostinger

// console.log('Nouveau message de contact:', { name, email, message }); // ← Commenté

// Exemple de configuration pour Hostinger (à compléter avec vos credentials)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

await transporter.sendMail({
  // ... reste du code
});
```

### 1.5 Tester le formulaire

```bash
npm run dev
```

Ouvrez http://localhost:3000 et testez le formulaire de contact !

---

## 🌐 Étape 2 : Acheter le domaine bandev.fr (10 min)

### Option A : OVH (Recommandé)

1. Allez sur https://www.ovh.com/fr/
2. Recherchez **"bandev.fr"**
3. Ajoutez au panier (~10€/an)
4. Créez un compte ou connectez-vous
5. Finalisez l'achat

### Option B : Gandi

1. Allez sur https://www.gandi.net/fr
2. Recherchez **"bandev.fr"**
3. Suivez le processus d'achat

### Option C : Hostinger

1. Allez sur https://www.hostinger.fr/
2. Recherchez **"bandev.fr"**
3. Suivez le processus d'achat

**💡 Conseil** : Prenez l'option avec **protection WHOIS** pour masquer vos données personnelles.

---

## 🚀 Étape 3 : Déployer sur Vercel (5 min)

### 3.1 Créer un compte Vercel

1. Allez sur https://vercel.com/signup
2. Connectez-vous avec **GitHub**
3. Autorisez Vercel à accéder à vos repos

### 3.2 Importer le projet

1. Cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez le repo **"siteperso"**
3. Cliquez sur **"Import"**

### 3.3 Configurer les variables d'environnement

**IMPORTANT** : Avant de déployer, ajoutez les variables :

1. Dans la section **"Environment Variables"**
2. Ajoutez **une par une** :

```
CONTACT_EMAIL = bcnicolaspro@gmail.com
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 465
SMTP_USER = bcnicolaspro@gmail.com
SMTP_PASSWORD = [votre_mot_de_passe_application]
COMPANY_NAME = BANDEV
COMPANY_SIRET = 84137565200028
COMPANY_URL = https://bandev.fr
```

3. Cliquez sur **"Deploy"**

⏳ **Attendez 2-3 minutes** que le déploiement se termine.

### 3.4 Vérifier le déploiement

Vercel vous donnera une URL temporaire :
```
https://siteperso-xxx.vercel.app
```

Testez cette URL pour vérifier que tout fonctionne !

---

## 🔗 Étape 4 : Connecter le domaine (5 min)

### 4.1 Dans Vercel

1. Allez dans votre projet
2. Cliquez sur **"Settings"** → **"Domains"**
3. Ajoutez **"bandev.fr"**
4. Vercel vous donnera des **enregistrements DNS** à configurer

### 4.2 Dans votre registrar (OVH/Gandi/Hostinger)

#### Si vous êtes chez OVH :

1. Allez dans **"Web Cloud"** → **"Noms de domaine"**
2. Cliquez sur **"bandev.fr"**
3. Onglet **"Zone DNS"**
4. Ajoutez les enregistrements fournis par Vercel :

```
Type: A
Nom: @
Valeur: 76.76.21.21

Type: CNAME
Nom: www
Valeur: cname.vercel-dns.com
```

5. Sauvegardez

#### Si vous êtes chez Gandi :

1. Allez dans **"Domaines"** → **"bandev.fr"**
2. Onglet **"Enregistrements DNS"**
3. Ajoutez les enregistrements Vercel
4. Sauvegardez

#### Si vous êtes chez Hostinger :

1. Allez dans **"Domaines"** → **"bandev.fr"**
2. Cliquez sur **"DNS / Serveurs de noms"**
3. Ajoutez les enregistrements Vercel
4. Sauvegardez

### 4.3 Attendre la propagation DNS

⏳ **Patience** : La propagation DNS peut prendre de **10 minutes à 48 heures**.

Vérifiez avec : https://dnschecker.org/#A/bandev.fr

---

## 🎉 Étape 5 : Vérifications finales (5 min)

### 5.1 Tester le site

1. Ouvrez https://bandev.fr
2. Vérifiez que tout s'affiche correctement
3. Testez le formulaire de contact
4. Vérifiez votre email `bcnicolaspro@gmail.com`

### 5.2 Tester sur mobile

1. Ouvrez le site sur votre smartphone
2. Vérifiez le responsive design
3. Testez les animations
4. Testez le menu mobile

### 5.3 Vérifier les performances

1. Allez sur https://pagespeed.web.dev/
2. Entrez `https://bandev.fr`
3. Vérifiez les scores :
   - Performance : 90+
   - Accessibility : 100
   - Best Practices : 100
   - SEO : 100

---

## 📊 Étape 6 : SEO & Analytics (10 min)

### 6.1 Google Search Console

1. Allez sur https://search.google.com/search-console
2. Cliquez sur **"Ajouter une propriété"**
3. Entrez `https://bandev.fr`
4. Vérifiez la propriété (méthode DNS ou balise HTML)
5. Soumettez le sitemap : `https://bandev.fr/sitemap.xml`

### 6.2 Google Analytics 4

1. Allez sur https://analytics.google.com/
2. Créez un compte **"BANDEV"**
3. Créez une propriété **"bandev.fr"**
4. Copiez l'ID de mesure : `G-XXXXXXXXXX`
5. Ajoutez-le dans votre site (voir section suivante)

### 6.3 Ajouter Google Analytics au site

Créez `src/app/layout.jsx` et ajoutez dans le `<head>` :

```jsx
<head>
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  />
  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      `,
    }}
  />
  {/* ... reste du code */}
</head>
```

Puis :
```bash
git add .
git commit -m "🔍 Ajout Google Analytics"
git push origin main
```

Vercel redéploiera automatiquement !

---

## ✅ Checklist finale

### Configuration
- [ ] Mot de passe d'application Gmail créé
- [ ] `.env.local` configuré
- [ ] Nodemailer installé
- [ ] Code email décommenté
- [ ] Formulaire de contact testé en local

### Domaine
- [ ] Domaine bandev.fr acheté
- [ ] DNS configurés
- [ ] Propagation DNS vérifiée
- [ ] HTTPS actif (automatique avec Vercel)

### Déploiement
- [ ] Projet déployé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Domaine connecté à Vercel
- [ ] Site accessible sur bandev.fr

### SEO
- [ ] Google Search Console configuré
- [ ] Sitemap soumis
- [ ] Google Analytics installé
- [ ] Performances vérifiées (Lighthouse)

### Tests
- [ ] Site testé sur desktop
- [ ] Site testé sur mobile
- [ ] Formulaire de contact fonctionnel
- [ ] Email de test reçu
- [ ] Toutes les pages accessibles
- [ ] Animations fluides

---

## 🆘 Problèmes courants

### Le formulaire ne fonctionne pas

**Symptôme** : Message d'erreur lors de l'envoi

**Solutions** :
1. Vérifiez que `.env.local` est bien configuré
2. Vérifiez que nodemailer est installé : `npm list nodemailer`
3. Vérifiez que le code est décommenté dans `route.js`
4. Vérifiez les logs Vercel : Settings → Functions → Logs

### Le domaine ne fonctionne pas

**Symptôme** : "Site not found" ou erreur DNS

**Solutions** :
1. Attendez la propagation DNS (jusqu'à 48h)
2. Vérifiez les enregistrements DNS sur dnschecker.org
3. Vérifiez que les enregistrements sont corrects dans votre registrar
4. Contactez le support de votre registrar si nécessaire

### Les emails ne sont pas reçus

**Symptôme** : Formulaire envoyé mais pas d'email

**Solutions** :
1. Vérifiez les spams dans Gmail
2. Vérifiez que le mot de passe d'application est correct
3. Vérifiez les logs Vercel pour voir les erreurs
4. Testez avec un autre email de destination

### Erreur de build sur Vercel

**Symptôme** : Le déploiement échoue

**Solutions** :
1. Vérifiez les logs de build
2. Testez le build en local : `npm run build`
3. Vérifiez que toutes les dépendances sont installées
4. Contactez le support Vercel si nécessaire

---

## 📞 Support

### Documentation
- [README.md](./README.md) - Documentation complète
- [REFONTE_MODERNE_COMPLETE.md](./REFONTE_MODERNE_COMPLETE.md) - Détails techniques
- [CONFIGURATION_EMAIL.md](./CONFIGURATION_EMAIL.md) - Configuration email
- [REBRANDING_BANDEV.md](./REBRANDING_BANDEV.md) - Historique du rebranding

### Ressources externes
- **Vercel** : https://vercel.com/docs
- **Next.js** : https://nextjs.org/docs
- **Nodemailer** : https://nodemailer.com/
- **Gmail SMTP** : https://support.google.com/mail/answer/7126229

### Contact
- **Email** : bcnicolaspro@gmail.com
- **GitHub** : https://github.com/NicolasBANIC

---

## 🎯 Prochaines étapes

Une fois le site en ligne, pensez à :

1. **Créer une page Google My Business**
   - Ajoutez votre SIRET
   - Ajoutez des photos
   - Demandez des avis clients

2. **Optimiser le référencement local**
   - Inscrivez-vous sur les annuaires locaux
   - Créez du contenu sur Lyon et la région

3. **Créer du contenu**
   - Blog technique
   - Études de cas
   - Tutoriels

4. **Réseaux sociaux**
   - Partagez vos projets
   - Créez une page LinkedIn entreprise
   - Partagez votre expertise

5. **Marketing**
   - Google Ads (si budget)
   - LinkedIn Ads
   - Networking local

---

## 🎉 Félicitations !

Votre site **BANDEV** est maintenant en ligne ! 🚀

Vous avez maintenant un portfolio professionnel, moderne et performant qui va impressionner vos clients.

**N'oubliez pas** :
- ✅ Mettez à jour régulièrement votre portfolio
- ✅ Ajoutez vos nouveaux projets
- ✅ Demandez des témoignages clients
- ✅ Suivez vos statistiques Google Analytics
- ✅ Optimisez continuellement votre SEO

---

**Bon courage et bonne réussite avec BANDEV ! 💪**

---

**Créé le** : 2025-01-XX  
**Version** : 1.0.0  
**SIRET** : 841 375 652 00028  

**Made with 💻 by BANDEV**