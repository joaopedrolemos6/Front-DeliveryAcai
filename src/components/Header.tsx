import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

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
    <header className="glass-card fixed top-4 left-4 right-4 z-50 mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AçaiPro</h1>
            <p className="text-xs text-muted-foreground">Açaíteria Digital</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            onClick={onCartClick}
            className="relative rounded-xl px-3"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
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