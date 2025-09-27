// AçaiPro Types

export interface AcaiBase {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface AcaiSize {
  id: string;
  name: string;
  volume: string;
  multiplier: number; // Price multiplier based on size
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  category: 'fruits' | 'nuts' | 'sweets' | 'extras';
  image: string;
}

export interface Drink {
  id: string;
  name: string;
  price: number;
  category: 'juices' | 'sodas' | 'waters' | 'hot';
  size: string;
  image: string;
}

export interface CartItem {
  id: string;
  type: 'acai' | 'drink';
  acai?: {
    size: AcaiSize;
    base: AcaiBase;
    toppings: Topping[];
  };
  drink?: Drink;
  quantity: number;
  totalPrice: number;
}

export interface Customer {
  name: string;
  phone: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    complement?: string;
    zipCode: string;
  };
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivery' | 'completed';
  createdAt: Date;
  estimatedDelivery: Date;
}