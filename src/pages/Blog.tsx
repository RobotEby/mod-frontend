import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockBlogPosts } from '@/lib/blogData';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(mockBlogPosts.map((post) => post.category)));

  const filteredPosts = selectedCategory
    ? mockBlogPosts.filter((post) => post.category === selectedCategory)
    : mockBlogPosts;

  const featuredPost = mockBlogPosts[0];
  const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost.id);

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container px-4 py-6 md:py-10">
          <h1 className="text-2xl md:text-4xl font-roboto-bold text-foreground">Blog</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
            Dicas, tendências e inspirações para transformar seu espaço em um ambiente único
          </p>
        </div>
      </div>

      <div className="container px-4 py-6 md:py-10">
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full h-8 md:h-9 text-xs md:text-sm min-h-[36px]"
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full h-8 md:h-9 text-xs md:text-sm min-h-[36px]"
            >
              {category}
            </Button>
          ))}
        </div>

        {!selectedCategory && (
          <div className="mb-6 md:mb-10">
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow">
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.image_url}
                    alt={featuredPost.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] md:text-xs">
                    Destaque
                  </Badge>
                </div>
                <div className="p-4 md:p-6 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-2 text-[10px] md:text-xs">
                    {featuredPost.category}
                  </Badge>
                  <h2 className="text-lg md:text-2xl font-roboto-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground line-clamp-3 mb-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="h-3 w-3" />
                    {new Date(featuredPost.created_at).toLocaleDateString('pt-BR')}
                  </div>
                  <span className="text-sm font-roboto-medium text-primary flex items-center gap-1">
                    Ler artigo completo
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {(selectedCategory ? filteredPosts : regularPosts).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
              <div className="bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-2 left-2 text-[10px] md:text-xs"
                  >
                    {post.category}
                  </Badge>
                </div>
                <div className="p-3 md:p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </div>
                  <h3 className="text-sm md:text-base font-roboto-bold text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="text-xs md:text-sm font-roboto-medium text-primary flex items-center gap-1 mt-auto">
                    Ler mais
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-10 md:py-16">
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Nenhum artigo encontrado nesta categoria.
            </p>
            <Button variant="outline" onClick={() => setSelectedCategory(null)}>
              Ver todos os artigos
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Blog;
