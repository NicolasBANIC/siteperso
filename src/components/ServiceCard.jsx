import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ title, description, icon, features, href }) {
  return (
    <article className="group card hover:scale-[1.02] transition-all duration-300 motion-reduce:transform-none">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white">
        {icon ? (
          <Image 
            src={icon} 
            alt={`Illustration du service ${title}`} 
            width={32} 
            height={32} 
            className="h-8 w-8 object-cover rounded-lg" 
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-[var(--color-accent)]/20" />
        )}
      </div>
      
      <h3 className="mt-6 text-heading-md font-semibold text-[var(--color-foreground)]">{title}</h3>
      <p className="mt-3 text-body-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
      
      {features && features.length > 0 && (
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-body-sm text-[var(--color-muted)]">
              <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      {href && (
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-ui-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-secondary)]"
        >
          En savoir plus
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}