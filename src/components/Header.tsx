import { ShoppingCart, Sun, Moon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import acaiLogo from '@/assets/acai-logo.png';

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
}

export const Header = ({ cartItems, onCartClick }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="glass-card fixed top-6 left-6 right-6 z-50 mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow overflow-hidden">
              <img src={acaiLogo} alt="AçaiPro" className="w-8 h-8 object-contain" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-vibrant animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-medium text-foreground">AçaiPro</h1>
            <p className="text-sm text-muted-foreground font-inter">Açaíteria Artesanal</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-2xl w-12 h-12 hover:bg-primary/10"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            onClick={onCartClick}
            className="relative rounded-2xl px-4 h-12 hover:bg-primary/10"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-primary border-0 text-white shadow-glow"
              >
                {cartItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};