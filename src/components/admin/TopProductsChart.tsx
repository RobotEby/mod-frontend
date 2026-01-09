import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts } from '@/lib/mockData';

export const TopProductsChart = () => {
  const topProducts = mockProducts
    .slice(0, 6)
    .map((product) => ({
      name: product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name,
      fullName: product.name,
      sold: Math.floor(Math.random() * 50) + 10,
      revenue: product.price * (Math.floor(Math.random() * 50) + 10),
    }))
    .sort((a, b) => b.sold - a.sold);

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--primary) / 0.8)',
    'hsl(var(--primary) / 0.6)',
    'hsl(var(--primary) / 0.4)',
    'hsl(var(--primary) / 0.3)',
    'hsl(var(--primary) / 0.2)',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Produtos Mais Vendidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                horizontal={true}
                vertical={false}
              />
              <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={130}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-1">{data.fullName}</p>
                        <p className="text-sm">
                          Vendidos: <span className="font-semibold">{data.sold}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Receita: R${' '}
                          {data.revenue.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="sold" radius={[0, 4, 4, 0]}>
                {topProducts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
