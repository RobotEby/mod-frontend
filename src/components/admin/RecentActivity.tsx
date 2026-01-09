import { ShoppingCart, Package, Truck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Activity {
  id: string;
  type: 'order' | 'shipping' | 'stock' | 'delivered';
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'order',
    title: 'Novo Pedido',
    description: 'Pedido #8A2F recebido - R$ 5.200,00',
    time: 'Há 5 minutos',
  },
  {
    id: '2',
    type: 'shipping',
    title: 'Pedido Enviado',
    description: 'Pedido #7B3E saiu para entrega',
    time: 'Há 15 minutos',
  },
  {
    id: '3',
    type: 'stock',
    title: 'Alerta de Estoque',
    description: 'Mesa de Centro Premium - apenas 3 unidades',
    time: 'Há 1 hora',
  },
  {
    id: '4',
    type: 'delivered',
    title: 'Entrega Confirmada',
    description: 'Pedido #6C4D entregue com sucesso',
    time: 'Há 2 horas',
  },
  {
    id: '5',
    type: 'order',
    title: 'Novo Pedido',
    description: 'Pedido #5D5E recebido - R$ 12.800,00',
    time: 'Há 3 horas',
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'order':
      return { icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-500/10' };
    case 'shipping':
      return { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-500/10' };
    case 'stock':
      return { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' };
    case 'delivered':
      return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' };
    default:
      return { icon: Package, color: 'text-primary', bg: 'bg-primary/10' };
  }
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-[17px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-4">
            {activities.map((activity) => {
              const { icon: Icon, color, bg } = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="relative flex gap-4">
                  <div
                    className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full ${bg}`}
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
