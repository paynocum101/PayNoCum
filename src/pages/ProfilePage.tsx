import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { BottomNav } from '../components/BottomNav';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Settings, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  // In a real app, this would come from authentication
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=150'
  };

  const handleLogout = () => {
    // In a real app, this would clear the auth state
    navigate('/');
  };

  const handleAccountSettings = () => {
    // This would navigate to account settings in a real app
    alert('Account Settings would open here');
  };

  const handlePrivacySecurity = () => {
    // This would navigate to privacy settings in a real app
    alert('Privacy & Security settings would open here');
  };

  const menuItems = [
    { icon: <Settings size={20} />, label: 'Account Settings', action: handleAccountSettings },
    { icon: <Shield size={20} />, label: 'Privacy & Security', action: handlePrivacySecurity }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <PageHeader title="Profile" />
      
      <div className="px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-slate-400">{user.email}</p>
                <p className="text-slate-400">{user.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-sky-500">12</p>
                <p className="text-sm text-slate-400">Meetups</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-500">45</p>
                <p className="text-sm text-slate-400">Partners</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-500">8</p>
                <p className="text-sm text-slate-400">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Card key={index}>
              <CardContent className="py-4">
                <button 
                  className="w-full flex items-center justify-between text-left"
                  onClick={item.action}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sky-500">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-slate-400">›</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Button 
          colorScheme="error"
          fullWidth
          leftIcon={<LogOut size={18} />}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};