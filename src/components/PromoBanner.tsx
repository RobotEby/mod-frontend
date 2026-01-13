import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const isAnimatingRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimationEnd = useCallback(() => {
    isAnimatingRef.current = false;
    setIsAnimating(false);
  }, []);

  // const handlePrevious = useCallback(() => {
  //   if (isAnimatingRef.current) return;
  //   if (banners.length <= 1) return;

  //   isAnimatingRef.current = true;
  //   setIsAnimating(true);
  //   setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  // }, []);

  // const handleNext = useCallback(() => {
  //   if (isAnimatingRef.current) return;
  //   if (banners.length <= 1) return;

  //   isAnimatingRef.current = true;
  //   setIsAnimating(true);
  //   setCurrentIndex((prev) => (prev + 1) % banners.length);
  // }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [banners.length]);

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
            key={currentBanner.id}
            className={`${currentBanner.textColor} space-y-4 ${
              isAnimating ? 'animate-slide-up' : ''
            }`}
            onAnimationEnd={handleAnimationEnd}
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

      {/* <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button
          onClick={handlePrevious}
          aria-label="Anterior"
          className="p-2 rounded-md bg-white/90 shadow"
          type="button"
        >
          <ChevronLeft />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          onClick={handleNext}
          aria-label="Próximo"
          className="p-2 rounded-md bg-white/90 shadow"
          type="button"
        >
          <ChevronRight />
        </button>
      </div> */}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index === currentIndex) return;
              if (isAnimatingRef.current) return;

              isAnimatingRef.current = true;
              setIsAnimating(true);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? `w-8 bg-background`
                : `w-2 bg-background/50 hover:bg-background/70`
            }`}
            aria-label={`Ir para slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};
