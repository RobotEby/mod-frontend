import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Truck, Tag } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  bgImage: string;
  bgGradient: string;
  icon: React.ReactNode;
  textColor: string;
}

const banners: Banner[] = [
  {
    id: '1',
    title: '10% OFF no PIX',
    subtitle: 'Em todos os móveis da loja',
    cta: 'Aproveitar',
    link: '/catalogo',
    bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920',
    bgGradient: 'from-primary/90 via-primary/70 to-transparent',
    icon: <Tag className="h-8 w-8" />,
    textColor: 'text-primary-foreground',
  },
  {
    id: '2',
    title: 'Frete Grátis',
    subtitle: 'Para todo o Brasil acima de R$ 5.000',
    cta: 'Ver produtos',
    link: '/catalogo',
    bgImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920',
    bgGradient: 'from-foreground/90 via-foreground/70 to-transparent',
    icon: <Truck className="h-8 w-8" />,
    textColor: 'text-background',
  },
  {
    id: '3',
    title: 'Nova Coleção',
    subtitle: 'Conheça os lançamentos exclusivos',
    cta: 'Explorar',
    link: '/catalogo?novo=true',
    bgImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920',
    bgGradient: 'from-accent-foreground/90 via-accent-foreground/70 to-transparent',
    icon: <Sparkles className="h-8 w-8" />,
    textColor: 'text-background',
  },
];

export const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-smooth"
        style={{
          backgroundImage: `url(${currentBanner.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className={`absolute inset-0 bg-gradient-to-r ${currentBanner.bgGradient}`} />

      <div className="container relative h-full flex items-center">
        <div className="max-w-xl">
          <div
            className={`${currentBanner.textColor} space-y-4 animate-slide-up`}
            key={currentBanner.id}
          >
            <div className="flex items-center gap-3">
              {currentBanner.icon}
              <span className="text-sm font-medium uppercase tracking-wider opacity-90">
                Promoção Especial
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">{currentBanner.title}</h2>

            <p className="text-lg md:text-xl opacity-90">{currentBanner.subtitle}</p>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-4 hover:scale-105 transition-transform"
            >
              <Link to={currentBanner.link}>{currentBanner.cta}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? `w-8 bg-background`
                : `w-2 bg-background/50 hover:bg-background/70`
            }`}
          />
        ))}
      </div>
    </div>
  );
};
