import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      try {
        history.scrollRestoration = 'manual';
      } catch {}
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'auto' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname, hash, search]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      id="scroll-to-top"
      onClick={scrollToTop}
      size="icon"
      className={cn(
        'fixed bottom-20 lg:bottom-6 right-6 z-60 h-12 w-12 rounded-full shadow-lg transition-all duration-300',
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      )}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};
