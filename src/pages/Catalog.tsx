import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Clock } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { MockProducts } from '@/mock/products';

const FALLBACK_IMAGE_URL = 'https://placehold.co/600x450/e0e0e0/555555?text=Sem+Imagem';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  leadTime?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, leadTime }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(price);
  }, [price]);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      addItem({
        id,
        name,
        price,
        image,
        quantity: 1,
      });

      toast.success(`${name} adicionado ao carrinho!`);
    },
    [addItem, id, name, price, image],
  );

  const handleNavigate = useCallback(() => {
    navigate(`/produto/${id}`);
  }, [navigate, id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNavigate();
      }
    },
    [handleNavigate],
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE_URL;
    e.currentTarget.onerror = null;
  };

  return (
    <Card
      className="group flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none"
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${name}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
        />
      </div>

      <CardContent className="p-4 flex-grow space-y-2">
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {leadTime && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span>Entrega em {leadTime}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-end">
        <p className="text-2xl font-bold text-primary">{formattedPrice}</p>

        <Button size="sm" onClick={handleAddToCart} aria-label={`Adicionar ${name} ao carrinho`}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};

export const Catalog = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Catálogo de Produtos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MockProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.main_image_url}
              leadTime={product.lead_time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
