import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ShoppingCart, Package, Clock, AlertTriangle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSelectors';
import { useState } from 'react';
import { mockProducts, mockCategories } from '@/lib/mockData';
import { ReviewForm } from '@/components/ReviewForm';
import { ReviewList } from '@/components/ReviewList';
import { ShippingCalculator } from '@/components/ShippingCalculator';
import { RelatedProducts } from '@/components/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const user = useAppSelector(selectUser);
  const [quantity, setQuantity] = useState(1);
  const [refreshReviews, setRefreshReviews] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const foundProduct = mockProducts.find((p) => p.id === id);
      if (!foundProduct) return null;

      const category = mockCategories.find((c) => c.id === foundProduct.category_id);

      return {
        ...foundProduct,
        categories: category ? { name: category.name } : null,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full" />
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
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={
                  product.main_image_url ||
                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.gallery_images && product.gallery_images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.gallery_images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-80 transition-opacity"
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

          <div className="space-y-6">
            {product.categories && (
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {product.categories.name}
              </p>
            )}

            <h1 className="text-4xl font-bold">{product.name}</h1>

            <p className="text-4xl font-bold text-primary">
              R$ {Number(product.price).toFixed(2).replace('.', ',')}
            </p>

            {product.description && (
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
              {product.dimensions && (
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Dimensões</p>
                    <p className="text-sm text-muted-foreground">{product.dimensions}</p>
                  </div>
                </div>
              )}

              {product.lead_time && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Prazo de Produção</p>
                    <p className="text-sm text-muted-foreground">{product.lead_time}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold">Quantidade:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ShippingCalculator productPrice={Number(product.price)} />
        </div>

        <RelatedProducts currentProductId={product.id} categoryId={product.category_id} />

        <Separator className="my-12" />

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              <TabsTrigger value="write-review">Escrever Avaliação</TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="mt-6">
              <ReviewList productId={id!} key={refreshReviews} />
            </TabsContent>

            <TabsContent value="write-review" className="mt-6">
              {user ? (
                <ReviewForm
                  productId={id!}
                  onSuccess={() => {
                    setRefreshReviews((prev) => prev + 1);
                  }}
                />
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <p className="text-muted-foreground mb-4">
                    Faça login para escrever uma avaliação
                  </p>
                  <Button onClick={() => navigate('/auth')}>Fazer Login</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
