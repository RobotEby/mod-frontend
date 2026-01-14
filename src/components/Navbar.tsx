import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, Heart, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSelectors';
import { useWishlist } from '@/contexts/WishlistContext';
import { NotificationBell } from '@/components/NotificationBell';
import { MegaMenu } from '@/components/MegaMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mockCategories } from '@/lib/mockData';

export const Navbar = () => {
  const { items } = useCart();
  const user = useAppSelector(selectUser);
  const { wishlistCount } = useWishlist();
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const MobileNavLinks = () => (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-foreground hover:text-primary transition-colors text-lg">
        Home
      </Link>
      <Link to="/catalogo" className="text-foreground hover:text-primary transition-colors text-lg">
        Todos os Produtos
      </Link>
      <div className="border-t pt-4">
        <p className="text-sm font-semibold text-muted-foreground mb-3">Categorias</p>
        {mockCategories.map((category) => (
          <Link
            key={category.id}
            to={`/catalogo?categoria=${category.id}`}
            className="block py-2 text-foreground hover:text-primary transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="border-t pt-4">
        <Link
          to="/catalogo?ofertas=true"
          className="flex items-center gap-2 text-destructive font-medium"
        >
          <Percent className="h-4 w-4" />
          Ofertas
        </Link>
      </div>
      <div className="border-t pt-4">
        <Link to="/sobre" className="text-foreground hover:text-primary transition-colors text-lg">
          Sobre
        </Link>
        <Link
          to="/contato"
          className="block py-2 text-foreground hover:text-primary transition-colors text-lg"
        >
          Contato
        </Link>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          Movelaria on Demand
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors link-underline"
          >
            Home
          </Link>
          <MegaMenu />
          <Link
            to="/catalogo?ofertas=true"
            className="text-destructive hover:text-destructive/80 transition-colors font-medium flex items-center gap-1"
          >
            <Percent className="h-4 w-4" />
            Ofertas
          </Link>
          <Link
            to="/sobre"
            className="text-foreground hover:text-primary transition-colors link-underline"
          >
            Conheça a MOD
          </Link>
          <Link
            to="/contato"
            className="text-foreground hover:text-primary transition-colors link-underline"
          >
            Fale com a MOD
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user && <NotificationBell />}

          <Link to="/lista-desejos">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/carrinho">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>

          <Link to={user ? '/conta  ' : '/auth'}>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-8">
                <MobileNavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
