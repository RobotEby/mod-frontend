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
import { NewsletterForm } from '@/components/NewsletterForm';
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
import { FeaturedCollections } from '@/components/FeaturedColections';
import { ServicesBanner } from '@/components/ServicesBanner';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { FAQPreview } from '@/components/FAQPreview';
import { SustainabilityBanner } from '@/components/SustainabilityBanner';

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
              Móveis de Alta Qualidade <span className="text-primary">Sob Medida</span>
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

      <SocialProof />
      <FlashDeals />

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça nossa seleção de móveis exclusivos
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

      <HowItWorks />
      <RoomGallery />

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore por Categoria</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encontre o móvel perfeito para cada ambiente
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      <CustomizationShowcase />
      <FeaturedCollections />

      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
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
                          <span className="text-primary font-semibold">{testimonial.initials}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
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

      <VideoTestimonials />
      <ServicesBanner />

      <section className="py-12">
        <div className="container">
          <TrustBadges variant="full" />
        </div>
      </section>

      <SustainabilityBanner />
      <InstagramFeed />
      <FAQPreview />
      <RecentlyViewed />
      <NewsletterForm />
    </div>
  );
};

export default Home;
