import { memo } from 'react';

/**
 * Composant Container
 * Simple wrapper pour centrer le contenu avec une largeur maximale
 */
function Container({ children, className = '' }) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

export default memo(Container);
