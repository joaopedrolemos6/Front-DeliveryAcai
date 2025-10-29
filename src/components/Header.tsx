import { ShoppingCart, Sun, Moon, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import acaiLogo from '@/assets/acai-logo.png';

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
}

export const Header = ({ cartItems, onCartClick }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="glass-card mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-primary flex items-center justify-center overflow-hidden">
              <img src={acaiLogo} alt="AçaiPro" className="w-7 h-7 object-contain" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-display font-semibold text-foreground tracking-tight">AçaiPro</h1>
            <p className="text-xs text-muted-foreground">Açaíteria Artesanal</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin')}
            className="rounded-xl w-10 h-10 hover:bg-primary/10 transition-all"
            title="Admin"
          >
            <Shield className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl w-10 h-10 hover:bg-primary/10 transition-all"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            variant="ghost"
            onClick={onCartClick}
            className="relative rounded-xl px-3 h-10 hover:bg-primary/10 transition-all"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartItems > 0 && (
              <Badge 
                className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-primary border-0 text-white"
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