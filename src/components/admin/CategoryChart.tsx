import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCategories, mockProducts } from '@/lib/mockData';

export const CategoryChart = () => {
  const categoryData = mockCategories
    .map((category) => {
      const categoryProducts = mockProducts.filter((p) => p.category_id === category.id);
      const totalRevenue = categoryProducts.reduce(
        (sum, p) => sum + p.price * (Math.floor(Math.random() * 10) + 1),
        0,
      );
      return {
        name: category.name,
        value: totalRevenue,
        count: categoryProducts.length,
      };
    })
    .filter((c) => c.value > 0);

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(142, 76%, 36%)',
    'hsl(221, 83%, 53%)',
    'hsl(24, 95%, 53%)',
    'hsl(262, 83%, 58%)',
    'hsl(340, 82%, 52%)',
    'hsl(47, 96%, 53%)',
  ];

  const formatCurrency = (value: number) => `R$ ${(value / 1000).toFixed(1)}k`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-roboto-semibold">Vendas por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-roboto-medium mb-1">{data.name}</p>
                        <p className="text-sm">
                          Receita:{' '}
                          <span className="font-roboto-semibold">{formatCurrency(data.value)}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{data.count} produto(s)</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconSize={10}
                iconType="circle"
                formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
