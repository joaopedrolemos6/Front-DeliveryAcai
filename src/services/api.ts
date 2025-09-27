// AçaiPro API Service (Mock Data)

import { AcaiBase, AcaiSize, Topping, Drink, Order } from '@/types';

// Mock Data
export const acaiBases: AcaiBase[] = [
  {
    id: '1',
    name: 'Açaí Tradicional',
    price: 12.00,
    description: 'Açaí puro e cremoso, sabor original da Amazônia',
    image: '/api/placeholder/300/200'
  },
  {
    id: '2',
    name: 'Açaí com Banana',
    price: 14.00,
    description: 'Açaí batido com banana, mais doce e cremoso',
    image: '/api/placeholder/300/200'
  },
  {
    id: '3',
    name: 'Açaí com Guaraná',
    price: 15.00,
    description: 'Açaí energizado com guaraná natural',
    image: '/api/placeholder/300/200'
  }
];

export const acaiSizes: AcaiSize[] = [
  {
    id: 'p',
    name: 'Pequeno',
    volume: '300ml',
    multiplier: 1
  },
  {
    id: 'm',
    name: 'Médio',
    volume: '500ml',
    multiplier: 1.5
  },
  {
    id: 'g',
    name: 'Grande',
    volume: '700ml',
    multiplier: 2
  }
];

export const toppings: Topping[] = [
  // Fruits
  {
    id: '1',
    name: 'Banana',
    price: 2.00,
    category: 'fruits',
    image: '/api/placeholder/100/100'
  },
  {
    id: '2',
    name: 'Morango',
    price: 3.00,
    category: 'fruits',
    image: '/api/placeholder/100/100'
  },
  {
    id: '3',
    name: 'Kiwi',
    price: 3.50,
    category: 'fruits',
    image: '/api/placeholder/100/100'
  },
  {
    id: '4',
    name: 'Manga',
    price: 2.50,
    category: 'fruits',
    image: '/api/placeholder/100/100'
  },
  // Nuts
  {
    id: '5',
    name: 'Granola',
    price: 2.50,
    category: 'nuts',
    image: '/api/placeholder/100/100'
  },
  {
    id: '6',
    name: 'Castanha',
    price: 4.00,
    category: 'nuts',
    image: '/api/placeholder/100/100'
  },
  {
    id: '7',
    name: 'Amendoim',
    price: 2.00,
    category: 'nuts',
    image: '/api/placeholder/100/100'
  },
  // Sweets
  {
    id: '8',
    name: 'Leite Condensado',
    price: 2.50,
    category: 'sweets',
    image: '/api/placeholder/100/100'
  },
  {
    id: '9',
    name: 'Chocolate',
    price: 3.00,
    category: 'sweets',
    image: '/api/placeholder/100/100'
  },
  {
    id: '10',
    name: 'Mel',
    price: 2.00,
    category: 'sweets',
    image: '/api/placeholder/100/100'
  }
];

export const drinks: Drink[] = [
  // Juices
  {
    id: '1',
    name: 'Suco de Laranja',
    price: 8.00,
    category: 'juices',
    size: '500ml',
    image: '/api/placeholder/150/150'
  },
  {
    id: '2',
    name: 'Suco de Acerola',
    price: 8.50,
    category: 'juices',
    size: '500ml',
    image: '/api/placeholder/150/150'
  },
  {
    id: '3',
    name: 'Suco de Maracujá',
    price: 9.00,
    category: 'juices',
    size: '500ml',
    image: '/api/placeholder/150/150'
  },
  // Sodas
  {
    id: '4',
    name: 'Refrigerante Cola',
    price: 5.00,
    category: 'sodas',
    size: '350ml',
    image: '/api/placeholder/150/150'
  },
  {
    id: '5',
    name: 'Refrigerante Guaraná',
    price: 5.00,
    category: 'sodas',
    size: '350ml',
    image: '/api/placeholder/150/150'
  },
  // Waters
  {
    id: '6',
    name: 'Água Mineral',
    price: 3.00,
    category: 'waters',
    size: '500ml',
    image: '/api/placeholder/150/150'
  },
  {
    id: '7',
    name: 'Água de Coco',
    price: 6.00,
    category: 'waters',
    size: '300ml',
    image: '/api/placeholder/150/150'
  }
];

// API Functions
export const fetchAcaiBases = async (): Promise<AcaiBase[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return acaiBases;
};

export const fetchAcaiSizes = async (): Promise<AcaiSize[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return acaiSizes;
};

export const fetchToppings = async (): Promise<Topping[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return toppings;
};

export const fetchDrinks = async (): Promise<Drink[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return drinks;
};

export const submitOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'estimatedDelivery'>): Promise<Order> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newOrder: Order = {
    ...order,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    status: 'confirmed'
  };

  return newOrder;
};