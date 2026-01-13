import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockBlogPosts } from '@/lib/blogData';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(mockBlogPosts.map((post) => post.category)));

  // Filter posts by category
  const filteredPosts = selectedCategory
    ? mockBlogPosts.filter((post) => post.category === selectedCategory)
    : mockBlogPosts;

  // Featured post is the most recent
  const featuredPost = mockBlogPosts[0];
  const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost.id);

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Blog</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Dicas, tendências e inspirações para transformar seu espaço em um ambiente único
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12 px-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full h-9 text-sm"
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full h-9 text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {!selectedCategory && (
          <article className="mb-10 md:mb-16 animate-fade-in">
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.image_url}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Destaque
                  </Badge>
                </div>
                <div className="p-5 md:p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-3 md:mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <time>{new Date(featuredPost.created_at).toLocaleDateString('pt-BR')}</time>
                    </div>
                  </div>
                  <Button className="w-fit gap-2">
                    Ler artigo completo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Regular Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {(selectedCategory ? filteredPosts : regularPosts).map((post, index) => (
            <article
              key={post.id}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className="bg-card rounded-xl overflow-hidden border h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-background/90 backdrop-blur-sm text-xs"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 md:mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        <time>{new Date(post.created_at).toLocaleDateString('pt-BR')}</time>
                      </div>
                    </div>

                    <h2 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-3 md:pt-4 border-t">
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary text-sm">
                        Ler mais
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <p className="text-muted-foreground text-base md:text-lg mb-4">
              Nenhum artigo encontrado nesta categoria.
            </p>
            <Button variant="outline" onClick={() => setSelectedCategory(null)}>
              Ver todos os artigos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
