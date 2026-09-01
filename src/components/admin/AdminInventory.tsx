import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { InventoryTable } from '@/components/admin/InventoryTable';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import apiClient from '@/lib/api-client';
import { getErrorMessage } from '@/lib/errors';

interface ProductInventory {
  id: string;
  name: string;
  sku: string;
  stock_quantity: number;
  low_stock_threshold: number;
  product_status: string;
  status: string; // Campo calculado no front ou back
}

export default function AdminInventory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-inventory'],
    queryFn: async () => {
      const { data } = await apiClient.get<ProductInventory[]>('/products');

      return (data || []).map((p) => ({
        ...p,
        status: p.product_status,
      }));
    },
  });

  const updateStockMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const status = quantity === 0 ? 'out_of_stock' : 'active';

      await apiClient.patch(`/products/${productId}`, {
        stock_quantity: quantity,
        product_status: status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inventory'] });
      toast({ title: 'Estoque atualizado!' });
    },
    onError: (error: unknown) => {
      toast({
        title: 'Erro ao atualizar estoque',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    },
  });

  const handleUpdateStock = (productId: string, quantity: number) => {
    updateStockMutation.mutate({ productId, quantity });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-roboto-bold text-foreground">Controle de Estoque</h1>
      <InventoryTable products={products || []} onUpdateStock={handleUpdateStock} />
    </div>
  );
}
