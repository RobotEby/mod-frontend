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
import logo from '/movelariaOnDemand-photoaidcom-cropped.png';

export const Navbar = () => {
  const { items } = useCart();
  const user = useAppSelector(selectUser);
  const { wishlistCount } = useWishlist();
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const MobileNavLinks = () => (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Link
          to="/"
          className="rounded-lg px-2 py-2 text-base font-roboto-medium text-foreground hover:bg-muted/60 hover:text-primary transition-colors"
        >
          Home
        </Link>

        <Link
          to="/catalogo"
          className="rounded-lg px-2 py-2 text-base font-roboto-medium text-foreground hover:bg-muted/60 hover:text-primary transition-colors"
        >
          Todos os Produtos
        </Link>

        <Link
          to="/catalogo?ofertas=true"
          className="rounded-lg px-2 py-2 text-base font-roboto-semibold text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
        >
          <Percent className="h-4 w-4" />
          Ofertas
        </Link>
      </div>

      <div className="border-t pt-5">
        <p className="mb-3 text-xs font-roboto-semibold uppercase tracking-wide text-muted-foreground">
          Categorias
        </p>

        <div className="grid gap-1">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              to={`/catalogo?categoria=${category.id}`}
              className="rounded-lg px-2 py-2 text-sm text-foreground hover:bg-muted/60 hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t pt-5">
        <p className="mb-3 text-xs font-roboto-semibold uppercase tracking-wide text-muted-foreground">
          Informações
        </p>
        <div className="grid gap-1">
          <Link
            to="/sobre"
            className="rounded-lg px-2 py-2 text-sm text-foreground hover:bg-muted/60 hover:text-primary transition-colors"
          >
            Sobre
          </Link>
          <Link
            to="/contato"
            className="rounded-lg px-2 py-2 text-sm text-foreground hover:bg-muted/60 hover:text-primary transition-colors"
          >
            Contato
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img
            src={logo}
            alt="Movelaria On Demand"
            className="h-10 md:h-12 mr-3 object-contain"
            aria-hidden="true"
          />
          <span className="text-lg font-roboto-bold text-primary sm:text-xl hidden lg:block">
            Movelaria on Demand
          </span>
          <span className="text-lg font-roboto-bold text-primary block md:hidden">MOD</span>
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
            className="text-destructive hover:text-destructive/80 transition-colors font-roboto-medium flex items-center gap-1"
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

        <div className="flex items-center gap-1 sm:gap-2">
          {user && (
            <div className="hidden sm:block">
              <NotificationBell />
            </div>
          )}

          <Link to="/lista-desejos" className="relative">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/carrinho" className="relative">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>

          <Link to={user ? '/conta' : '/auth'}>
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[88vw] max-w-[420px] p-0">
              <div className="border-b px-4 py-4">
                <p className="text-sm font-roboto-semibold">Menu</p>
                <p className="text-xs text-muted-foreground">Navegue pela loja</p>
              </div>

              <div className="max-h-[calc(100vh-72px)] overflow-y-auto px-4 py-5">
                {user && (
                  <div className="mb-5 sm:hidden">
                    <NotificationBell />
                  </div>
                )}
                <MobileNavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
