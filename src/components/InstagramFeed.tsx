import { Instagram, Heart } from 'lucide-react';
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
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Siga-nos no Instagram</h2>
              <p className="text-muted-foreground text-sm">
                @movelariaOnDemand • Inspirações e projetos
              </p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <a
              href="https://instagram.com/movelaria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Seguir
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/movelaria"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="h-5 w-5 fill-white" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
