'use client';

import { useEffect, useState, useRef } from 'react';

const codeSnippets = [
  {
    language: 'JavaScript',
    code: `// Next.js API Route
export async function GET(request) {
  const data = await fetchData();
  return Response.json(data);
}`,
  },
  {
    language: 'React',
    code: `// Modern React Component
export default function App() {
  const [state, setState] = useState(0);
  
  return <div>{state}</div>;
}`,
  },
  {
    language: 'TypeScript',
    code: `// Type-safe function
interface User {
  name: string;
  email: string;
}

const getUser = (): User => {
  return { name: "John", email: "john@example.com" };
}`,
  },
];

export default function CodeTypingAnimation({
  snippetIndex = 0,
  typingSpeed = 50,
  className = '',
}) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const codeRef = useRef(null);

  const snippet = codeSnippets[snippetIndex % codeSnippets.length];
  const fullCode = snippet.code;

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < fullCode.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(fullCode.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      // Restart after 3 seconds
      setTimeout(() => {
        setCurrentIndex(0);
        setDisplayedCode('');
        setIsTyping(true);
      }, 3000);
    }
  }, [currentIndex, fullCode, isTyping, typingSpeed]);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 p-6 shadow-2xl ${className}`}>
      {/* Terminal header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-[var(--color-primary-500)]" />
        </div>
        <div className="ml-4 text-xs font-medium text-slate-400">{snippet.language}</div>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto">
        <code ref={codeRef} className="block font-mono text-sm leading-relaxed text-slate-300">
          {displayedCode}
          {isTyping && (
            <span className="inline-block h-5 w-2 animate-pulse bg-[var(--color-accent-matrix)]" />
          )}
        </code>
      </pre>

      {/* Glow effect */}
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[var(--color-accent-matrix)] opacity-20 blur-3xl" />
    </div>
  );
}
