/**
 * Composant Container
 * Simple wrapper pour centrer le contenu avec une largeur maximale
 */
export default function Container({ children, className = "" }) {
  return (
    <div className={`container-page ${className}`}>
      {children}
    </div>
  );
}