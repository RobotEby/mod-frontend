import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
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
        {
          q: 'Tem desconto no PIX?',
          a: 'Sim! Oferecemos 10% de desconto em pagamentos via PIX.',
        },
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

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre nossos produtos e serviços
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold mb-4">{section.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`${section.category}-${index}`}>
                    <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
