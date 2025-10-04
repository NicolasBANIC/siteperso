/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          secondary: 'var(--color-accent-secondary)',
          matrix: 'var(--color-accent-matrix)',
        },
        border: 'var(--color-border)',
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 5vw, 4rem)', // 40-64px
        'display': 'clamp(2rem, 4.5vw, 3rem)', // 32-48px
        'heading-xl': 'clamp(1.75rem, 4vw, 2.5rem)', // 28-40px
        'heading-lg': 'clamp(1.5rem, 3vw, 2rem)', // 24-32px
        'heading-md': 'clamp(1.25rem, 2.5vw, 1.5rem)', // 20-24px
        'heading-sm': 'clamp(1.125rem, 2vw, 1.25rem)', // 18-20px
        'body-lg': 'clamp(1.125rem, 2vw, 1.25rem)', // 18-20px
        'body': 'clamp(1rem, 2vw, 1.125rem)', // 16-18px
        'body-sm': 'clamp(0.875rem, 1.5vw, 1rem)', // 14-16px
        'caption': 'clamp(0.75rem, 1.5vw, 0.875rem)', // 12-14px
        'ui': 'clamp(0.875rem, 2vw, 1rem)', // 14-16px
        'ui-sm': 'clamp(0.75rem, 1.5vw, 0.875rem)', // 12-14px
      },
      spacing: {
        '4': '0.25rem',   // 4px
        '8': '0.5rem',    // 8px
        '12': '0.75rem',  // 12px
        '16': '1rem',     // 16px
        '24': '1.5rem',   // 24px
        '32': '2rem',     // 32px
        '48': '3rem',     // 48px
      },
      borderRadius: {
        'sm': '0.5rem',   // 8px
        'lg': '1rem',     // 16px
        'xl': '1.5rem',   // 24px
        '2xl': '2rem',    // 32px
      },
      boxShadow: {
        'elevation': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'card': '0 6px 24px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },
};
