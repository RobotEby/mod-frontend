import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) setIsVisible(false);
      else setIsVisible(true);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os móveis.');
    const url = `https://wa.me/5511999999999?text=${message}`;
    const newWindow = window.open(url, '_blank');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <button
      onClick={handleClick}
      style={{
        right: 'var(--fab-base)',
        bottom:
          'calc(var(--fab-base) + var(--bottom-nav-offset) + var(--scrolltop-offset) + var(--fab-gap))',
      }}
      className={cn(
        'fixed z-[55] flex items-center justify-center rounded-full bg-[#25D366] text-white p-3 md:p-4 shadow-lg',
        'transition-all duration-300 hover:scale-105 hover:shadow-xl',
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-20 opacity-0 pointer-events-none',
      )}
      aria-label="Abrir WhatsApp"
      title="Abrir WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-6 w-6 md:h-7 md:w-7"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.02 3C9.39 3 4 8.38 4 15c0 2.64.86 5.08 2.32 7.06L4 29l7.13-2.26A12.86 12.86 0 0016.02 27C22.65 27 28 21.62 28 15S22.65 3 16.02 3zm0 21.64c-2.02 0-3.9-.55-5.52-1.5l-.39-.23-4.23 1.34 1.36-4.12-.25-.41A9.55 9.55 0 016.46 15c0-5.29 4.29-9.57 9.56-9.57 5.28 0 9.56 4.28 9.56 9.57s-4.28 9.57-9.56 9.57z" />
        <path d="M21.3 17.47c-.29-.15-1.73-.86-2-.96-.27-.1-.46-.15-.65.15-.19.29-.75.96-.92 1.15-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.24-.58-.48-.5-.65-.51h-.55c-.19 0-.51.07-.77.36-.26.29-1.01.99-1.01 2.41 0 1.42 1.03 2.79 1.18 2.98.15.19 2.03 3.1 4.92 4.34.69.3 1.23.48 1.65.62.69.22 1.31.19 1.8.12.55-.08 1.73-.71 1.98-1.39.24-.67.24-1.25.17-1.39-.07-.13-.26-.22-.55-.36z" />
      </svg>
    </button>
  );
};
