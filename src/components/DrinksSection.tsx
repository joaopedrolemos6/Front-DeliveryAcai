import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { Drink } from '@/types';
import { fetchDrinks } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface DrinksSectionProps {
  onAddToCart: (drink: Drink, quantity?: number) => void;
}

export const DrinksSection = ({ onAddToCart }: DrinksSectionProps) => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadDrinks = async () => {
      try {
        const drinksData = await fetchDrinks();
        setDrinks(drinksData);
      } catch (error) {
        toast({
          title: "Erro ao carregar bebidas",
          description: "Tente novamente em alguns instantes",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadDrinks();
  }, [toast]);

  const handleAddDrink = (drink: Drink) => {
    onAddToCart(drink);
    toast({
      title: "Bebida adicionada! 🥤",
      description: `${drink.name} foi adicionado ao carrinho`,
    });
  };

  const drinksByCategory = {
    juices: drinks.filter(d => d.category === 'juices'),
    sodas: drinks.filter(d => d.category === 'sodas'),
    waters: drinks.filter(d => d.category === 'waters'),
    hot: drinks.filter(d => d.category === 'hot')
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card h-48 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-20" id="drinks">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">Bebidas Geladas</h2>
        <p className="text-lg text-muted-foreground">Refresque-se com nossas bebidas selecionadas</p>
      </div>

      {Object.entries(drinksByCategory).map(([category, categoryDrinks]) => (
        categoryDrinks.length > 0 && (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              {category === 'juices' && '🧃 Sucos Naturais'}
              {category === 'sodas' && '🥤 Refrigerantes'}
              {category === 'waters' && '💧 Águas'}
              {category === 'hot' && '☕ Bebidas Quentes'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryDrinks.map((drink) => (
                <Card key={drink.id} className="glass overflow-hidden group hover:scale-105 transition-all duration-200">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-1">
                          {drink.name}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {drink.size}
                        </Badge>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          R$ {drink.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleAddDrink(drink)}
                      className="w-full btn-glass group-hover:bg-primary group-hover:text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )
      ))}
    </section>
  );
};