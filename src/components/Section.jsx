export default function Section({ 
  children, 
  className = '', 
  id = '',
  background = 'default' // 'default', 'dark', 'gradient'
}) {
  const bgClasses = {
    default: 'bg-white dark:bg-gray-900',
    dark: 'bg-gray-50 dark:bg-gray-800',
    gradient: 'bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
  };

  return (
    <section 
      id={id}
      className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}