import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="container max-w-4xl">
        <div className="bg-card border rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Cookie className="h-6 w-6 text-primary" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold mb-1">Usamos Cookies</h3>
            <p className="text-sm text-muted-foreground">
              Utilizamos cookies para melhorar sua experiência de navegação, personalizar conteúdo e
              analisar nosso tráfego. Ao clicar em "Aceitar", você concorda com o uso de cookies.{' '}
              <Link to="/privacidade" className="text-primary hover:underline">
                Saiba mais
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Recusar
            </Button>
            <Button size="sm" onClick={handleAccept}>
              Aceitar
            </Button>
          </div>

          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 md:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
