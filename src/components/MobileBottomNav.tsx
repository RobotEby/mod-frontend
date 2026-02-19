import { useState, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const getBadgeCount = (type?: string) => {
    if (type === 'cart') return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (type === 'wishlist') return wishlistItems?.length || 0;
    return 0;
  };

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <nav
      className={cn(
        'lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border transition-transform duration-300',
        'safe-area-bottom',
        isVisible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const badgeCount = getBadgeCount(item.hasBadge);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full relative transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <div className="relative">
                <item.icon className={cn('h-5 w-5', isActive && 'scale-110')} />
                {item.hasBadge && badgeCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-roboto-bold rounded-full">
                    {badgeCount > 9 ? '9+' : badgeCount}
                  </span>
                )}
              </div>
              <span
                className={cn('text-[10px] mt-1 font-roboto-medium', isActive && 'text-primary')}
              >
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
