import { useQuery } from '@tanstack/react-query';
import { DollarSign, Package, ShoppingCart, AlertTriangle } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [productsRes, ordersRes, lowStockRes] = await Promise.all([
        supabase.from('products').select('id, price', { count: 'exact' }),
        supabase.from('orders').select('id, total_amount, status', { count: 'exact' }),
        supabase.from('products').select('id').lt('stock_quantity', 5),
      ]);

      const totalRevenue =
        ordersRes.data
          ?.filter((o) => o.status === 'delivered')
          .reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;

      return {
        totalProducts: productsRes.count || 0,
        totalOrders: ordersRes.count || 0,
        totalRevenue,
        lowStockCount: lowStockRes.data?.length || 0,
        recentOrders: ordersRes.data?.slice(0, 5) || [],
      };
    },
  });

  const { data: recentOrders } = useQuery({
    queryKey: ['admin-recent-orders'],
    queryFn: async () => {
      const { data } = await supabase
        .from('orders')
        .select('id, total_amount, status, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  const getStatusLabel = (status: string) => {
    const labels: Record<
      string,
      { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
    > = {
      pending_payment: { label: 'Aguardando', variant: 'outline' },
      sent_to_factory: { label: 'Na Fábrica', variant: 'secondary' },
      in_production: { label: 'Produção', variant: 'default' },
      shipped: { label: 'Enviado', variant: 'default' },
      delivered: { label: 'Entregue', variant: 'default' },
    };
    return labels[status] || { label: status, variant: 'outline' as const };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Receita Total"
          value={`R$ ${(stats?.totalRevenue || 0).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}`}
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total de Pedidos"
          value={stats?.totalOrders || 0}
          icon={ShoppingCart}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard title="Produtos Cadastrados" value={stats?.totalProducts || 0} icon={Package} />
        <StatsCard
          title="Baixo Estoque"
          value={stats?.lowStockCount || 0}
          icon={AlertTriangle}
          className={stats?.lowStockCount ? 'border-amber-500/50' : ''}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders && recentOrders.length > 0 ? (
              recentOrders.map((order) => {
                const statusInfo = getStatusLabel(order.status);
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">Pedido #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      <span className="font-bold text-foreground">
                        R${' '}
                        {Number(order.total_amount).toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-muted-foreground py-8">Nenhum pedido encontrado</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
