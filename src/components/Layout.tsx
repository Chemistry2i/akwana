import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Layout: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [language, setLanguage] = React.useState('en');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    toast({
      title: "Language Changed",
      description: `Language set to ${lang === 'en' ? 'English' : lang === 'lg' ? 'Luganda' : 'Swahili'}`,
    });
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fa-home' },
    { path: '/scan', label: 'AI Scan', icon: 'fa-camera' },
    { path: '/weather', label: 'Weather', icon: 'fa-cloud-sun' },
    { path: '/pest-map', label: 'Pest Map', icon: 'fa-map' },
    { path: '/market', label: 'Market', icon: 'fa-chart-line' },
    { path: '/ai-advisor', label: 'AI Chat', icon: 'fa-robot' },
    { path: '/community', label: 'Community', icon: 'fa-users' },
    { path: '/reports', label: 'Reports', icon: 'fa-file-alt' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-harvest shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <i className="fas fa-seedling text-3xl text-white"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Akwana</h1>
                <p className="text-xs text-white/80">AI for Every Farmer</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                    className={location.pathname === item.path ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
                  >
                    <i className={`fas ${item.icon} mr-2`}></i>
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    <i className="fas fa-globe mr-2"></i>
                    {language.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('lg')}>
                    Luganda
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('sw')}>
                    Swahili
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <i className="fas fa-user-circle text-xl"></i>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-xl z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                size="sm"
                className={location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'}
              >
                <div className="flex flex-col items-center">
                  <i className={`fas ${item.icon} text-lg`}></i>
                  <span className="text-xs mt-1">{item.label}</span>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;