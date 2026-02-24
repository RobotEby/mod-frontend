import { useParams, Link } from 'react-router-dom';
import { mockBlogPosts } from '@/lib/blogData';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const BlogPost = () => {
  const { slug } = useParams();
  const post = mockBlogPosts.find((p) => p.slug === slug);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post?.title || '';
    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          '_blank',
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copiado para a área de transferência!');
        break;
    }
  };

  if (!post) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-xl md:text-2xl font-roboto-bold text-foreground mb-2">
            Post não encontrado
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            O artigo que você procura não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Blog
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const relatedPosts = mockBlogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
  const headings = post.content.match(/## .+/g)?.map((h) => h.replace('## ', '')) || [];

  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 py-4 md:py-8">
        <nav className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-foreground whitespace-nowrap">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <Link to="/blog" className="hover:text-foreground whitespace-nowrap">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-foreground truncate">{post.title}</span>
        </nav>

        <div className="mb-4 md:mb-6">
          <Button asChild variant="ghost" size="sm" className="min-h-[44px] -ml-2">
            <Link to="/blog" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Blog
            </Link>
          </Button>
        </div>

        <Badge variant="secondary" className="mb-3 text-[10px] md:text-xs">
          {post.category}
        </Badge>

        <h1 className="text-xl md:text-3xl lg:text-4xl font-roboto-bold text-foreground mb-3 md:mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.created_at).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="aspect-video rounded-xl overflow-hidden mb-6 md:mb-8">
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          <article className="flex-1 max-w-3xl">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 font-roboto-medium">
              {post.excerpt}
            </p>

            <div className="prose prose-sm md:prose-base max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  const id = paragraph.replace('## ', '').toLowerCase().replace(/\s+/g, '-');
                  return (
                    <h2
                      key={index}
                      id={id}
                      className="text-lg md:text-xl font-roboto-bold text-foreground mt-6 mb-3"
                    >
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className="text-base md:text-lg font-roboto-semibold text-foreground mt-4 mb-2"
                    >
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
                  return (
                    <ul
                      key={index}
                      className="space-y-1.5 list-disc pl-5 text-sm md:text-base text-muted-foreground mb-4"
                    >
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={index}
                    className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>

          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-20 bg-muted/30 rounded-xl p-4 border">
                <h3 className="text-sm font-roboto-bold mb-3 text-foreground">Neste artigo:</h3>
                <nav className="flex flex-col gap-1">
                  {headings.map((heading, index) => (
                    <a
                      key={index}
                      href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-primary py-1 transition-colors"
                    >
                      {heading}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        <Separator className="my-6 md:my-10" />

        {relatedPosts.length > 0 && (
          <section className="mb-6 md:mb-10">
            <h2 className="text-lg md:text-2xl font-roboto-bold text-foreground mb-4 md:mb-6">
              Artigos relacionados
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group block">
                  <div className="bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.image_url}
                        alt={relatedPost.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="text-sm md:text-base font-roboto-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-8 text-center">
          <h2 className="text-lg md:text-2xl font-roboto-bold text-foreground mb-2">
            Gostou do conteúdo?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            Explore nosso catálogo e encontre o móvel perfeito para seu espaço.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild>
              <Link to="/catalogo">Ver Catálogo</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">Mais Artigos</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;
