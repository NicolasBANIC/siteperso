'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function FormulaireDevis() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    typeProjet: '',
    budget: '',
    delai: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const typesProjets = [
    'Site vitrine',
    'E-commerce',
    'Application web',
    'Refonte de site',
    'Maintenance',
    'Autre'
  ];

  const budgets = [
    'Moins de 1 000€',
    '1 000€ - 3 000€',
    '3 000€ - 5 000€',
    '5 000€ - 10 000€',
    'Plus de 10 000€'
  ];

  const delais = [
    'Urgent (moins d\'1 mois)',
    '1 à 3 mois',
    '3 à 6 mois',
    'Plus de 6 mois',
    'Flexible'
  ];

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

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis';
    } else if (!/^[0-9\s\-\+\(\)]{10,}$/.test(formData.telephone)) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }

    if (!formData.typeProjet) {
      newErrors.typeProjet = 'Veuillez sélectionner un type de projet';
    }

    if (!formData.budget) {
      newErrors.budget = 'Veuillez sélectionner un budget';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Veuillez décrire votre projet';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'La description doit contenir au moins 20 caractères';
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
    
    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/devis', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setStatus('success');
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        typeProjet: '',
        budget: '',
        delai: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">
              Demande envoyée avec succès !
            </p>
            <p className="text-sm text-green-700 mt-1">
              Je vous recontacterai dans les plus brefs délais.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">
              Une erreur est survenue
            </p>
            <p className="text-sm text-red-700 mt-1">
              Veuillez réessayer ou me contacter directement.
            </p>
          </div>
        </div>
      )}

      {/* Nom */}
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.nom 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-[var(--color-accent)]'
          } bg-white text-gray-900 focus:ring-2 focus:border-transparent transition-all`}
          placeholder="Jean Dupont"
        />
        {errors.nom && (
          <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
        )}
      </div>

      {/* Email & Téléphone */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-[var(--color-accent)]'
            } bg-white text-gray-900 focus:ring-2 focus:border-transparent transition-all`}
            placeholder="jean.dupont@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.telephone 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-[var(--color-accent)]'
            } bg-white text-gray-900 focus:ring-2 focus:border-transparent transition-all`}
            placeholder="06 12 34 56 78"
          />
          {errors.telephone && (
            <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
          )}
        </div>
      </div>

      {/* Type de projet */}
      <div>
        <label htmlFor="typeProjet" className="block text-sm font-medium text-gray-700 mb-2">
          Type de projet <span className="text-red-500">*</span>
        </label>
        <select
          id="typeProjet"
          name="typeProjet"
          value={formData.typeProjet}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.typeProjet 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-[var(--color-accent)]'
          } bg-white text-gray-900 focus:ring-2 focus:border-transparent transition-all`}
        >
          <option value="">Sélectionnez un type</option>
          {typesProjets.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.typeProjet && (
          <p className="mt-1 text-sm text-red-600">{errors.typeProjet}</p>
        )}
      </div>

      {/* Budget & Délai */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Budget estimé <span className="text-red-500">*</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.budget 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-[var(--color-accent)]'
            } bg-white text-gray-900 focus:ring-2 focus:border-transparent transition-all`}
          >
            <option value="">Sélectionnez un budget</option>
            {budgets.map(budget => (
              <option key={budget} value={budget}>{budget}</option>
            ))}
          </select>
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
          )}
        </div>

        <div>
          <label htmlFor="delai" className="block text-sm font-medium text-gray-700 mb-2">
            Délai souhaité
          </label>
          <select
            id="delai"
            name="delai"
            value={formData.delai}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
          >
            <option value="">Sélectionnez un délai</option>
            {delais.map(delai => (
              <option key={delai} value={delai}>{delai}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Description du projet <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-[var(--color-accent)]'
          } bg-white text-gray-900 focus:ring-2 focus:border-transparent transition-all resize-none`}
          placeholder="Décrivez votre projet, vos besoins, vos objectifs..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Minimum 20 caractères
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
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Envoyer ma demande
          </>
        )}
      </button>

      <p className="text-sm text-gray-500">
        <span className="text-red-500">*</span> Champs obligatoires
      </p>
    </form>
  );
}