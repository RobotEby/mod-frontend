import { useParams, Link } from 'react-router-dom';
import { mockBlogPosts } from '@/lib/mockData';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { slug } = useParams();
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
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

  return (
    <div className="min-h-screen py-16">
      <article className="container max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Blog
          </Link>
        </Button>

        <div className="mb-6">
          <span className="bg-primary text-primary-foreground text-sm px-4 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-5xl font-bold mb-6">{post.title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time>{new Date(post.created_at).toLocaleDateString('pt-BR')}</time>
          </div>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
          <img src={post.image_url} alt={post.title} className="object-cover w-full h-full" />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
          <div className="space-y-4 text-foreground">{post.content}</div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-2xl font-bold mb-6">Outros posts que você pode gostar</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {mockBlogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group">
                  <div className="relative overflow-hidden rounded-lg aspect-video mb-3">
                    <img
                      src={relatedPost.image_url}
                      alt={relatedPost.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="font-bold group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
