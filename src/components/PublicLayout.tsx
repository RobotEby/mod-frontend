import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CookieConsent } from '@/components/CookieConsent';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';

export const PublicLayout = () => (
  <>
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <MobileBottomNav />
    <WhatsAppButton />
    <CookieConsent />
    <ExitIntentPopup />
  </>
);
