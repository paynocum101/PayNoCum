import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  showBackButton = false,
  rightAction
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="sticky top-0 bg-slate-900 bg-opacity-80 backdrop-blur-md z-10 px-4 py-3 flex items-center">
      {showBackButton && (
        <button 
          className="mr-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={24} className="text-slate-300" />
        </button>
      )}
      <h1 className="text-xl font-bold text-white flex-1">{title}</h1>
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
};