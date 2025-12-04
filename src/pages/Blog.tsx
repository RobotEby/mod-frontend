import { Link } from 'react-router-dom';
import { mockBlogPosts } from '@/lib/mockData';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog & Inspirações</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dicas, tendências e inspirações para transformar seu espaço
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.map((post) => (
            <article key={post.id} className="group">
              <Link to={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden rounded-lg aspect-video mb-4">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time>{new Date(post.created_at).toLocaleDateString('pt-BR')}</time>
                  </div>

                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>

                  <Button variant="link" className="p-0 h-auto">
                    Ler mais
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
