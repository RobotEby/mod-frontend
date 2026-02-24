import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { mockCategories } from '@/lib/mockData';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-roboto-bold mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/sobre"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <a
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Entre em Contato
                </a>
              </li>
              <Link
                to="/blog"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="font-roboto-bold mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Dúvidas Frequentes
                </Link>
              </li>
              <li>
                <Link
                  to="/termos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="/privacidade"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/LGPD"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  LGPD
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-roboto-bold mb-4">Categorias</h3>
            <ul className="space-y-2">
              {mockCategories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/catalogo?categoria=${category.slug}`}



                    
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-roboto-bold mb-4">Redes Sociais</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Formas de Pagamento</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-background px-2 py-1 rounded border border-border">
                PIX
              </span>
              <span className="text-xs bg-background px-2 py-1 rounded border border-border">
                Visa
              </span>
              <span className="text-xs bg-background px-2 py-1 rounded border border-border">
                Mastercard
              </span>
              <span className="text-xs bg-background px-2 py-1 rounded border border-border">
                Elo
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Movelaria on Demand LTDA. Todos os direitos reservados. ©
            CopyRight {new Date().getFullYear()} Movelaria on Demand LTDA. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
