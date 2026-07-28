"use client";

import { useState } from 'react';

interface TeamCrestProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  teamId?: string;
}

export function TeamCrest({ src, alt, className = "w-12 h-12", fallbackText, teamId }: TeamCrestProps) {
  const [error, setError] = useState(false);

  // Derive initials
  const initials = fallbackText 
    ? fallbackText.substring(0, 3).toUpperCase() 
    : alt.split(' ').map(n => n[0]).join('').substring(0, 3).toUpperCase();

  // Pick a stable premium background gradient based on team name / id
  const getGradient = () => {
    const key = (teamId || alt || '').toLowerCase();
    if (key.includes('city') || key.includes('mci')) {
      return 'from-sky-650 to-sky-400 text-white border-sky-400/40';
    }
    if (key.includes('arsenal') || key.includes('ars')) {
      return 'from-rose-650 to-rose-500 text-white border-rose-500/40';
    }
    if (key.includes('liverpool') || key.includes('liv')) {
      return 'from-red-700 to-red-500 text-white border-red-600/40';
    }
    if (key.includes('chelsea') || key.includes('che')) {
      return 'from-blue-700 to-blue-500 text-white border-blue-600/40';
    }
    if (key.includes('tottenham') || key.includes('tot')) {
      return 'from-slate-900 to-slate-750 text-slate-100 border-slate-700/40';
    }
    if (key.includes('united') || key.includes('mun')) {
      return 'from-red-600 to-red-400 text-white border-red-500/40';
    }
    if (key.includes('real madrid') || key.includes('rma')) {
      return 'from-slate-200 to-slate-150 text-slate-900 border-slate-300/40';
    }
    if (key.includes('barcelona') || key.includes('bar')) {
      return 'from-blue-800 to-red-700 text-white border-yellow-500/45';
    }
    // Generic gradients based on string hash to make them look distinct and premium
    const hash = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradients = [
      'from-emerald-600 to-teal-500 text-white border-emerald-500/40',
      'from-purple-600 to-indigo-500 text-white border-purple-500/40',
      'from-amber-600 to-orange-500 text-white border-amber-500/40',
      'from-rose-600 to-pink-500 text-white border-rose-500/40',
      'from-slate-700 to-slate-500 text-white border-slate-600/40',
    ];
    return gradients[hash % gradients.length];
  };

  const isLarge = className.includes('w-16') || className.includes('w-22') || className.includes('h-16') || className.includes('h-22');

  if (error || !src) {
    return (
      <div className={`rounded-full flex items-center justify-center font-black border shadow-md select-none bg-gradient-to-br shrink-0 ${getGradient()} ${className}`}>
        <span className={isLarge ? 'text-lg tracking-wider' : 'text-[9px]'}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={`${className} object-contain shrink-0`} 
      onError={() => setError(true)} 
    />
  );
}
