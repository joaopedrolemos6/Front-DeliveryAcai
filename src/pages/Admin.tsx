import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LogOut, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Check,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const ADMIN_PASSWORD = 'admin123';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if already authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      toast({
        title: 'Login realizado!',
        description: 'Bem-vindo ao painel administrativo',
      });
    } else {
      toast({
        title: 'Senha incorreta',
        description: 'Tente novamente',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    navigate('/');
    toast({
      title: 'Logout realizado',
      description: 'Até logo!',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass-card w-full max-w-md">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="heading-large text-foreground mb-2">Painel Admin</h1>
              <p className="text-muted-foreground">Entre com suas credenciais</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  className="mt-2"
                />
              </div>
              
              <Button type="submit" className="btn-primary w-full">
                Entrar
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full"
              >
                Voltar
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display font-semibold text-foreground">
              Painel Administrativo
            </h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="glass">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="pricing">Preços</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>

          {/* Products */}
          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>

          {/* Users */}
          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing">
            <PricingTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab() {
  const stats = [
    { 
      label: 'Pedidos Hoje', 
      value: '24', 
      change: '+12%', 
      icon: ShoppingBag,
      color: 'text-primary'
    },
    { 
      label: 'Receita Hoje', 
      value: 'R$ 1.280,00', 
      change: '+8%', 
      icon: DollarSign,
      color: 'text-green-600'
    },
    { 
      label: 'Produtos', 
      value: '48', 
      change: '+3', 
      icon: Package,
      color: 'text-blue-600'
    },
    { 
      label: 'Clientes', 
      value: '156', 
      change: '+22', 
      icon: Users,
      color: 'text-purple-600'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <Badge variant="secondary" className="bg-accent/20">
                  {stat.change}
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="glass">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Pedidos Recentes
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Pedido #{1000 + i}</p>
                  <p className="text-sm text-muted-foreground">Cliente {i}</p>
                </div>
                <Badge className="bg-gradient-primary text-white border-0">
                  R$ {(Math.random() * 100 + 20).toFixed(2)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// Orders Tab Component
function OrdersTab() {
  const mockOrders = [
    { id: 1001, customer: 'João Silva', items: 2, total: 45.90, status: 'preparing' },
    { id: 1002, customer: 'Maria Santos', items: 1, total: 28.50, status: 'delivery' },
    { id: 1003, customer: 'Pedro Costa', items: 3, total: 67.20, status: 'pending' },
    { id: 1004, customer: 'Ana Lima', items: 2, total: 52.00, status: 'completed' },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pendente', className: 'bg-yellow-500/20 text-yellow-600' },
      preparing: { label: 'Preparando', className: 'bg-blue-500/20 text-blue-600' },
      delivery: { label: 'Entregando', className: 'bg-purple-500/20 text-purple-600' },
      completed: { label: 'Concluído', className: 'bg-green-500/20 text-green-600' },
    };
    return variants[status] || variants.pending;
  };

  return (
    <Card className="glass">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Gerenciar Pedidos</h2>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => {
              const statusInfo = getStatusBadge(order.status);
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={statusInfo.className}>
                      {statusInfo.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

// Products Tab Component
function ProductsTab() {
  const [products] = useState([
    { id: 1, name: 'Açaí Tradicional', category: 'base', price: 12.00, stock: 'unlimited' },
    { id: 2, name: 'Açaí com Banana', category: 'base', price: 14.00, stock: 'unlimited' },
    { id: 3, name: 'Morango', category: 'topping', price: 3.00, stock: 'unlimited' },
    { id: 4, name: 'Granola', category: 'topping', price: 2.50, stock: 'unlimited' },
    { id: 5, name: 'Suco de Laranja', category: 'drink', price: 8.00, stock: 'unlimited' },
  ]);

  return (
    <Card className="glass">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Gerenciar Produtos</h2>
          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Produto
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">#{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className="bg-green-500/20 text-green-600">
                    {product.stock}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

// Users Tab Component
function UsersTab() {
  const mockUsers = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', orders: 12, total: 456.80 },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', orders: 8, total: 324.50 },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', orders: 15, total: 678.90 },
    { id: 4, name: 'Ana Lima', email: 'ana@email.com', orders: 5, total: 189.40 },
  ];

  return (
    <Card className="glass">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Gerenciar Usuários</h2>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead>Total Gasto</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">#{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.orders}</TableCell>
                <TableCell>R$ {user.total.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

// Pricing Tab Component
function PricingTab() {
  const pricingItems = [
    { id: 1, item: 'Açaí Pequeno (300ml)', price: 12.00, multiplier: 1.0 },
    { id: 2, item: 'Açaí Médio (500ml)', price: 18.00, multiplier: 1.5 },
    { id: 3, item: 'Açaí Grande (700ml)', price: 24.00, multiplier: 2.0 },
    { id: 4, item: 'Taxa de Entrega', price: 5.00, multiplier: null },
  ];

  return (
    <Card className="glass">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Configurar Preços</h2>
        </div>
        
        <div className="space-y-6">
          {pricingItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{item.item}</h3>
                {item.multiplier && (
                  <p className="text-sm text-muted-foreground">
                    Multiplicador: {item.multiplier}x
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  step="0.01"
                  defaultValue={item.price.toFixed(2)}
                  className="w-32"
                />
                <Button size="sm" className="btn-primary">
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-accent/10 rounded-lg">
          <h3 className="font-medium text-foreground mb-2">Dica</h3>
          <p className="text-sm text-muted-foreground">
            As alterações de preço afetarão apenas novos pedidos. Pedidos existentes manterão os preços originais.
          </p>
        </div>
      </div>
    </Card>
  );
}