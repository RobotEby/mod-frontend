import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ShoppingCart, Package, Clock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  main_image_url: string;
  lead_time: string;
  description: string;
  dimensions: string;
  gallery_images: string[];
  categories: {
    name: string;
  };
}

const MOCK_DB: Product[] = [
  {
    id: "1",
    name: "Poltrona Eames Lounge",
    price: 4500.0,
    main_image_url:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000&auto=format&fit=crop",
    lead_time: "15 dias úteis",
    description:
      "Um ícone do design moderno, esta poltrona combina conforto supremo com elegância atemporal. Estrutura em madeira moldada e estofamento em couro premium.",
    dimensions: "85cm x 85cm x 80cm",
    gallery_images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    ],
    categories: { name: "Sala de Estar" },
  },
  {
    id: "2",
    name: "Sofá Modular Velvet",
    price: 3200.0,
    main_image_url:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop",
    lead_time: "20 dias úteis",
    description:
      "Sofá modular versátil revestido em veludo macio de alta durabilidade. Perfeito para adaptar-se a diferentes layouts de sala.",
    dimensions: "220cm x 95cm x 75cm",
    gallery_images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800",
      "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800",
    ],
    categories: { name: "Sala de Estar" },
  },
  {
    id: "3",
    name: "Mesa de Jantar Oak",
    price: 2800.0,
    main_image_url:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop",
    lead_time: "18 dias úteis",
    description:
      "Mesa de jantar robusta em carvalho maciço com acabamento natural. Design minimalista que destaca a beleza dos veios da madeira.",
    dimensions: "180cm x 90cm x 76cm",
    gallery_images: [
      "https://images.unsplash.com/photo-1615876234882-5f8471432190?w=800",
    ],
    categories: { name: "Sala de Jantar" },
  },
  {
    id: "4",
    name: "Luminária de Piso Arc",
    price: 890.0,
    main_image_url:
      "https://images.unsplash.com/photo-1513506003011-3b644ab495e9?q=80&w=1000&auto=format&fit=crop",
    lead_time: "5 dias úteis",
    description:
      "Luminária de piso com design em arco, base em mármore pesado e cúpula em metal escovado. Iluminação direta ideal para leitura.",
    dimensions: "170cm (altura) x 30cm (base)",
    gallery_images: [],
    categories: { name: "Iluminação" },
  },
  {
    id: "5",
    name: "Buffet Minimalista",
    price: 1950.0,
    main_image_url:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
    lead_time: "12 dias úteis",
    description:
      "Buffet com linhas retas e puxadores ocultos. Espaço interno amplo com prateleiras ajustáveis para organizar suas louças.",
    dimensions: "160cm x 45cm x 80cm",
    gallery_images: [],
    categories: { name: "Sala de Jantar" },
  },
  {
    id: "6",
    name: "Cadeira de Jantar Shell",
    price: 450.0,
    main_image_url:
      "https://images.unsplash.com/photo-1503602642458-2321114458c9?q=80&w=1000&auto=format&fit=crop",
    lead_time: "7 dias úteis",
    description:
      "Cadeira ergonômica com assento em polipropileno e pés em madeira faia. Conforto e estilo scandi para sua mesa de jantar.",
    dimensions: "46cm x 52cm x 82cm",
    gallery_images: [],
    categories: { name: "Sala de Jantar" },
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const foundProduct = MOCK_DB.find((p) => p.id === id);

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
          <Button onClick={() => navigate("/catalogo")}>
            Voltar ao Catálogo
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.main_image_url || "",
      quantity,
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 hover:bg-muted/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted shadow-sm">
              <img
                src={
                  product.main_image_url ||
                  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
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
                R$ {Number(product.price).toFixed(2).replace(".", ",")}
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
                    <p className="text-sm text-muted-foreground">
                      {product.dimensions}
                    </p>
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
                    <p className="text-sm text-muted-foreground">
                      {product.lead_time}
                    </p>
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
                    <span className="w-12 text-center font-semibold">
                      {quantity}
                    </span>
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
