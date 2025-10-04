"use client";

export default function GlassmorphismCard({ 
  children, 
  className = "",
  variant = "default", // "default", "accent", "gradient"
  hover = true 
}) {
  const variants = {
    default: "bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10",
    accent: "bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30",
    gradient: "bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-secondary)]/10 border-white/20"
  };

  const hoverEffect = hover 
    ? "hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1" 
    : "";

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-xl
        shadow-lg transition-all duration-300
        ${variants[variant]}
        ${hoverEffect}
        ${className}
      `}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}