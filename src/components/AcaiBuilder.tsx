import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { AcaiBase, AcaiSize, Topping } from '@/types';
import { fetchAcaiBases, fetchAcaiSizes, fetchToppings } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface AcaiBuilderProps {
  onAddToCart: (size: AcaiSize, base: AcaiBase, toppings: Topping[]) => void;
}

export const AcaiBuilder = ({ onAddToCart }: AcaiBuilderProps) => {
  const [bases, setBases] = useState<AcaiBase[]>([]);
  const [sizes, setSizes] = useState<AcaiSize[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<AcaiSize | null>(null);
  const [selectedBase, setSelectedBase] = useState<AcaiBase | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [basesData, sizesData, toppingsData] = await Promise.all([
          fetchAcaiBases(),
          fetchAcaiSizes(),
          fetchToppings()
        ]);
        
        setBases(basesData);
        setSizes(sizesData);
        setToppings(toppingsData);
        
        // Auto-select defaults
        if (sizesData.length > 0) setSelectedSize(sizesData[1]); // Medium
        if (basesData.length > 0) setSelectedBase(basesData[0]); // First base
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Tente novamente em alguns instantes",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings(prev => {
      const exists = prev.find(t => t.id === topping.id);
      if (exists) {
        return prev.filter(t => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const calculateTotal = () => {
    if (!selectedSize || !selectedBase) return 0;
    
    const basePrice = selectedBase.price * selectedSize.multiplier;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    return basePrice + toppingsPrice;
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedBase) {
      toast({
        title: "Seleção incompleta",
        description: "Selecione um tamanho e uma base para continuar",
        variant: "destructive"
      });
      return;
    }

    onAddToCart(selectedSize, selectedBase, selectedToppings);
    
    toast({
      title: "Açaí adicionado! 🍇",
      description: `${selectedBase.name} ${selectedSize.name} foi adicionado ao carrinho`,
    });

    // Reset selections for next açaí
    setSelectedToppings([]);
  };

  const toppingsByCategory = {
    fruits: toppings.filter(t => t.category === 'fruits'),
    nuts: toppings.filter(t => t.category === 'nuts'),
    sweets: toppings.filter(t => t.category === 'sweets'),
    extras: toppings.filter(t => t.category === 'extras')
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
    <section className="container mx-auto px-4 py-20" id="build-acai">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">Monte Seu Açaí</h2>
        <p className="text-lg text-muted-foreground">Escolha o tamanho, base e coberturas do seu açaí perfeito</p>
      </div>

      {/* Size Selection */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-foreground mb-4">1. Escolha o Tamanho</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sizes.map((size) => (
            <Card 
              key={size.id}
              className={`glass cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedSize?.id === size.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedSize(size)}
            >
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold text-foreground">{size.name}</h4>
                <p className="text-muted-foreground">{size.volume}</p>
                <Badge variant="secondary" className="mt-2">
                  {size.multiplier}x preço
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Base Selection */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-foreground mb-4">2. Escolha a Base</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bases.map((base) => (
            <Card 
              key={base.id}
              className={`glass cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedBase?.id === base.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedBase(base)}
            >
              <div className="p-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">{base.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{base.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">R$ {base.price.toFixed(2)}</Badge>
                  {selectedSize && (
                    <Badge variant="secondary">
                      R$ {(base.price * selectedSize.multiplier).toFixed(2)}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Toppings Selection */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-foreground mb-4">3. Adicione Coberturas</h3>
        
        {Object.entries(toppingsByCategory).map(([category, categoryToppings]) => (
          categoryToppings.length > 0 && (
            <div key={category} className="mb-6">
              <h4 className="text-lg font-medium text-foreground mb-3 capitalize">
                {category === 'fruits' && '🍓 Frutas'}
                {category === 'nuts' && '🥜 Castanhas e Granolas'}
                {category === 'sweets' && '🍯 Doces'}
                {category === 'extras' && '✨ Extras'}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {categoryToppings.map((topping) => {
                  const isSelected = selectedToppings.some(t => t.id === topping.id);
                  return (
                    <Card 
                      key={topping.id}
                      className={`glass cursor-pointer transition-all duration-200 hover:scale-105 ${
                        isSelected ? 'ring-2 ring-primary bg-primary/10' : ''
                      }`}
                      onClick={() => toggleTopping(topping)}
                    >
                      <div className="p-4 text-center">
                        <div className="relative">
                          <h5 className="font-medium text-foreground text-sm">{topping.name}</h5>
                          <p className="text-xs text-muted-foreground">+R$ {topping.price.toFixed(2)}</p>
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Plus className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Summary and Add to Cart */}
      <div className="glass-card sticky bottom-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-foreground">Seu Açaí</h4>
            {selectedBase && selectedSize && (
              <p className="text-sm text-muted-foreground">
                {selectedBase.name} {selectedSize.name}
                {selectedToppings.length > 0 && ` + ${selectedToppings.length} coberturas`}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                R$ {calculateTotal().toFixed(2)}
              </p>
              {selectedToppings.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Base: R$ {selectedBase && selectedSize ? (selectedBase.price * selectedSize.multiplier).toFixed(2) : '0.00'} + 
                  Coberturas: R$ {selectedToppings.reduce((sum, t) => sum + t.price, 0).toFixed(2)}
                </p>
              )}
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="btn-primary px-6"
              disabled={!selectedSize || !selectedBase}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};