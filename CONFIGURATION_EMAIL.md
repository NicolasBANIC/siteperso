# Configuration Email Hostinger

## 📧 Configuration du formulaire de contact

Pour que le formulaire de contact fonctionne avec votre hébergement Hostinger, suivez ces étapes :

### 1. Créer le fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Configuration SMTP Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=votre-email@votredomaine.com
SMTP_PASSWORD=votre-mot-de-passe-email
CONTACT_EMAIL=votre-email@votredomaine.com
```

### 2. Installer Nodemailer

```bash
npm install nodemailer
```

### 3. Mettre à jour l'API route

Le fichier `src/app/api/contact/route.js` contient déjà le code commenté pour Nodemailer.
Décommentez les lignes 24-48 pour activer l'envoi d'emails.

### 4. Informations SMTP Hostinger

- **Serveur SMTP** : smtp.hostinger.com
- **Port** : 465 (SSL) ou 587 (TLS)
- **Authentification** : Oui
- **Nom d'utilisateur** : Votre adresse email complète
- **Mot de passe** : Le mot de passe de votre compte email

### 5. Tester le formulaire

1. Démarrez le serveur de développement : `npm run dev`
2. Allez sur la page d'accueil
3. Remplissez le formulaire dans la section héros
4. Vérifiez que vous recevez bien l'email

### 6. Sécurité

⚠️ **Important** : 
- Ne commitez JAMAIS le fichier `.env.local` dans Git
- Le fichier `.gitignore` est déjà configuré pour l'exclure
- Utilisez des variables d'environnement sur votre serveur de production

### 7. Alternative : Services tiers

Si vous préférez utiliser un service tiers, voici quelques options :

#### Resend (Recommandé)
```bash
npm install resend
```

```js
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'contact@votredomaine.com',
  to: 'votre-email@votredomaine.com',
  subject: `Nouveau message de ${name}`,
  html: `...`
});
```

#### SendGrid
```bash
npm install @sendgrid/mail
```

#### EmailJS (Frontend uniquement)
Pas besoin d'API route, tout se fait côté client.

---

## 🎥 Configuration de la vidéo

Votre vidéo doit être placée dans : `public/videos/videolibreCoding.mp4`

### Optimisation de la vidéo

Pour de meilleures performances, optimisez votre vidéo :

```bash
# Avec FFmpeg (à installer)
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -strict -2 -movflags +faststart -vf scale=1920:-1 -b:v 2M output.mp4
```

Paramètres recommandés :
- **Résolution** : 1920x1080 max
- **Codec** : H.264
- **Bitrate** : 2-3 Mbps
- **Durée** : 10-30 secondes en loop
- **Taille** : < 5 MB si possible

---

## 🚀 Démarrage rapide

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement** :
   - Créez `.env.local` avec vos credentials Hostinger

3. **Placer votre vidéo** :
   - Copiez votre vidéo dans `public/videos/videolibreCoding.mp4`

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur** :
   - http://localhost:3000

---

## 📝 Checklist avant mise en production

- [ ] Variables d'environnement configurées sur le serveur
- [ ] Vidéo optimisée et uploadée
- [ ] Formulaire de contact testé
- [ ] Images optimisées (WebP/AVIF)
- [ ] Tests sur mobile, tablette, desktop
- [ ] Score Lighthouse > 90
- [ ] Métadonnées SEO vérifiées
- [ ] Sitemap et robots.txt configurés
- [ ] Analytics configuré (Google Analytics, etc.)
- [ ] Certificat SSL actif

---

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans la console du navigateur
2. Vérifiez les logs du serveur (terminal)
3. Testez les credentials SMTP avec un client email
4. Vérifiez que le port 465/587 n'est pas bloqué par votre firewall

---

Bon développement ! 🎉