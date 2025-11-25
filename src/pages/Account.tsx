import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { getMockOrderWithItems } from '@/lib/mockData';
import { mockAuthService } from '@/lib/mockAuth';

const orderStatusMap = {
  pending_payment: { label: 'Aguardando Pagamento', variant: 'secondary' as const },
  sent_to_factory: { label: 'Enviado à Marcenaria', variant: 'default' as const },
  in_production: { label: 'Em Produção', variant: 'default' as const },
  shipped: { label: 'Enviado', variant: 'default' as const },
  delivered: { label: 'Entregue', variant: 'default' as const },
};

const Account = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      await new Promise((resolve) => setTimeout(resolve, 300));
      return getMockOrderWithItems(user.id);
    },
    enabled: !!user,
  });

  const handleLogout = async () => {
    const { error } = await mockAuthService.signOut();
    if (error) {
      toast.error('Erro ao sair');
    } else {
      toast.success('Logout realizado com sucesso');
      navigate('/');
    }
  };

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Minha Conta</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Meus Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Pedido #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Badge variant={orderStatusMap[order.status]?.variant || 'secondary'}>
                          {orderStatusMap[order.status]?.label || order.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {order.order_items?.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded bg-muted">
                              <img
                                src={
                                  item.products?.main_image_url ||
                                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'
                                }
                                alt={item.products?.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{item.products?.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Quantidade: {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold">
                              R$ {Number(item.price_at_purchase).toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-primary">
                          R$ {Number(order.total_amount).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Você ainda não fez nenhum pedido</p>
                <Button onClick={() => navigate('/catalogo')}>Ver Catálogo</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
