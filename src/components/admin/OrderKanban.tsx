import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Package, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

type OrderStatus =
  | 'pending_payment'
  | 'sent_to_factory'
  | 'in_production'
  | 'shipped'
  | 'delivered';

interface Order {
  id: string;
  customer_name: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  items_count: number;
}

interface OrderKanbanProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const columns: { status: OrderStatus; title: string; color: string }[] = [
  { status: 'pending_payment', title: 'Aguardando Pagamento', color: 'bg-amber-500' },
  { status: 'sent_to_factory', title: 'Enviado à Fábrica', color: 'bg-blue-500' },
  { status: 'in_production', title: 'Em Produção', color: 'bg-purple-500' },
  { status: 'shipped', title: 'Enviado', color: 'bg-cyan-500' },
  { status: 'delivered', title: 'Entregue', color: 'bg-emerald-500' },
];

const getNextStatus = (current: OrderStatus): OrderStatus | null => {
  const index = columns.findIndex((c) => c.status === current);
  if (index < columns.length - 1) {
    return columns[index + 1].status;
  }
  return null;
};

export const OrderKanban = ({ orders, onStatusChange }: OrderKanbanProps) => {
  const [dragging, setDragging] = useState<string | null>(null);

  const handleDragStart = (orderId: string) => {
    setDragging(orderId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: OrderStatus) => {
    if (dragging) {
      onStatusChange(dragging, status);
      setDragging(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnOrders = orders.filter((o) => o.status === column.status);

        return (
          <div
            key={column.status}
            className="flex-shrink-0 w-72"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.status)}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className={cn('w-3 h-3 rounded-full', column.color)} />
              <h3 className="font-roboto-medium text-foreground">{column.title}</h3>
              <Badge variant="secondary" className="ml-auto">
                {columnOrders.length}
              </Badge>
            </div>

            <div className="space-y-3 min-h-[400px] p-2 bg-muted/30 rounded-lg">
              {columnOrders.map((order) => {
                const nextStatus = getNextStatus(order.status);

                return (
                  <Card
                    key={order.id}
                    draggable
                    onDragStart={() => handleDragStart(order.id)}
                    className={cn(
                      'cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow',
                      dragging === order.id && 'opacity-50',
                    )}
                  >
                    <CardHeader className="p-3 pb-2">
                      <CardTitle className="text-sm font-roboto-medium flex items-center justify-between">
                        <span className="text-muted-foreground">#{order.id.slice(0, 8)}</span>
                        <span className="font-roboto-bold text-foreground">
                          R${' '}
                          {order.total_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                        <span className="truncate">{order.customer_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="h-3.5 w-3.5" />
                        <span>{order.items_count} item(s)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(order.created_at)}</span>
                      </div>

                      {nextStatus && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => onStatusChange(order.id, nextStatus)}
                        >
                          Avançar
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}

              {columnOrders.length === 0 && (
                <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                  Nenhum pedido
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
