import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  leadTime?: string;
}

export const ProductCard = ({ id, name, price, image, leadTime }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, image });
  };

  return (
    <Link to={`/produto/${id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
          <p className="text-2xl font-bold text-primary">
            R$ {price.toFixed(2).replace(".", ",")}
          </p>
          {leadTime && (
            <p className="text-sm text-muted-foreground mt-1">
              Prazo: {leadTime}
            </p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            variant="default"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};