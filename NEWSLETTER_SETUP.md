# 📧 Configuration de la Newsletter - Guide Complet

Ce document explique comment configurer l'envoi de newsletters avec un service d'emailing professionnel.

---

## 🎯 Fonctionnalités Actuelles

### ✅ Déjà Implémenté

- **Formulaire d'inscription** dans le Footer (toutes les pages)
- **Validation côté client** (email valide, champs requis)
- **Validation côté serveur** (format email, longueur)
- **Rate limiting** (3 inscriptions max par minute par IP)
- **Messages de feedback** (succès, erreur, chargement)
- **Accessibilité** (ARIA labels, états disabled)
- **Design responsive** et cohérent avec le site

### ⏳ À Configurer

- **Intégration avec un service d'emailing** (Mailchimp, SendGrid, Brevo, etc.)
- **Base de données** pour stocker les abonnés (optionnel selon le service)
- **Email de confirmation** (double opt-in)
- **Page de désinscription**

---

## 🚀 Services d'Emailing Recommandés

### 1. **Mailchimp** (Recommandé pour débuter)

**Avantages :**
- ✅ Gratuit jusqu'à 500 contacts
- ✅ Interface intuitive
- ✅ Templates d'emails professionnels
- ✅ Statistiques détaillées
- ✅ Automatisations disponibles

**Tarifs :**
- **Gratuit** : 500 contacts, 1 000 emails/mois
- **Essentials** : 13€/mois (500 contacts)
- **Standard** : 20€/mois (500 contacts)

**Documentation :** https://mailchimp.com/developer/

---

### 2. **Brevo** (ex-Sendinblue)

**Avantages :**
- ✅ Gratuit jusqu'à 300 emails/jour
- ✅ Contacts illimités (même en gratuit)
- ✅ Interface en français
- ✅ SMS marketing inclus
- ✅ CRM intégré

**Tarifs :**
- **Gratuit** : 300 emails/jour, contacts illimités
- **Starter** : 25€/mois (20 000 emails/mois)
- **Business** : 65€/mois (emails illimités)

**Documentation :** https://developers.brevo.com/

---

### 3. **SendGrid**

**Avantages :**
- ✅ Gratuit jusqu'à 100 emails/jour
- ✅ API très performante
- ✅ Délivrabilité excellente
- ✅ Intégration facile

**Tarifs :**
- **Gratuit** : 100 emails/jour
- **Essentials** : 15$/mois (50 000 emails/mois)
- **Pro** : 60$/mois (100 000 emails/mois)

**Documentation :** https://docs.sendgrid.com/

---

### 4. **ConvertKit**

**Avantages :**
- ✅ Spécialisé pour créateurs de contenu
- ✅ Automatisations puissantes
- ✅ Landing pages incluses
- ✅ Formulaires personnalisables

**Tarifs :**
- **Gratuit** : 1 000 abonnés
- **Creator** : 25$/mois (1 000 abonnés)
- **Creator Pro** : 50$/mois (1 000 abonnés)

**Documentation :** https://developers.convertkit.com/

---

## 📋 Configuration avec Mailchimp (Exemple)

### Étape 1 : Créer un compte Mailchimp

1. Aller sur https://mailchimp.com/
2. Créer un compte gratuit
3. Vérifier votre email

### Étape 2 : Créer une audience (liste)

1. Dans Mailchimp, aller dans **Audience** → **All contacts**
2. Cliquer sur **Create Audience**
3. Remplir les informations :
   - **Audience name** : Newsletter BANDEV
   - **Default from email** : contact@bandev.fr
   - **Default from name** : Nicolas Banic

### Étape 3 : Obtenir les clés API

1. Aller dans **Account** → **Extras** → **API keys**
2. Cliquer sur **Create A Key**
3. Copier la clé API générée
4. Noter votre **Data Center** (ex: us1, us2, etc.)

### Étape 4 : Obtenir l'ID de la liste

1. Aller dans **Audience** → **All contacts**
2. Cliquer sur **Settings** → **Audience name and defaults**
3. Copier l'**Audience ID** (ex: a1b2c3d4e5)

### Étape 5 : Configurer les variables d'environnement

