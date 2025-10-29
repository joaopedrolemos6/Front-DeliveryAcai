import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AcaiBuilder } from '@/components/AcaiBuilder';
import { DrinksSection } from '@/components/DrinksSection';
import { CartSidebar } from '@/components/CartSidebar';
import { CheckoutForm } from '@/components/CheckoutForm';
import { OrderConfirmation } from '@/components/OrderConfirmation';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { Order } from '@/types';

type AppState = 'home' | 'building' | 'checkout' | 'confirmed';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const {
    items,
    addAcaiToCart,
    addDrinkToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal
  } = useCart();

  const handleStartOrder = () => {
    setAppState('building');
    // Smooth scroll to acai builder
    setTimeout(() => {
      document.getElementById('build-acai')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setAppState('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (order: Order) => {
    setConfirmedOrder(order);
    setAppState('confirmed');
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewOrder = () => {
    setAppState('home');
    setConfirmedOrder(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBuilding = () => {
    setAppState('building');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Always visible */}
      <div className="p-4">
        <Header 
          cartItems={totalItems} 
          onCartClick={() => setIsCartOpen(true)} 
        />
      </div>

      {/* Main Content */}
      <main>
        {appState === 'home' && (
          <>
            <HeroSection onStartOrder={handleStartOrder} />
            <FAQ />
          </>
        )}

        {appState === 'building' && (
          <>
            <AcaiBuilder onAddToCart={addAcaiToCart} />
            <DrinksSection onAddToCart={addDrinkToCart} />
            <FAQ />
          </>
        )}

        {appState === 'checkout' && (
          <CheckoutForm
            items={items}
            subtotal={subtotal}
            onBack={handleBackToBuilding}
            onOrderComplete={handleOrderComplete}
          />
        )}

        {appState === 'confirmed' && confirmedOrder && (
          <OrderConfirmation
            order={confirmedOrder}
            onNewOrder={handleNewOrder}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
        subtotal={subtotal}
      />
    </div>
  );
};

export default Index;
