// TODO: AA - Composant Button avec focus-visible et aria-label (WCAG AA)
// TODO: UX - Variants avec class-variance-authority pour cohérence UI
'use client';

/**
 * Composant Button réutilisable avec accessibilité AA
 * Supporte les variants primary/secondary/ghost et les tailles sm/md/lg
 */
export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  'aria-label': ariaLabel,
  ...props 
}) {
  // TODO: UX - Variants de style selon le design system
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium outline-none transition-all duration-200 motion-reduce:transition-none';
  
  const variantStyles = {
    primary: 'bg-[var(--color-accent)] text-white hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)] shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]',
    ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-11 px-5 text-lg',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button 
      className={combinedClassName}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Composant ButtonLink pour les liens stylisés comme des boutons
 */
export function ButtonLink({ 
  children, 
  href,
  className = '', 
  variant = 'primary', 
  size = 'md',
  'aria-label': ariaLabel,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium outline-none transition-all duration-200 motion-reduce:transition-none';
  
  const variantStyles = {
    primary: 'bg-[var(--color-accent)] text-white hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)] shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]',
    ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-11 px-5 text-lg',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <a 
      href={href}
      className={combinedClassName}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      {...props}
    >
      {children}
    </a>
  );
}