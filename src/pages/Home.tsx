import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import heroImage from '@/assets/hero-furniture.jpg';
import { mockProducts } from '@/lib/mockData';

const Home = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockProducts.slice(0, 6);
    },
  });

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Móveis de Luxo <span className="text-primary">Sob Medida</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Móveis high-end com a qualidade de marcenaria sob medida. Designs exclusivos,
              fabricados especialmente para você.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link to="/catalogo">
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/sobre">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça nossa seleção de móveis exclusivos, perfeitos para transformar seu ambiente
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={Number(product.price)}
                  image={product.main_image_url || ''}
                  leadTime={product.lead_time || undefined}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/catalogo">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e transparente, do pedido até a entrega
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Escolha seu Móvel</h3>
              <p className="text-muted-foreground">
                Navegue pelo nosso catálogo e selecione o móvel perfeito para seu espaço
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Enviamos à Marcenaria</h3>
              <p className="text-muted-foreground">
                Seu pedido é enviado para nossa parceira Marcenaria Diferente para fabricação
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Receba em Casa</h3>
              <p className="text-muted-foreground">
                Acompanhe o status do pedido e receba seu móvel com entrega garantida
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="text-2xl font-bold text-center">
                Por que escolher a Movelaria on Demand?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Qualidade de marcenaria sob medida',
                  'Designs exclusivos e modernos',
                  'Fabricação especializada',
                  'Acompanhamento em tempo real',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
