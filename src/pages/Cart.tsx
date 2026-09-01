import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSelectors';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
          <h2 className="text-3xl font-roboto-bold">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground">Adicione produtos para começar suas compras</p>
          <Button asChild size="lg">
            <Link to="/catalogo">Ver Catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-roboto-bold mb-8">Carrinho de Compras</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={
                        item.image ||
                        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="font-roboto-semibold text-lg">{item.name}</h3>
                    <p className="text-2xl font-roboto-bold text-primary">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-roboto-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                    <p className="text-xl font-roboto-bold">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-roboto-semibold">Subtotal</span>
              <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center text-2xl font-roboto-bold">
              <span>Total</span>
              <span className="text-primary">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
            </div>
            <Button size="lg" className="w-full" onClick={handleCheckout}>
              Finalizar Compra
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
