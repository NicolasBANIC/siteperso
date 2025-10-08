'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, User, MessageSquare, Send, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroContactFormNew() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const watchedFields = watch();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Honeypot check
    if (data.website) {
      setIsSubmitting(false);
      return; // Silent fail for bots
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          consent: data.consent,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus(null), 8000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="contact-card relative w-full"
    >
      {/* Glassmorphism card with enhanced styling */}
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gray-900/70 p-6 shadow-2xl backdrop-blur-xl">
        {/* Subtle gradient border */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-white/20 via-[var(--color-primary-300)]/30 to-white/20">
          <div className="h-full w-full rounded-2xl bg-gray-900/70 backdrop-blur-xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">Contact rapide</h3>
            <p className="mt-2 text-sm font-medium text-white/80">
              Réponse sous 24h • Devis gratuit
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="website"
              {...register('website')}
              style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                opacity: '0',
              }}
              tabIndex="-1"
              autoComplete="off"
            />

            {/* Name field */}
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Votre nom *
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-white/60" aria-hidden="true" />
                </div>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Votre nom *"
                  {...register('name', {
                    required: 'Le nom est requis',
                    minLength: { value: 2, message: 'Minimum 2 caractères' },
                  })}
                  className={`w-full rounded-xl border bg-slate-900/90 py-3 pl-10 pr-4 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:bg-slate-800/90 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-400 ring-2 ring-red-400/50'
                      : 'border-white/20 focus:border-[var(--color-primary-500)]/50 focus:ring-[var(--color-primary-500)]/30'
                  }`}
                  aria-required="true"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 flex items-center gap-1 text-xs text-red-300"
                    role="alert"
                  >
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Votre email *
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-white/60" aria-hidden="true" />
                </div>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="votre@email.com *"
                  {...register('email', {
                    required: "L'email est requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email invalide',
                    },
                  })}
                  className={`w-full rounded-xl border bg-slate-900/90 py-3 pl-10 pr-4 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:bg-slate-800/90 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-400 ring-2 ring-red-400/50'
                      : 'border-white/20 focus:border-[var(--color-primary-500)]/50 focus:ring-[var(--color-primary-500)]/30'
                  }`}
                  aria-required="true"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 flex items-center gap-1 text-xs text-red-300"
                    role="alert"
                  >
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Message field */}
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Votre message (facultatif)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-0 top-3 flex pl-3">
                  <MessageSquare className="h-5 w-5 text-white/60" aria-hidden="true" />
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Décrivez votre projet en quelques mots (facultatif)..."
                  {...register('message')}
                  className="w-full resize-none rounded-xl border border-white/20 bg-slate-900/90 py-3 pl-10 pr-4 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:border-[var(--color-primary-500)]/50 focus:bg-slate-800/90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/30"
                />
              </div>
            </div>

            {/* GDPR Consent checkbox */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <input
                  id="contact-consent"
                  type="checkbox"
                  {...register('consent', {
                    required: 'Le consentement est requis',
                  })}
                  className={`h-4 w-4 rounded border-2 bg-slate-900/90 text-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/30 focus:ring-offset-0 ${
                    errors.consent ? 'border-red-400' : 'border-white/30'
                  }`}
                  aria-required="true"
                  aria-describedby={errors.consent ? 'consent-error' : 'consent-description'}
                />
              </div>
              <div>
                <label htmlFor="contact-consent" className="text-xs text-white/90 cursor-pointer">
                  J'accepte que mes données soient utilisées pour me recontacter (RGPD) *
                </label>
                <AnimatePresence>
                  {errors.consent && (
                    <motion.p
                      id="consent-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 flex items-center gap-1 text-xs text-red-300"
                      role="alert"
                    >
                      <AlertCircle className="h-3 w-3" aria-hidden="true" />
                      {errors.consent.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary group relative w-full overflow-hidden rounded-xl bg-[var(--color-primary-600)] py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-primary-500)] hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Envoi en cours...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Message envoyé !
                  </>
                ) : (
                  <>
                    Envoyer
                    <Send
                      className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </>
                )}
              </span>
              <div
                className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-700)] opacity-0 transition-opacity group-hover:opacity-20"
                aria-hidden="true"
              />
            </button>
          </form>

          {/* Status messages */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--color-primary-600)]/20 p-3 text-sm font-medium text-white backdrop-blur-sm"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2
                  className="h-5 w-5 flex-shrink-0 text-[var(--color-primary-300)]"
                  aria-hidden="true"
                />
                <p>Merci ! Je vous réponds sous 24h.</p>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/20 p-3 text-sm font-medium text-white backdrop-blur-sm"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
                <p>Une erreur est survenue. Réessayez ou contactez-moi directement.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust indicators */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-medium text-white/70">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" aria-hidden="true" />
              <span>Sans engagement</span>
            </div>
            <div className="h-3 w-px bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
              <span>Données sécurisées</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
