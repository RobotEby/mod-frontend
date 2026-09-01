import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/mockData';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  const products = wishlistItems
    .map((item) => mockProducts.find((product) => product.id === item.product_id))
    .filter((product): product is (typeof mockProducts)[number] => Boolean(product));

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <Heart className="h-24 w-24 mx-auto text-muted-foreground" />
          <h2 className="text-3xl font-roboto-bold">Sua lista de desejos está vazia</h2>
          <p className="text-muted-foreground">
            Toque no coração de um produto para salvá-lo aqui.
          </p>
          <Button asChild size="lg">
            <Link to="/catalogo">Ver Catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <h1 className="text-4xl font-roboto-bold mb-8">Lista de Desejos</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercent={product.discountPercent}
              isOnSale={product.isOnSale}
              image={product.main_image_url || ''}
              leadTime={product.lead_time || undefined}
              stockQuantity={product.stock_quantity ?? undefined}
              lowStockThreshold={product.low_stock_threshold ?? undefined}
              description={product.description}
            />
          ))}
        </div>

        {products.length < wishlistItems.length && (
          <p className="text-sm text-muted-foreground mt-6">
            {wishlistItems.length - products.length} item(ns) da sua lista não está(ão) mais
            disponível(is) no catálogo.
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
