import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

export const ReviewList = ({ productId }: ReviewListProps) => {
  const user = useAppSelector(selectUser);

  const { data: reviews, refetch } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data: reviewsData, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const userIds = reviewsData?.map((r) => r.user_id) || [];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      const reviewsWithProfiles = reviewsData?.map((review) => ({
        ...review,
        profile: profilesData?.find((p) => p.id === review.user_id),
      }));

      return reviewsWithProfiles;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['review-stats', productId],
    queryFn: async () => {
      const { data: avgData } = await supabase.rpc('get_product_avg_rating', {
        product_uuid: productId,
      });

      const { data: countData } = await supabase.rpc('get_product_review_count', {
        product_uuid: productId,
      });

      return {
        avgRating: avgData || 0,
        count: countData || 0,
      };
    },
  });

  const handleHelpful = async (reviewId: string) => {
    if (!user) {
      toast.error('Faça login para marcar como útil');
      return;
    }

    const review = reviews?.find((r) => r.id === reviewId);
    if (!review) return;

    const { error } = await supabase
      .from('reviews')
      .update({ helpful_count: review.helpful_count + 1 })
      .eq('id', reviewId);

    if (error) {
      toast.error('Erro ao marcar como útil');
      return;
    }

    refetch();
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
