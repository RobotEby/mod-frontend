import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import heroImage from '@/assets/hero-furniture.jpg';
import { mockProducts, mockCategories } from '@/lib/mockData';
import { BenefitsBar } from '@/components/BenefitsBar';
import { PromoBanner } from '@/components/PromoBanner';
import { CategoryCard } from '@/components/CategoryCard';
import { FlashDeals } from '@/components/FlashDeals';
import { BestSellers } from '@/components/BestSellers';
import { HowItWorks } from '@/components/HowItWorks';
import { SocialProof } from '@/components/SocialProof';
import { InstagramFeed } from '@/components/InstagramFeed';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { PaymentBenefits } from '@/components/PaymentBenefits';
import { TrustBadges } from '@/components/TrustBadges';
import { RoomGallery } from '@/components/RoomGallery';
import { CustomizationShowcase } from '@/components/CustomizationShowcase';
import { FeaturedCollections } from '@/components/FeaturedCollections';
import { ServicesBanner } from '@/components/ServicesBanner';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { FAQPreview } from '@/components/FAQPreview';
import { SustainabilityBanner } from '@/components/SustainabilityBanner';
import { cn } from '@/lib/utils';

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
      <PromoBanner />
      <PaymentBenefits />
      <BenefitsBar />

      <section className="relative flex items-center min-h-[460px] sm:min-h-[520px] lg:min-h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-roboto-bold leading-tight">
              Móveis de Alta Qualidade <span className="text-primary">Sob Medida</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
              Móveis high-end com a qualidade de marcenaria sob medida. Designs exclusivos,
              fabricados especialmente para você.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/catalogo">
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link to="/sobre">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-12">
        <div className="container px-4">
          <div className="mb-4 md:mb-7 flex items-end justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-roboto-bold tracking-tight">
                Produtos em Destaque
              </h2>

              <p className="text-xs md:text-sm text-muted-foreground">
                Conheça nossa seleção de móveis exclusivos
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2"></div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[...Array(18)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-2xl border border-border bg-card overflow-hidden',
                    i >= 4 && 'max-lg:hidden',
                  )}
                >
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-3 sm:p-4 space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-2/5" />
                    <Skeleton className="h-9 w-full mt-2 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {products?.map((product, i) => (
                <div
                  key={product.id}
                  className={cn(i >= 4 && 'max-lg:hidden', i >= 18 && 'lg:hidden')}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={Number(product.price)}
                    image={product.main_image_url || ''}
                    leadTime={product.lead_time || undefined}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 md:mt-9 text-center">
            <Button asChild variant="outline" size="lg" className="h-11 min-h-[44px] rounded-xl">
              <Link to="/catalogo" className="inline-flex items-center gap-1">
                Ver Todos os Produtos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FlashDeals />

      <section className="py-6 md:py-12">
        <div className="container px-4">
          <div className="mb-3 md:mb-6">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-roboto-medium-bold">
              Explore por Categoria
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Encontre o móvel perfeito para cada ambiente
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {mockCategories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                slug={category.slug}
                image={category.image_url || ''}
              />
            ))}
          </div>
        </div>
      </section>

      <BestSellers />

      <RoomGallery />

      <CustomizationShowcase />

      <FeaturedCollections />

      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-roboto-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experiências reais de quem transformou seus ambientes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {[
                  {
                    name: 'Maria Clara',
                    location: 'São Paulo, SP',
                    initials: 'MC',
                    text: 'A qualidade dos móveis superou minhas expectativas. O acabamento é impecável.',
                  },
                  {
                    name: 'Roberto Silva',
                    location: 'Rio de Janeiro, RJ',
                    initials: 'RS',
                    text: 'Processo simples e transparente. Recebi exatamente no prazo prometido.',
                  },
                  {
                    name: 'Ana Fernandes',
                    location: 'Belo Horizonte, MG',
                    initials: 'AF',
                    text: 'Móveis de verdadeira alta qualidade. O investimento valeu cada centavo.',
                  },
                ].map((testimonial, idx) => (
                  <CarouselItem key={idx}>
                    <div className="bg-card p-8 rounded-2xl border border-border">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-primary">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6">"{testimonial.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-roboto-semibold">
                            {testimonial.initials}
                          </span>
                        </div>
                        <div>
                          <p className="font-roboto-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      <HowItWorks />
      <SocialProof />

      <ServicesBanner />
      <VideoTestimonials />

      <SustainabilityBanner />
      <InstagramFeed />
      <section className="py-12">
        <div className="container">
          <TrustBadges variant="full" />
        </div>
      </section>
      <FAQPreview />
      <RecentlyViewed />
    </div>
  );
};

export default Home;
