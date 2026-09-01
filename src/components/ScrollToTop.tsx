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
      } catch {
        // Some browsers (e.g. older Safari) don't allow setting scrollRestoration; safe to ignore.
      }
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname, hash, search]);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 👇 publica altura do scroll-to-top pro WhatsApp “empilhar”
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--scrolltop-offset', isVisible ? '60px' : '0px');
    return () => root.style.setProperty('--scrolltop-offset', '0px');
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Button
      id="scroll-to-top"
      onClick={scrollToTop}
      size="icon"
      style={{
        // base (24px) + altura do bottom nav (quando visível)
        bottom: 'calc(var(--fab-base) + var(--bottom-nav-offset))',
        right: 'var(--fab-base)',
      }}
      className={cn(
        'fixed z-[60] h-12 w-12 rounded-full shadow-xl transition-all duration-300 pointer-events-auto',
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      )}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};
