import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Obrigado! Você receberá nossas ofertas exclusivas.');
      setEmail('');
    }
  };

  return (
    <div className="bg-primary text-primary-foreground py-16">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Receba Ofertas Exclusivas</h2>
          <p className="mb-6 opacity-90">
            Cadastre seu e-mail e seja o primeiro a saber sobre promoções e lançamentos
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background text-foreground"
            />
            <Button type="submit" variant="secondary">
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
