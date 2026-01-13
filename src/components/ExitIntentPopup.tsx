import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gift, X } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'newsletter-popup-status';
const DISMISS_DAYS = 7;
const SUBSCRIBE_DAYS = 30;
const ACTIVATION_DELAY_MS = 10000;

interface PopupStatus {
  type: 'dismissed' | 'subscribed';
  timestamp: number;
}

export const ExitIntentPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const shouldShowPopup = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return true;

      const status: PopupStatus = JSON.parse(stored);
      const now = Date.now();
      const daysSinceAction = (now - status.timestamp) / (1000 * 60 * 60 * 24);

      if (status.type === 'subscribed' && daysSinceAction < SUBSCRIBE_DAYS) {
        return false;
      }
      if (status.type === 'dismissed' && daysSinceAction < DISMISS_DAYS) {
        return false;
      }
      return true;
    } catch {
      return true;
    }
  }, []);

  useEffect(() => {
    if (!shouldShowPopup()) return;

    const timer = setTimeout(() => {
      setIsEnabled(true);
    }, ACTIVATION_DELAY_MS);

    return () => clearTimeout(timer);
  }, [shouldShowPopup]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && e.relatedTarget === null) {
        setShowPopup(true);
        setIsEnabled(false);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isEnabled]);

  const handleDismiss = () => {
    const status: PopupStatus = { type: 'dismissed', timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
    setShowPopup(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const status: PopupStatus = { type: 'subscribed', timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status));

    toast.success('Obrigado! Você receberá 10% de desconto no seu email.');
    setShowPopup(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">Espere! Não perca esta oferta</DialogTitle>
          <DialogDescription className="text-base">
            Cadastre-se na nossa newsletter e ganhe{' '}
            <span className="font-bold text-primary">10% OFF</span> na sua primeira compra!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            type="email"
            placeholder="Seu melhor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Quero meu desconto!'}
          </Button>
        </form>

        <button
          onClick={handleDismiss}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
        >
          Não, obrigado. Prefiro pagar o preço cheio.
        </button>
      </DialogContent>
    </Dialog>
  );
};
