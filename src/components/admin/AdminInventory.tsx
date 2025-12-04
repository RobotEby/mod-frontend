import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { InventoryTable } from '@/components/admin/InventoryTable';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function AdminInventory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, sku, stock_quantity, low_stock_threshold, product_status')
        .order('name');
      if (error) throw error;
      return (data || []).map((p) => ({
        ...p,
        status: p.product_status,
      }));
    },
  });

  const updateStockMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const status = quantity === 0 ? 'out_of_stock' : 'active';
      const { error } = await supabase
        .from('products')
        .update({
          stock_quantity: quantity,
          product_status: status,
        })
        .eq('id', productId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inventory'] });
      toast({ title: 'Estoque atualizado!' });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar estoque',
        description: error.message,
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
      <h1 className="text-2xl font-bold text-foreground">Controle de Estoque</h1>
      <InventoryTable products={products || []} onUpdateStock={handleUpdateStock} />
    </div>
  );
}
