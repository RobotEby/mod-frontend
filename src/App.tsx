import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { ScrollToTop } from '@/components/ScrollToTop';
import { MobileBottomNav } from '@/components/MobileBottomNav';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Account from './pages/Account';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminOrders from './components/admin/AdminOrders';
import AdminCategories from './components/admin/AdminCategories';
import AdminInventory from './components/admin/AdminInventory';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationProvider>
        <WishlistProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  <Routes>
                    <Route
                      path="/admin/*"
                      element={
                        <AdminGuard>
                          <AdminLayout />
                        </AdminGuard>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path="produtos" element={<AdminProducts />} />
                      <Route path="pedidos" element={<AdminOrders />} />
                      <Route path="categorias" element={<AdminCategories />} />
                      <Route path="estoque" element={<AdminInventory />} />
                    </Route>

                    <Route
                      path="*"
                      element={
                        <>
                          <Navbar />
                          <main className="flex-1 pb-16 lg:pb-0">
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/catalogo" element={<Catalog />} />
                              <Route path="/produto/:id" element={<ProductDetail />} />
                              <Route path="/carrinho" element={<Cart />} />
                              <Route path="/checkout" element={<Checkout />} />
                              <Route path="/auth" element={<Auth />} />
                              <Route path="/minha-conta" element={<Account />} />
                              <Route path="/sobre" element={<About />} />
                              <Route path="/lista-desejos" element={<Wishlist />} />
                              <Route path="/faq" element={<FAQ />} />
                              <Route path="/contato" element={<Contact />} />
                              <Route path="/blog" element={<Blog />} />
                              <Route path="/blog/:slug" element={<BlogPost />} />
                              <Route path="/termos" element={<Terms />} />
                              <Route path="/privacidade" element={<Privacy />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </main>
                          <ScrollToTop />
                          <MobileBottomNav />
                        </>
                      }
                    />
                  </Routes>
                </div>
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
