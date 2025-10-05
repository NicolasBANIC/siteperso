"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, User, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const watchedFields = watch();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative"
    >
      {/* Glassmorphism card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 via-transparent to-[var(--color-accent-secondary)]/10" aria-hidden="true" />
        
        <div className="relative">
          <div className="mb-6 text-center">
            <h3 className="text-heading-lg font-bold text-white drop-shadow-lg">
              Démarrons votre projet
            </h3>
            <p className="mt-2 text-body-sm font-medium text-white/80">
              Réponse sous 24h • Devis gratuit
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name field */}
            <div>
              <label htmlFor="hero-name" className="sr-only">
                Votre nom
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <User className="h-5 w-5 text-white/60" aria-hidden="true" />
                </div>
                <input
                  id="hero-name"
                  type="text"
                  placeholder="Votre nom"
                  {...register('name', {
                    required: 'Le nom est requis',
                    minLength: { value: 2, message: 'Minimum 2 caractères' }
                  })}
                  className={`w-full rounded-xl border bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:bg-white/30 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-400 ring-2 ring-red-400/50'
                      : 'border-white/30 focus:border-white/50 focus:ring-white/50'
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 flex items-center gap-1 text-xs text-red-300"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="hero-email" className="sr-only">
                Votre email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-white/60" aria-hidden="true" />
                </div>
                <input
                  id="hero-email"
                  type="email"
                  placeholder="votre@email.com"
                  {...register('email', {
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email invalide'
                    }
                  })}
                  className={`w-full rounded-xl border bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:bg-white/30 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-400 ring-2 ring-red-400/50'
                      : 'border-white/30 focus:border-white/50 focus:ring-white/50'
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 flex items-center gap-1 text-xs text-red-300"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Message field */}
            <div>
              <label htmlFor="hero-message" className="sr-only">
                Votre message
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-0 top-3 flex pl-4">
                  <MessageSquare className="h-5 w-5 text-white/60" aria-hidden="true" />
                </div>
                <textarea
                  id="hero-message"
                  rows={4}
                  placeholder="Décrivez votre projet en quelques mots..."
                  {...register('message', {
                    required: 'Le message est requis',
                    minLength: { value: 10, message: 'Minimum 10 caractères' }
                  })}
                  className={`w-full resize-none rounded-xl border bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:bg-white/30 focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-red-400 ring-2 ring-red-400/50'
                      : 'border-white/30 focus:border-white/50 focus:ring-white/50'
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 flex items-center gap-1 text-xs text-red-300"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.message.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-xl bg-white py-3 text-ui font-semibold text-[var(--color-accent)] shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
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
                ) : (
                  <>
                    Envoyer ma demande
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-0 transition-opacity group-hover:opacity-10" aria-hidden="true" />
            </button>
          </form>

          {/* Status messages */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--color-accent-matrix)]/20 p-3 text-body-sm font-medium text-white backdrop-blur-sm"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p>Message envoyé ! Je vous réponds sous 24h.</p>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/20 p-3 text-body-sm font-medium text-white backdrop-blur-sm"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p>Une erreur est survenue. Réessayez ou contactez-moi directement.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust indicators */}
          <div className="mt-6 flex items-center justify-center gap-4 text-caption font-medium text-white/70">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>Sans engagement</span>
            </div>
            <div className="h-4 w-px bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>Données sécurisées</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}