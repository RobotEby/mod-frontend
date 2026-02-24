import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    category: 'Entrega',
    questions: [
      {
        q: 'Qual o prazo de entrega?',
        a: 'O prazo varia de acordo com o produto e região. Geralmente entre 15 a 35 dias após confirmação do pagamento.',
      },
      {
        q: 'Como acompanho meu pedido?',
        a: "Você pode acompanhar o status do seu pedido através da sua conta, na seção 'Meus Pedidos'.",
      },
    ],
  },
  {
    category: 'Pagamento',
    questions: [
      {
        q: 'Quais formas de pagamento aceitas?',
        a: 'Aceitamos PIX, cartões de crédito (Visa, Mastercard, Elo) e boleto bancário.',
      },
      { q: 'Tem desconto no PIX?', a: 'Sim! Oferecemos 10% de desconto em pagamentos via PIX.' },
    ],
  },
  {
    category: 'Garantia',
    questions: [
      {
        q: 'Qual a garantia dos móveis?',
        a: 'Todos os móveis possuem garantia de fabricação contra defeitos. O prazo varia de acordo com o produto.',
      },
      {
        q: 'Como solicitar assistência técnica?',
        a: 'Entre em contato através do nosso canal de atendimento com o número do pedido.',
      },
    ],
  },
  {
    category: 'Trocas e Devoluções',
    questions: [
      {
        q: 'Posso trocar ou devolver?',
        a: 'Sim, você tem até 7 dias após o recebimento para solicitar troca ou devolução, conforme Código de Defesa do Consumidor.',
      },
      {
        q: 'Como funciona o processo de troca?',
        a: 'Entre em contato conosco, enviaremos instruções e coletaremos o produto no seu endereço sem custo.',
      },
    ],
  },
  {
    category: 'Montagem',
    questions: [
      {
        q: 'Os móveis vêm montados?',
        a: 'A maioria dos móveis vem desmontado para facilitar o transporte. Fornecemos manual de montagem detalhado.',
      },
      {
        q: 'Vocês oferecem serviço de montagem?',
        a: 'Podemos indicar profissionais parceiros na sua região. Entre em contato para mais informações.',
      },
    ],
  },
];

const FAQ = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container px-4 py-6 md:py-10">
          <h1 className="text-2xl md:text-4xl font-roboto-bold text-foreground">
            Perguntas Frequentes
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
            Tire suas dúvidas sobre nossos produtos e serviços
          </p>
        </div>
      </div>

      <div className="container px-4 py-6 md:py-10">
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-base md:text-xl font-roboto-bold mb-2 md:mb-3 text-foreground">
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`${section.category}-${index}`}>
                    <AccordionTrigger className="text-left text-sm md:text-base py-3 md:py-4 min-h-[44px] hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs md:text-sm text-muted-foreground pb-3 md:pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQ;
