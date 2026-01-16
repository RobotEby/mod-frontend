import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSelectors';

interface ReviewListProps {
  productId: string;
}

interface Profile {
  id: string;
  full_name: string;
}

interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title?: string;
  comment?: string;
  status: string;
  helpful_count: number;
  created_at: string;
  profile?: Profile;
}

export const ReviewList = ({ productId }: ReviewListProps) => {
  const user = useAppSelector(selectUser);

  const { data: reviews, refetch } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data: reviewsData } = await apiClient.get<Review[]>('/reviews', {
        params: {
          product_id: productId,
          status: 'approved',
        },
      });

      if (!reviewsData || reviewsData.length === 0) return [];

      const userIds = [...new Set(reviewsData.map((r) => r.user_id))];

      let profiles: Profile[] = [];

      if (userIds.length > 0) {
        try {
          const { data } = await apiClient.get<Profile[]>('/profiles', {
            params: { ids: userIds.join(',') },
          });
          profiles = data;
        } catch (error) {
          console.warn('Não foi possível carregar perfis', error);
        }
      }

      const reviewsWithProfiles = reviewsData.map((review) => ({
        ...review,
        profile: profiles.find((p) => p.id === review.user_id),
      }));

      return reviewsWithProfiles.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['review-stats', productId],
    queryFn: async () => {
      const response = await apiClient.get<{ avgRating: number; count: number }>(
        `/products/${productId}/stats`,
      );
      return {
        avgRating: response.data?.avgRating || 0,
        count: response.data?.count || 0,
      };
    },
  });

  const handleHelpful = async (reviewId: string) => {
    if (!user) {
      toast.error('Faça login para marcar como útil');
      return;
    }

    try {
      await apiClient.post(`/reviews/${reviewId}/helpful`);
      refetch();
    } catch (error) {
      toast.error('Erro ao marcar como útil');
    }
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhuma avaliação ainda. Seja o primeiro a avaliar!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stats && stats.count > 0 && (
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 fill-primary text-primary" />
            <span className="text-3xl font-bold">{Number(stats.avgRating).toFixed(1)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Baseado em {stats.count} {stats.count === 1 ? 'avaliação' : 'avaliações'}
          </div>
        </div>
      )}

      {reviews.map((review) => (
        <div key={review.id} className="space-y-3 pb-6 border-b last:border-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {review.profile?.full_name || 'Usuário'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(review.created_at), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>

          {review.title && <h4 className="font-semibold">{review.title}</h4>}

          {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleHelpful(review.id)}
            className="gap-2"
          >
            <ThumbsUp className="h-4 w-4" />
            Útil ({review.helpful_count})
          </Button>
        </div>
      ))}
    </div>
  );
};
