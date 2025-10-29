import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, MapPin, Phone, Home } from 'lucide-react';
import { Order } from '@/types';

interface OrderConfirmationProps {
  order: Order;
  onNewOrder: () => void;
}

export const OrderConfirmation = ({ order, onNewOrder }: OrderConfirmationProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <section className="container mx-auto px-4 py-20 max-w-2xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Pedido Confirmado!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-2">
          Seu açaí está sendo preparado com carinho
        </p>
        
        <div className="glass rounded-xl p-4 inline-block">
          <p className="text-sm text-muted-foreground">Número do pedido</p>
          <p className="text-2xl font-bold text-primary">#{order.id}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Delivery Info */}
        <Card className="glass p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Previsão de Entrega</h3>
          </div>
          
          <div className="text-center p-4 bg-primary/10 rounded-xl">
            <p className="text-3xl font-bold text-primary mb-2">
              {formatTime(order.estimatedDelivery)}
            </p>
            <p className="text-sm text-muted-foreground">
              Estimativa de chegada (45 minutos)
            </p>
          </div>
        </Card>

        {/* Customer Info */}
        <Card className="glass p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Dados da Entrega</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">{order.customer.name}</p>
                <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Home className="w-4 h-4 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-foreground">
                  {order.customer.address.street}, {order.customer.address.number}
                </p>
                <p className="text-sm text-foreground">
                  {order.customer.address.neighborhood}
                </p>
                {order.customer.address.complement && (
                  <p className="text-sm text-muted-foreground">
                    {order.customer.address.complement}
                  </p>
                )}
                {order.customer.address.zipCode && (
                  <p className="text-sm text-muted-foreground">
                    CEP: {order.customer.address.zipCode}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="glass p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Itens do Pedido</h3>
          
          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  {item.type === 'acai' ? (
                    <div>
                      <p className="font-medium text-foreground">
                        {item.acai!.base.name} - {item.acai!.size.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.acai!.size.volume}
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
                    <div>
                      <p className="font-medium text-foreground">
                        {item.drink!.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.drink!.size}
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Quantidade: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-foreground">
                  R$ {item.totalPrice.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <Separator />
          
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">R$ {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxa de entrega</span>
              <span className="text-foreground">R$ {order.deliveryFee.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Status */}
        <Card className="glass p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Status do Pedido</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-foreground">Pedido confirmado</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {formatTime(order.createdAt)}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-foreground">Preparando seu açaí</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-muted" />
              <span className="text-muted-foreground">Saiu para entrega</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-muted" />
              <span className="text-muted-foreground">Entregue</span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={onNewOrder} className="w-full btn-primary" size="lg">
            Fazer Novo Pedido
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Dúvidas? Entre em contato: 
              <a href="tel:+5511999999999" className="text-primary hover:underline ml-1">
                (11) 99999-9999
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};