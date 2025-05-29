import React from 'react';

interface ToggleItemProps {
  label: string;
  isChecked: boolean;
  onChange: (value: boolean) => void;
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const colorMap = {
  primary: 'bg-sky-500',
  secondary: 'bg-slate-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500'
};

export const ToggleItem: React.FC<ToggleItemProps> = ({ 
  label, 
  isChecked, 
  onChange, 
  colorScheme = 'primary' 
}) => {
  const toggleColor = colorMap[colorScheme];
  
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-slate-200 mr-3">{label}</span>
      <div 
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isChecked ? toggleColor : 'bg-slate-700'}`}
        onClick={() => onChange(!isChecked)}
      >
        <span 
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-1'}`} 
        />
      </div>
    </div>
  );
};

export const ToggleGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      {children}
    </div>
  );
};