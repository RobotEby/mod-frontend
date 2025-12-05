import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSelectors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { createMockOrder } from '@/lib/mockData';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const orderItems = items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      createMockOrder(user.id, total, address, phone, orderItems);

      toast.success('Pedido realizado com sucesso!');
      clearCart();
      navigate('/minha-conta');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao processar pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Rua, número, bairro, cidade, estado, CEP"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Processando...' : 'Confirmar Pedido'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
