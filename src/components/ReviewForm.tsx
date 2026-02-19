import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSelectors';
import { AxiosError } from 'axios';

interface ReviewFormProps {
  productId: string;
  onSuccess: () => void;
}

export const ReviewForm = ({ productId, onSuccess }: ReviewFormProps) => {
  const user = useAppSelector(selectUser);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Faça login para avaliar produtos');
      return;
    }

    if (rating === 0) {
      toast.error('Por favor, selecione uma avaliação');
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post('/reviews', {
        user_id: user.id,
        product_id: productId,
        rating,
        title: title || null,
        comment: comment || null,
      });

      toast.success('Avaliação enviada! Aguardando aprovação.');
      setRating(0);
      setTitle('');
      setComment('');
      onSuccess();
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 409) {
        toast.error('Você já avaliou este produto');
      } else {
        toast.error('Erro ao enviar avaliação');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6">
      <h3 className="text-lg font-roboto-semibold">Deixe sua Avaliação</h3>

      <div>
        <Label>Avaliação *</Label>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="title">Título (opcional)</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resumo da sua experiência"
          maxLength={200}
        />
      </div>

      <div>
        <Label htmlFor="comment">Comentário (opcional)</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte-nos sobre sua experiência com este produto"
          rows={4}
          maxLength={1000}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
      </Button>
    </form>
  );
};
