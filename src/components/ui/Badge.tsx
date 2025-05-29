import React from 'react';

type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
type Variant = 'solid' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  colorScheme: ColorScheme;
  variant?: Variant;
}

const colorMap = {
  primary: {
    solid: 'bg-sky-500 text-white',
    outline: 'border border-sky-500 text-sky-500'
  },
  secondary: {
    solid: 'bg-slate-500 text-white',
    outline: 'border border-slate-500 text-slate-500'
  },
  success: {
    solid: 'bg-green-500 text-white',
    outline: 'border border-green-500 text-green-500'
  },
  warning: {
    solid: 'bg-yellow-500 text-white',
    outline: 'border border-yellow-500 text-yellow-500'
  },
  error: {
    solid: 'bg-red-500 text-white',
    outline: 'border border-red-500 text-red-500'
  }
};

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  colorScheme, 
  variant = 'solid' 
}) => {
  const colorClasses = colorMap[colorScheme][variant];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      {children}
    </span>
  );
};