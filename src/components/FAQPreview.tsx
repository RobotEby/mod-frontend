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
    <section className="py-6 md:py-16">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <h2 className="text-xl md:text-3xl font-roboto-bold mb-1 md:mb-2">
              Perguntas Frequentes
            </h2>
            <p className="text-xs md:text-base text-muted-foreground">
              Encontre respostas para as dúvidas mais comuns
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm md:text-base py-3 md:py-4 min-h-[44px] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-muted-foreground pb-3 md:pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-4 md:mt-8">
            <Button asChild variant="outline" className="min-h-[44px]">
              <Link to="/faq" className="flex items-center gap-1">
                Ver Todas as Perguntas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
