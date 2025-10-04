'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function FormulaireContact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
    budget: '',
    // Honeypot field - should remain empty
    website: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.sujet.trim()) {
      newErrors.sujet = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's a bot
    if (formData.website) {
      console.log('Bot detected via honeypot');
      // Fake success to not alert the bot
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          sujet: formData.sujet,
          message: formData.message,
          budget: formData.budget
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setStatus('success');
      setFormData({
        nom: '',
        email: '',
        sujet: '',
        message: '',
        budget: '',
        website: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Une erreur est survenue lors de l\'envoi du message.');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulaire de contact">
      {/* TODO: AA - Messages avec aria-live pour accessibilité (WCAG AA) */}
      {/* Success Message */}
      {status === 'success' && (
        <div 
          role="alert" 
          aria-live="polite"
          className="p-4 bg-[var(--color-accent-matrix)]/10 border border-[var(--color-accent-matrix)]/30 rounded-lg flex items-start gap-3"
        >
          <CheckCircle className="w-5 h-5 text-[var(--color-accent-matrix)] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-ui font-semibold text-[var(--color-foreground)]">
              Message envoyé avec succès !
            </p>
            <p className="text-body-sm text-[var(--color-muted)] mt-1">
              Je vous répondrai dans les plus brefs délais.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-ui font-semibold text-[var(--color-foreground)]">
              Une erreur est survenue
            </p>
            <p className="text-body-sm text-[var(--color-muted)] mt-1">
              {errorMessage || 'Veuillez réessayer ou me contacter directement par email.'}
            </p>
          </div>
        </div>
      )}

      {/* Honeypot field - hidden from users, visible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {/* Nom */}
      <div>
        <label htmlFor="nom" className="block text-ui-sm font-medium text-[var(--color-foreground)] mb-2">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          aria-invalid={errors.nom ? 'true' : 'false'}
          aria-describedby={errors.nom ? 'nom-error' : undefined}
          className={`w-full px-4 py-3 rounded-lg border text-body ${
            errors.nom 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]'
          } bg-[var(--color-surface)] text-[var(--color-foreground)] focus:ring-2 focus:border-transparent transition-all`}
          placeholder="Jean Dupont"
        />
        {errors.nom && (
          <p id="nom-error" className="mt-1 text-body-sm text-red-500" role="alert">{errors.nom}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-ui-sm font-medium text-[var(--color-foreground)] mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border text-body ${
            errors.email 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]'
          } bg-[var(--color-surface)] text-[var(--color-foreground)] focus:ring-2 focus:border-transparent transition-all`}
          placeholder="jean.dupont@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-body-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="sujet" className="block text-ui-sm font-medium text-[var(--color-foreground)] mb-2">
          Sujet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="sujet"
          name="sujet"
          value={formData.sujet}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border text-body ${
            errors.sujet 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]'
          } bg-[var(--color-surface)] text-[var(--color-foreground)] focus:ring-2 focus:border-transparent transition-all`}
          placeholder="Demande d'information"
        />
        {errors.sujet && (
          <p className="mt-1 text-body-sm text-red-500">{errors.sujet}</p>
        )}
      </div>

      {/* Budget (optionnel) */}
      <div>
        <label htmlFor="budget" className="block text-ui-sm font-medium text-[var(--color-foreground)] mb-2">
          Budget estimé <span className="text-[var(--color-muted)] text-body-sm">(optionnel)</span>
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all text-body"
        >
          <option value="">Sélectionnez une fourchette</option>
          <option value="< 2000€">Moins de 2 000€</option>
          <option value="2000€ - 5000€">2 000€ - 5 000€</option>
          <option value="5000€ - 10000€">5 000€ - 10 000€</option>
          <option value="10000€ - 20000€">10 000€ - 20 000€</option>
          <option value="> 20000€">Plus de 20 000€</option>
          <option value="À discuter">À discuter</option>
        </select>
        <p className="mt-1 text-body-sm text-[var(--color-muted)]">
          Cela m'aide à mieux comprendre vos besoins
        </p>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-ui-sm font-medium text-[var(--color-foreground)] mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 rounded-lg border text-body ${
            errors.message 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]'
          } bg-[var(--color-surface)] text-[var(--color-foreground)] focus:ring-2 focus:border-transparent transition-all resize-none`}
          placeholder="Votre message..."
        />
        {errors.message && (
          <p className="mt-1 text-body-sm text-red-500">{errors.message}</p>
        )}
        <p className="mt-1 text-body-sm text-[var(--color-muted)]">
          Minimum 10 caractères
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" />
            Envoyer le message
          </>
        )}
      </button>

      <p className="text-body-sm text-[var(--color-muted)]">
        <span className="text-red-500">*</span> Champs obligatoires
      </p>
    </form>
  );
}