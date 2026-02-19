import { useParams, Link } from 'react-router-dom';
import { mockBlogPosts } from '@/lib/blogData';
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react';
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
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url,
          )}&text=${encodeURIComponent(text)}`,
          '_blank',
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
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
      <div className="min-h-screen py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-roboto-bold mb-4">Post não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O artigo que você procura não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = mockBlogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const headings = post.content.match(/## .+/g)?.map((h) => h.replace('## ', '')) || [];

  return (
    <div className="min-h-screen py-12 md:py-16">
      <article className="container px-4 md:px-6">
        <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-6 md:mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          <Link to="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>

        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-4 md:mb-6 -ml-2">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Link>
          </Button>

          <Badge variant="secondary" className="mb-3 md:mb-4">
            {post.category}
          </Badge>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-roboto-bold mb-4 md:mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-muted-foreground mb-6 md:mb-8">
            <Separator orientation="vertical" className="h-8 hidden md:block" />
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(post.created_at).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-10">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid lg:grid-cols-[1fr_250px] gap-8 lg:gap-12">
            <div>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="prose prose-lg max-w-none prose-headings:font-roboto-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-ul:text-muted-foreground prose-li:marker:text-primary">
                {post.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    const id = paragraph.replace('## ', '').toLowerCase().replace(/\s+/g, '-');
                    return (
                      <h2 key={index} id={id} className="scroll-mt-20">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
                    return (
                      <ul key={index} className="space-y-2">
                        {items.map((item, i) => (
                          <li key={i}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
            </div>

            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <div className="p-5 bg-muted/50 rounded-xl">
                    <h4 className="font-roboto-semibold mb-4 text-sm">Neste artigo:</h4>
                    <nav className="space-y-2">
                      {headings.map((heading, index) => (
                        <a
                          key={index}
                          href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {heading}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-12 md:mt-20 pt-8 md:pt-12 border-t max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-roboto-bold mb-6 md:mb-8">
              Artigos relacionados
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={relatedPost.image_url}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-roboto-bold group-hover:text-primary transition-colors line-clamp-2 text-sm md:text-base">
                        {relatedPost.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="bg-primary text-primary-foreground rounded-xl md:rounded-2xl p-6 md:p-10 text-center">
            <h3 className="text-xl md:text-2xl font-roboto-bold mb-2 md:mb-3">
              Gostou do conteúdo?
            </h3>
            <p className="text-sm md:text-base opacity-90 mb-4 md:mb-6">
              Explore nosso catálogo e encontre o móvel perfeito para seu espaço.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/catalogo">Ver Catálogo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/blog">Mais Artigos</Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogPost;