Ajouter dans `.env.local` :

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_LIST_ID=your_list_id_here
MAILCHIMP_DC=us1
```

**⚠️ Important :** Ne jamais commiter le fichier `.env.local` !

### Étape 6 : Installer le package Mailchimp

```bash
npm install @mailchimp/mailchimp_marketing
```

### Étape 7 : Mettre à jour l'API route

Remplacer le contenu de `src/app/api/newsletter/route.js` :

```javascript
import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

// Configuration Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_DC,
});

// Rate limiting (garder le code existant)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  const recentRequests = userRequests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, requests] of rateLimit.entries()) {
    const recentRequests = requests.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );
    if (recentRequests.length === 0) {
      rateLimit.delete(ip);
    } else {
      rateLimit.set(ip, recentRequests);
    }
  }
}, RATE_LIMIT_WINDOW);

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer dans quelques instants." },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    // Validation
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "L'adresse email est requise." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "L'adresse email n'est pas valide." },
        { status: 400 }
      );
    }

    // Ajouter à Mailchimp
    try {
      const response = await mailchimp.lists.addListMember(
        process.env.MAILCHIMP_LIST_ID,
        {
          email_address: email.toLowerCase().trim(),
          status: "subscribed",
        }
      );

      console.log("✅ Inscription newsletter réussie:", email);

      return NextResponse.json(
        {
          success: true,
          message: "Merci pour votre inscription ! Vous recevrez bientôt nos actualités.",
        },
        { status: 200 }
      );

    } catch (mailchimpError) {
      // Gérer les erreurs spécifiques Mailchimp
      if (mailchimpError.status === 400) {
        const errorTitle = mailchimpError.response?.body?.title;
        
        if (errorTitle === "Member Exists") {
          return NextResponse.json(
            { error: "Cette adresse email est déjà inscrite à notre newsletter." },
            { status: 400 }
          );
        }
        
        if (errorTitle === "Invalid Resource") {
          return NextResponse.json(
            { error: "L'adresse email n'est pas valide." },
            { status: 400 }
          );
        }
      }

      console.error("❌ Erreur Mailchimp:", mailchimpError);
      throw mailchimpError;
    }

  } catch (error) {
    console.error("❌ Erreur newsletter:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
```

### Étape 8 : Tester l'inscription

1. Redémarrer le serveur : `npm run dev`
2. Aller sur n'importe quelle page du site
3. Scroller jusqu'au Footer
4. Entrer un email de test
5. Cliquer sur "S'abonner"
6. Vérifier dans Mailchimp que le contact a été ajouté

---

## 🔧 Configuration avec Brevo (Alternative)

### Étape 1 : Créer un compte Brevo

1. Aller sur https://www.brevo.com/fr/
2. Créer un compte gratuit

### Étape 2 : Obtenir la clé API

1. Aller dans **Paramètres** → **Clés API SMTP & API**
2. Créer une nouvelle clé API
3. Copier la clé

### Étape 3 : Créer une liste

1. Aller dans **Contacts** → **Listes**
2. Créer une nouvelle liste : "Newsletter BANDEV"
3. Noter l'ID de la liste

### Étape 4 : Configurer `.env.local`

```env
# Brevo Configuration
BREVO_API_KEY=your_api_key_here
BREVO_LIST_ID=your_list_id_here
```

### Étape 5 : Installer le package

```bash
npm install @getbrevo/brevo
```

### Étape 6 : Mettre à jour l'API route

```javascript
import { NextResponse } from "next/server";
import SibApiV3Sdk from "@getbrevo/brevo";

// Configuration Brevo
const apiInstance = new SibApiV3Sdk.ContactsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.ContactsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export async function POST(request) {
  try {
    // ... (garder le rate limiting et la validation)

    const { email } = await request.json();

    // Ajouter à Brevo
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email.toLowerCase().trim();
    createContact.listIds = [parseInt(process.env.BREVO_LIST_ID)];

    await apiInstance.createContact(createContact);

    return NextResponse.json(
      {
        success: true,
        message: "Merci pour votre inscription !",
      },
      { status: 200 }
    );

  } catch (error) {
    if (error.response?.body?.code === "duplicate_parameter") {
      return NextResponse.json(
        { error: "Cette adresse email est déjà inscrite." },
        { status: 400 }
      );
    }

    console.error("❌ Erreur Brevo:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
```

---

## 📊 Fonctionnalités Avancées (Optionnel)

### Double Opt-In (Confirmation par email)

**Avantages :**
- ✅ Conformité RGPD renforcée
- ✅ Liste de meilleure qualité
- ✅ Moins de spam complaints

**Configuration dans Mailchimp :**
1. Aller dans **Audience** → **Settings** → **Audience fields and *|MERGE|* tags**
2. Activer **Enable double opt-in**

**Modifier le code :**
```javascript
status: "pending", // Au lieu de "subscribed"
```

### Page de Désinscription

Créer `src/app/newsletter/unsubscribe/page.jsx` :

```javascript
"use client";

import { useState } from "react";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-bold mb-4">Se désinscrire</h1>
        {status === "success" ? (
          <p>Vous avez été désinscrit avec succès.</p>
        ) : (
          <form onSubmit={handleUnsubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
            />
            <button type="submit" disabled={status === "loading"}>
              Se désinscrire
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
```

### Statistiques d'Inscription

Ajouter dans l'API route :

```javascript
// Logger les inscriptions dans un fichier ou base de données
import fs from "fs/promises";

await fs.appendFile(
  "newsletter-logs.txt",
  `${new Date().toISOString()} - ${email} - ${ip}\n`
);
```

---

## 🔒 Sécurité et Conformité RGPD

### ✅ Checklist RGPD

- ✅ **Consentement explicite** : L'utilisateur doit cliquer sur "S'abonner"
- ✅ **Information claire** : "Recevez mes derniers articles..."
- ✅ **Désinscription facile** : Lien dans chaque email
- ✅ **Politique de confidentialité** : Lien vers `/politique-confidentialite`
- ✅ **Pas de spam** : Mention "Pas de spam, désinscription à tout moment"
- ✅ **Sécurité** : Rate limiting, validation stricte

### Mentions Obligatoires dans les Emails

Chaque email de newsletter doit contenir :
- Nom et adresse de l'expéditeur
- Lien de désinscription visible
- Raison de l'envoi (inscription à la newsletter)

---

## 🧪 Tests

### Test d'Inscription

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test de Rate Limiting

Envoyer 4 requêtes rapidement → La 4ème doit retourner une erreur 429.

### Test d'Email Invalide

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email"}'
```

---

## 📈 Métriques à Suivre

- **Taux d'inscription** : Nombre d'inscriptions / Visiteurs
- **Taux d'ouverture** : Emails ouverts / Emails envoyés
- **Taux de clic** : Clics / Emails ouverts
- **Taux de désinscription** : Désinscriptions / Emails envoyés
- **Taux de spam complaints** : Signalements spam / Emails envoyés

**Objectifs recommandés :**
- Taux d'ouverture : > 20%
- Taux de clic : > 3%
- Taux de désinscription : < 0.5%

---

## 🆘 Dépannage

### Erreur : "Member Exists"

**Cause :** L'email est déjà inscrit.

**Solution :** Afficher un message personnalisé (déjà implémenté).

### Erreur : "Invalid API Key"

**Cause :** Clé API incorrecte ou expirée.

**Solution :** Vérifier `.env.local` et régénérer la clé si nécessaire.

### Erreur : "List ID not found"

**Cause :** ID de liste incorrect.

**Solution :** Vérifier l'ID dans Mailchimp/Brevo.

### Les emails ne sont pas reçus

**Causes possibles :**
- Email dans les spams
- Serveur d'emailing non configuré
- Email invalide

**Solutions :**
- Vérifier les spams
- Configurer SPF/DKIM/DMARC
- Tester avec un autre email

---

## 📚 Ressources

- **Mailchimp API Docs** : https://mailchimp.com/developer/
- **Brevo API Docs** : https://developers.brevo.com/
- **SendGrid API Docs** : https://docs.sendgrid.com/
- **RGPD Newsletter** : https://www.cnil.fr/fr/newsletters-et-prospection

---

**Date de création :** $(date)
**Dernière mise à jour :** $(date)
**Statut :** Newsletter fonctionnelle, intégration service d'emailing à configurer