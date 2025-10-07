import { NextResponse } from 'next/server';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute per IP

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Filter out old requests
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  
  // Cleanup old entries periodically
  if (rateLimitMap.size > 1000) {
    rateLimitMap.clear();
  }
  
  return true;
}

export async function POST(request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans quelques instants.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { nom, email, sujet, message, budget, website } = body;

    // Honeypot check - if website field is filled, it's a bot
    if (website) {
      console.log('Bot detected via honeypot from IP:', ip);
      // Return success to not alert the bot
      return NextResponse.json(
        { success: true, message: 'Message envoyé avec succès' },
        { status: 200 }
      );
    }

    // Validation
    if (!nom || !email || !sujet || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Name validation (min 2 chars, max 100)
    if (nom.trim().length < 2 || nom.trim().length > 100) {
      return NextResponse.json(
        { error: 'Le nom doit contenir entre 2 et 100 caractères' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Subject validation
    if (sujet.trim().length < 3 || sujet.trim().length > 200) {
      return NextResponse.json(
        { error: 'Le sujet doit contenir entre 3 et 200 caractères' },
        { status: 400 }
      );
    }

    // Message validation
    if (message.trim().length < 10 || message.trim().length > 5000) {
      return NextResponse.json(
        { error: 'Le message doit contenir entre 10 et 5000 caractères' },
        { status: 400 }
      );
    }

    // Log the contact request
    console.log('Nouveau message de contact:', { 
      nom, 
      email, 
      sujet, 
      budget: budget || 'Non spécifié',
      ip,
      timestamp: new Date().toISOString()
    });

    // TODO: Intégrer avec votre service email
    // Pour l'instant, on simule un envoi r��ussi
    // Décommentez le code ci-dessous et configurez vos variables d'environnement
    
    /*
    // Installation requise: npm install nodemailer
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // ex: smtp.hostinger.com ou smtp.gmail.com
      port: process.env.SMTP_PORT, // ex: 465 (SSL) ou 587 (TLS)
      secure: process.env.SMTP_PORT === '465', // true pour 465, false pour 587
      auth: {
        user: process.env.SMTP_USER, // votre email
        pass: process.env.SMTP_PASSWORD, // mot de passe d'application
      },
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10B981 0%, #10B981 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10B981; }
          .label { font-weight: 600; color: #0B132B; margin-bottom: 5px; }
          .value { color: #4a5568; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">📬 Nouveau message de contact</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">nicolasbanic.dev</p>
          </div>
          <div class="content">
            <div class="info-box">
              <div class="label">👤 Nom</div>
              <div class="value">${nom}</div>
            </div>
            
            <div class="info-box">
              <div class="label">📧 Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #10B981; text-decoration: none;">${email}</a></div>
            </div>
            
            <div class="info-box">
              <div class="label">📋 Sujet</div>
              <div class="value">${sujet}</div>
            </div>
            
            ${budget ? `
            <div class="info-box">
              <div class="label">💰 Budget estimé</div>
              <div class="value">${budget}</div>
            </div>
            ` : ''}
            
            <div class="info-box">
              <div class="label">💬 Message</div>
              <div class="value" style="white-space: pre-wrap;">${message}</div>
            </div>
            
            <div class="footer">
              <p>📅 Reçu le ${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p style="margin-top: 10px;">SIRET: 841 375 652 00028 | BANDEV - Nicolas Banic</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Nicolas Banic'}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Contact] ${sujet} - ${nom}`,
      html: emailHtml,
      text: `
Nouveau message de contact

Nom: ${nom}
Email: ${email}
Sujet: ${sujet}
${budget ? `Budget: ${budget}` : ''}

Message:
${message}

---
Reçu le ${new Date().toLocaleString('fr-FR')}
      `.trim()
    });
    */

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
