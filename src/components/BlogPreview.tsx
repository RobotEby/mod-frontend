import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const blogPosts = [
  {
    id: '1',
    title: 'Como Escolher o Sofá Perfeito para Sua Sala',
    excerpt:
      'Dicas essenciais para encontrar o sofá ideal considerando tamanho, conforto e estilo do ambiente.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    date: '15 Dez 2024',
    category: 'Dicas de Decoração',
  },
  {
    id: '2',
    title: 'Tendências de Decoração para 2025',
    excerpt: 'Descubra as principais tendências que vão dominar os ambientes no próximo ano.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    date: '10 Dez 2024',
    category: 'Tendências',
  },
  {
    id: '3',
    title: 'Guia Completo: Móveis Sob Medida',
    excerpt: 'Tudo o que você precisa saber antes de encomendar móveis personalizados.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
    date: '5 Dez 2024',
    category: 'Guias',
  },
];

export const BlogPreview = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Blog & Inspirações</h2>
            <p className="text-muted-foreground">
              Dicas, tendências e ideias para transformar seus ambientes
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link to="/blog">
              Ver Todos os Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/blog/${post.id}`}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span className="text-primary font-medium">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link to="/blog">
              Ver Todos os Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
