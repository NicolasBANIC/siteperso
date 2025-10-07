'use client';

import { forwardRef } from 'react';

/**
 * Composant Input - Charte Matrix (Anthracite, Blanc, Vert Matrix)
 *
 * Respecte WCAG AA+ avec :
 * - Contraste ≥ 4.5:1
 * - Focus visible avec anneau vert Matrix
 * - États hover/focus/error accessibles
 * - Labels associés correctement
 *
 * @param {Object} props
 * @param {'text' | 'email' | 'tel' | 'password' | 'number' | 'date' | 'textarea'} props.type
 * @param {string} props.label - Label du champ
 * @param {string} props.error - Message d'erreur (optionnel)
 * @param {boolean} props.required - Champ requis
 */
export const Input = forwardRef(function Input(
  { type = 'text', label, error, required = false, className = '', id, ...props },
  ref
) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;

  const baseStyles = [
    'w-full rounded-xl px-4 py-3',
    'border-2 transition-all duration-fast',
    'text-foreground bg-white',
    'placeholder:text-muted placeholder:opacity-70',
    'focus:outline-none focus:ring-2 focus:ring-[rgba(11,138,58,0.35)] focus:border-matrix2',
    'motion-reduce:transition-none',
  ].join(' ');

  const stateStyles = error
    ? 'border-error focus:border-error focus:ring-error/20'
    : 'border-neutral-300 hover:border-matrix/40 focus:border-matrix2';

  const combinedClassName = `${baseStyles} ${stateStyles} ${className}`;

  const InputElement = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="ml-1 text-error" aria-label="requis">
              *
            </span>
          )}
        </label>
      )}

      <InputElement
        ref={ref}
        id={inputId}
        type={type !== 'textarea' ? type : undefined}
        className={combinedClassName}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        aria-required={required}
        rows={type === 'textarea' ? 5 : undefined}
        {...props}
      />

      {error && (
        <p id={errorId} className="mt-2 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

/**
 * Composant Select - Champ de sélection avec la charte Matrix
 */
export const Select = forwardRef(function Select(
  { label, error, required = false, className = '', id, children, ...props },
  ref
) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${selectId}-error` : undefined;

  const baseStyles = [
    'w-full rounded-xl px-4 py-3',
    'border-2 transition-all duration-fast',
    'text-foreground bg-white',
    'focus:outline-none focus:ring-2 focus:ring-[rgba(11,138,58,0.35)] focus:border-matrix2',
    'motion-reduce:transition-none',
    'cursor-pointer',
  ].join(' ');

  const stateStyles = error
    ? 'border-error focus:border-error focus:ring-error/20'
    : 'border-neutral-300 hover:border-matrix/40 focus:border-matrix2';

  const combinedClassName = `${baseStyles} ${stateStyles} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block mb-2 text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="ml-1 text-error" aria-label="requis">
              *
            </span>
          )}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        className={combinedClassName}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        aria-required={required}
        {...props}
      >
        {children}
      </select>

      {error && (
        <p id={errorId} className="mt-2 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
