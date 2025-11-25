import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ShoppingCart, Package, Clock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { MockProducts } from '@/mock/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const foundProduct = MockProducts.find((p) => p.id === id);

      return foundProduct || null;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <Button onClick={() => navigate('/catalogo')}>Voltar ao Catálogo</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.main_image_url || '',
      quantity,
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 hover:bg-muted/50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted shadow-sm">
              <img
                src={
                  product.main_image_url ||
                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
                }
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {product.gallery_images && product.gallery_images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.gallery_images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-80 transition-opacity ring-offset-background hover:ring-2 ring-primary"
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              {product.categories && (
                <p className="text-sm text-primary font-medium uppercase tracking-wide mb-2">
                  {product.categories.name}
                </p>
              )}

              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              <p className="text-3xl font-light text-foreground">
                R$ {Number(product.price).toFixed(2).replace('.', ',')}
              </p>
            </div>

            {product.description && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-muted/30 rounded-xl border border-border/50">
              {product.dimensions && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-background rounded-md shadow-sm">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Dimensões</p>
                    <p className="text-sm text-muted-foreground">{product.dimensions}</p>
                  </div>
                </div>
              )}

              {product.lead_time && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-background rounded-md shadow-sm">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Prazo de Produção</p>
                    <p className="text-sm text-muted-foreground">{product.lead_time}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantidade</label>
                  <div className="flex items-center border rounded-md bg-background">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="flex-1 h-12 text-lg shadow-md hover:shadow-lg transition-all"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
