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
// import { SustainabilityBanner } from '@/components/SustainabilityBanner';

const testimonials = [
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
];

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
          <div className="flex items-end justify-between mb-3 md:mb-6">
            <div>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-roboto-bold">
                Produtos em Destaque
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                Conheça nossa seleção de móveis exclusivos
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex gap-3 md:flex-col md:gap-0 p-3 border border-border rounded-lg"
                >
                  <Skeleton className="w-28 h-28 md:w-full md:h-48 rounded-md flex-shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {products?.map((product) => (
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={Number(product.price)}
                  image={product.main_image_url || ''}
                  leadTime={product.lead_time || undefined}
                />
              ))}
            </div>
          )}

          <div className="mt-4 md:mt-8 text-center">
            <Button asChild variant="outline" size="lg" className="h-11 min-h-[44px]">
              <Link to="/catalogo">
                Ver Todos os Produtos
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FlashDeals />

      <section className="py-6 md:py-12">
        <div className="container px-4">
          <div className="mb-3 md:mb-6">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-roboto-bold">
              Explore por Categoria
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 hidden sm:block">
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

      <section className="py-6 md:py-12 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-4 md:mb-8">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-roboto-bold">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 hidden sm:block">
              Experiências reais de quem transformou seus ambientes
            </p>
          </div>

          <div className="md:hidden">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial, idx) => (
                  <CarouselItem key={idx} className="basis-full sm:basis-[80%]">
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>

          <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <SocialProof />
      <ServicesBanner />
      <VideoTestimonials />
      <InstagramFeed />
      <section className="py-4 md:py-8">
        <div className="container px-4">
          <TrustBadges variant="full" maxItems={6} />
        </div>
      </section>
      <FAQPreview />

      <RecentlyViewed />
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: {
    name: string;
    location: string;
    initials: string;
    text: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <div className="bg-background border border-border rounded-xl p-4 md:p-6 flex flex-col gap-3">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">
          ★
        </span>
      ))}
    </div>
    <p className="text-sm md:text-base text-foreground italic">"{testimonial.text}"</p>
    <div className="flex items-center gap-2.5 mt-auto pt-2 border-t border-border">
      <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-roboto-bold shrink-0">
        {testimonial.initials}
      </div>
      <div>
        <p className="text-sm font-roboto-semibold text-foreground">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
      </div>
    </div>
  </div>
);

export default Home;
