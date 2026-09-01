import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Sonner } from '@/components/ui/sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { PublicLayout } from '@/components/PublicLayout';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';

import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Auth from '@/pages/Auth';
import Account from '@/pages/Account';
import Wishlist from '@/pages/Wishlist';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import FAQ from '@/pages/FAQ';
import Terms from '@/pages/Terms';
import LGPD from '@/pages/LGPD';
import Privacy from '@/pages/Privacy';
import NotFound from '@/pages/NotFound';

import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminOrders from './components/admin/AdminOrders';
import AdminCategories from './components/admin/AdminCategories';
import AdminInventory from './components/admin/AdminInventory';

const queryClient = new QueryClient();

// Thin wrapper so AdminGuard + AdminLayout (which both take `children`) can
// be used as a single React Router layout route via <Outlet />, matching
// the pattern used by PublicLayout.
const AdminRouteLayout = () => (
  <AdminGuard>
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  </AdminGuard>
);

const App = () => (
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem
    disableTransitionOnChange={false}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NotificationProvider>
          <WishlistProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col">
                  <Routes>
                    <Route path="/admin" element={<AdminRouteLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="produtos" element={<AdminProducts />} />
                      <Route path="pedidos" element={<AdminOrders />} />
                      <Route path="categorias" element={<AdminCategories />} />
                      <Route path="estoque" element={<AdminInventory />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>

                    <Route element={<PublicLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/catalogo" element={<Catalog />} />
                      <Route path="/produto/:id" element={<ProductDetail />} />
                      <Route path="/carrinho" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/conta" element={<Account />} />
                      <Route path="/lista-desejos" element={<Wishlist />} />
                      <Route path="/sobre" element={<About />} />
                      <Route path="/contato" element={<Contact />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/termos" element={<Terms />} />
                      <Route path="/privacidade" element={<Privacy />} />
                      <Route path="/LGPD" element={<LGPD />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </div>
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </NotificationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
