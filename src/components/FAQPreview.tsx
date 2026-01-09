import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Qual o prazo de entrega dos móveis sob medida?',
    answer:
      'O prazo varia de 15 a 45 dias úteis, dependendo da complexidade do móvel e dos acabamentos escolhidos. Você receberá a data exata de entrega na confirmação do pedido.',
  },
  {
    question: 'Posso personalizar as cores e dimensões?',
    answer:
      'Sim! Todos os nossos móveis podem ser personalizados. Oferecemos mais de 50 opções de acabamentos e adaptamos as dimensões ao seu espaço.',
  },
  {
    question: 'A montagem está inclusa no preço?',
    answer:
      'Sim, a montagem profissional está incluída para a maioria das regiões. Nossa equipe especializada realiza a instalação completa do móvel.',
  },
  {
    question: 'Qual a garantia dos produtos?',
    answer:
      'Oferecemos garantia de 1 a 5 anos dependendo do produto. A garantia cobre defeitos de fabricação e problemas estruturais.',
  },
  {
    question: 'Como funciona o pagamento parcelado?',
    answer:
      'Parcelamos em até 12x sem juros no cartão de crédito. Também oferecemos desconto de 10% para pagamentos via PIX ou boleto.',
  },
];

export const FAQPreview = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-muted-foreground">Encontre respostas para as dúvidas mais comuns</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/faq">
                Ver Todas as Perguntas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
