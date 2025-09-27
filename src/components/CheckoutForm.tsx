import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, CreditCard, Clock } from 'lucide-react';
import { CartItem, Customer, Order } from '@/types';
import { submitOrder } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface CheckoutFormProps {
  items: CartItem[];
  subtotal: number;
  onBack: () => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutForm = ({ items, subtotal, onBack, onOrderComplete }: CheckoutFormProps) => {
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    address: {
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
      zipCode: ''
    }
  });
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customer.name || !customer.phone || !customer.address.street || !customer.address.number || !customer.address.neighborhood) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const orderData = {
        customer,
        items,
        subtotal,
        deliveryFee,
        total,
        status: 'pending' as const
      };

      const order = await submitOrder(orderData);
      onOrderComplete(order);
      
      toast({
        title: "Pedido realizado com sucesso! 🎉",
        description: "Seu açaí está sendo preparado e chegará em breve",
      });
    } catch (error) {
      toast({
        title: "Erro ao finalizar pedido",
        description: "Tente novamente em alguns instantes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-3xl font-bold text-foreground">Finalizar Pedido</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <Card className="glass p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Dados de Entrega</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    value={customer.name}
                    onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="street">Rua *</Label>
                  <Input
                    id="street"
                    value={customer.address.street}
                    onChange={(e) => setCustomer(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, street: e.target.value }
                    }))}
                    placeholder="Nome da rua"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="number">Número *</Label>
                  <Input
                    id="number"
                    value={customer.address.number}
                    onChange={(e) => setCustomer(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, number: e.target.value }
                    }))}
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input
                    id="neighborhood"
                    value={customer.address.neighborhood}
                    onChange={(e) => setCustomer(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, neighborhood: e.target.value }
                    }))}
                    placeholder="Nome do bairro"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={customer.address.zipCode}
                    onChange={(e) => setCustomer(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, zipCode: e.target.value }
                    }))}
                    placeholder="00000-000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Textarea
                  id="complement"
                  value={customer.address.complement}
                  onChange={(e) => setCustomer(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, complement: e.target.value }
                  }))}
                  placeholder="Apartamento, bloco, ponto de referência..."
                  rows={2}
                />
              </div>
            </form>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Pagamento</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border border-primary rounded-xl bg-primary/5">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span className="text-foreground font-medium">Dinheiro na entrega</span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Pagamento será realizado diretamente com o entregador
              </p>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Resumo do Pedido</h3>
            
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    {item.type === 'acai' ? (
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {item.acai!.base.name} - {item.acai!.size.name}
                        </p>
                        {item.acai!.toppings.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.acai!.toppings.map((topping) => (
                              <Badge key={topping.id} variant="secondary" className="text-xs">
                                {topping.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="font-medium text-foreground text-sm">
                        {item.drink!.name}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-foreground text-sm">
                    R$ {item.totalPrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <Separator />
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entrega</span>
                <span className="text-foreground">R$ {deliveryFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Tempo de Entrega</h3>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">45 minutos</p>
            <p className="text-sm text-muted-foreground">
              Entregas de segunda a domingo, das 10h às 22h
            </p>
          </Card>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full btn-primary"
            size="lg"
          >
            {loading ? 'Processando...' : `Confirmar Pedido - R$ ${total.toFixed(2)}`}
          </Button>
        </div>
      </div>
    </section>
  );
};