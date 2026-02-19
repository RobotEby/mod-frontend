import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Truck, Tag } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  bgImage: string;
  bgGradient: string;
  icon: React.ReactNode;
}

const banners: Banner[] = [
  {
    id: '1',
    title: '10% OFF no PIX',
    subtitle: 'Em todos os móveis da loja',
    cta: 'Aproveitar',
    link: '/catalogo',
    bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920',
    bgGradient: 'from-primary/95 via-primary/80 to-primary/40',
    icon: <Tag className="h-4 w-4 md:h-5 md:w-5" />,
  },
  {
    id: '2',
    title: 'Frete Grátis',
    subtitle: 'Para todo o Brasil acima de R$ 5.000',
    cta: 'Ver produtos',
    link: '/catalogo',
    bgImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920',
    bgGradient: 'from-foreground/95 via-foreground/80 to-foreground/40',
    icon: <Truck className="h-4 w-4 md:h-5 md:w-5" />,
  },
  {
    id: '3',
    title: 'Nova Coleção',
    subtitle: 'Conheça os lançamentos exclusivos',
    cta: 'Explorar',
    link: '/catalogo?novo=true',
    bgImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920',
    bgGradient: 'from-accent-foreground/95 via-accent-foreground/80 to-accent-foreground/40',
    icon: <Sparkles className="h-4 w-4 md:h-5 md:w-5" />,
  },
];

const AUTOPLAY_MS = 6000;
const TRANSITION_MS = 700;

export const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mantido (você usa esse estado, mesmo que não esteja no layout)
  const isAnimatingRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // ✅ Correção: transition NÃO dispara animationend, então destravamos via timeout
  const unlockTimerRef = useRef<number | null>(null);

  const lock = useCallback(() => {
    isAnimatingRef.current = true;
    setIsAnimating(true);

    if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
    unlockTimerRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, TRANSITION_MS + 80);
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = window.setInterval(() => {
      if (isAnimatingRef.current) return;

      lock();
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [lock]);

  useEffect(() => {
    return () => {
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
    };
  }, []);

  const currentBanner = banners[currentIndex];

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${currentBanner.bgImage})` }}
      />

      <div className={`absolute inset-0 bg-gradient-to-r ${currentBanner.bgGradient}`} />

      <div className="relative z-10 h-[140px] sm:h-[180px] md:h-[280px] lg:h-[360px] flex items-center">
        <div className="container px-4 md:px-8">
          <div className="max-w-md md:max-w-lg">
            <div className="flex items-center gap-1.5 mb-1 md:mb-3">
              <span className="text-background">{currentBanner.icon}</span>
              <span className="text-[10px] md:text-xs font-roboto-medium text-background/80 uppercase tracking-wider">
                Promoção Especial
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-roboto-bold text-background mb-0.5 md:mb-2 leading-tight">
              {currentBanner.title}
            </h2>

            <p className="text-xs sm:text-sm md:text-lg text-background/80 mb-2 md:mb-6">
              {currentBanner.subtitle}
            </p>

            <Button
              asChild
              size="sm"
              variant="secondary"
              className="h-8 md:h-10 text-xs md:text-sm px-4 md:px-6 min-h-[44px]"
            >
              <Link to={currentBanner.link}>{currentBanner.cta}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index === currentIndex || isAnimatingRef.current) return;
              lock();
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center p-0 bg-transparent md:min-w-0 md:min-h-0`}
            aria-label={`Ir para slide ${index + 1}`}
            type="button"
          >
            <span
              className={`block h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 md:w-8 bg-background'
                  : 'w-1.5 md:w-2 bg-background/50'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};
