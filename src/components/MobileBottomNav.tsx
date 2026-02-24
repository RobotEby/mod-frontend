import { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Grid, label: 'Catálogo', path: '/catalogo' },
  { icon: ShoppingCart, label: 'Carrinho', path: '/carrinho', hasBadge: 'cart' },
  { icon: Heart, label: 'Favoritos', path: '/lista-desejos', hasBadge: 'wishlist' },
  { icon: User, label: 'Conta', path: '/minha-conta' },
];

export const MobileBottomNav = () => {
  const location = useLocation();
  const { items: cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const navRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 120) setIsVisible(false);
      else setIsVisible(true);
      setLastScrollY(y);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const getBadgeCount = (type?: string) => {
    if (type === 'cart') return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (type === 'wishlist') return wishlistItems?.length || 0;
    return 0;
  };

  // ✅ mede altura real (inclui safe-area/padding)
  useEffect(() => {
    const root = document.documentElement;

    const updateOffset = () => {
      const el = navRef.current;
      if (!el) return;

      // offset só vale no mobile (lg:hidden)
      const isMobile = window.innerWidth < 1024;

      if (!isMobile) {
        root.style.setProperty('--bottom-nav-offset', '0px');
        return;
      }

      const h = isVisible ? el.getBoundingClientRect().height : 0;
      root.style.setProperty('--bottom-nav-offset', `${Math.ceil(h)}px`);
    };

    updateOffset();

    window.addEventListener('resize', updateOffset);
    // se seu nav muda com safe-area/orientação, resize resolve

    return () => {
      window.removeEventListener('resize', updateOffset);
      root.style.setProperty('--bottom-nav-offset', '0px');
    };
  }, [isVisible]);

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <nav
      ref={navRef}
      className={cn(
        'lg:hidden fixed bottom-0 left-0 right-0 z-50',
        'border-t border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        'transition-transform duration-300 safe-area-bottom',
        isVisible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="flex items-center justify-around h-14 px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const badgeCount = getBadgeCount(item.hasBadge);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'relative flex flex-1 flex-col items-center justify-center h-full',
                isActive ? 'text-primary' : 'text-muted-foreground',
              )}
              aria-label={item.label}
            >
              <div className="relative">
                <item.icon
                  className={cn('h-5 w-5 transition-transform', isActive && 'scale-110')}
                />
                {item.hasBadge && badgeCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 min-w-4 px-1 flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-roboto-bold rounded-full">
                    {badgeCount > 9 ? '9+' : badgeCount}
                  </span>
                )}
              </div>

              <span className="mt-1 text-[10px] font-roboto-medium hidden sm:block">
                {item.label}
              </span>

              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
