import { useQuery } from '@tanstack/react-query';
import { DollarSign, Package, ShoppingCart, AlertTriangle } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { Skeleton } from '@/components/ui/skeleton';
import apiClient from '@/lib/api-client';
import { SalesTrendsChart } from '@/components/admin/SalesTrendsChart';
import { TopProductsChart } from '@/components/admin/TopProductsChart';
import { CategoryChart } from '@/components/admin/CategoryChart';
import { InventoryAlerts } from '@/components/admin/InventoryAlerts';
import { RecentActivity } from '@/components/admin/RecentActivity';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [productsRes, ordersRes, lowStockRes] = await Promise.all([
        apiClient.get<{ count: number }>('/products/count'),

        apiClient.get<{ id: string; total_amount: number; status: string }[]>('/orders'),

        apiClient.get<{ id: string }[]>('/products', { params: { low_stock: true } }),
      ]);

      const totalRevenue =
        ordersRes.data
          ?.filter((o) => o.status === 'delivered')
          .reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;

      return {
        totalProducts: productsRes.data.count || 0,
        totalOrders: ordersRes.data?.length || 0,
        totalRevenue,
        lowStockCount: lowStockRes.data?.length || 0,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-roboto-bold text-foreground">Dashboard</h1>
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
        <h1 className="text-2xl font-roboto-bold text-foreground">Dashboard</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesTrendsChart />
        <TopProductsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CategoryChart />
        <InventoryAlerts />
        <RecentActivity />
      </div>
    </div>
  );
}
