import React from 'react';
import { Home, Calendar, Plus, Settings, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <Calendar size={24} />, label: 'Meetups', path: '/meetups' },
    { icon: <Plus size={24} />, label: 'Create', path: '/create' },
    { icon: <User size={24} />, label: 'Profile', path: '/profile' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 pb-safe">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              isActive(item.path) ? 'text-sky-500' : 'text-slate-400 hover:text-white'
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};