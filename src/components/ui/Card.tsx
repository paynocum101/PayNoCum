import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  isHoverable?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  onClick, 
  isHoverable = false,
  className = ''
}) => {
  const hoverClasses = isHoverable 
    ? 'hover:translate-y-[-4px] hover:shadow-lg' 
    : '';
  
  return (
    <div 
      className={`bg-slate-800 rounded-lg shadow-md p-4 transition-all duration-200 ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-3">{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h3 className="text-lg font-semibold text-white">{children}</h3>;
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="text-slate-300">{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center">{children}</div>;
};