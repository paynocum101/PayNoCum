import React from 'react';

type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  colorScheme?: ColorScheme;
  size?: Size;
  fullWidth?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

const colorMap = {
  primary: 'bg-sky-500 hover:bg-sky-600 text-white',
  secondary: 'bg-slate-500 hover:bg-slate-600 text-white',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  error: 'bg-red-500 hover:bg-red-600 text-white'
};

const sizeMap = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  colorScheme = 'primary', 
  size = 'md',
  fullWidth = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  onClick
}) => {
  const colorClasses = colorMap[colorScheme];
  const sizeClasses = sizeMap[size];
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      className={`flex items-center justify-center rounded-md font-medium transition-colors ${colorClasses} ${sizeClasses} ${widthClass} ${disabledClasses}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};