import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400',
    likes: 'Ir até o post',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400',
    likes: 'Ir até o post',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    likes: 'Ir até o post',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400',
    likes: 'Ir até o post',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400',
    likes: 'Ir até o post',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    likes: 'Ir até o post',
  },
];

export const InstagramFeed = () => {
  return (
    <section className="hidden md:block py-6 md:py-16 bg-muted/30">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
              <Instagram className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-roboto-bold">Siga-nos no Instagram</h2>
              <p className="text-[10px] md:text-sm text-muted-foreground">@movelariaOnDemand</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-1 min-h-[44px]"
          >
            <Instagram className="h-4 w-4" />
            Seguir
          </Button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-0.5 md:gap-2">
          {instagramPosts.map((post) => (
            <a key={post.id} href="#" className="group relative aspect-square overflow-hidden">
              <img
                src={post.image}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                <span className="text-background text-xs font-roboto-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {post.likes}
                </span>
              </div>
            </a>
          ))}
        </div>

        <Button variant="outline" size="sm" className="sm:hidden w-full mt-3 min-h-[44px]">
          <Instagram className="h-4 w-4 mr-1" />
          Seguir no Instagram
        </Button>
      </div>
    </section>
  );
};
