const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-roboto-bold mb-6">Sobre a Movelaria on Demand</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Somos uma empresa dedicada a oferecer móveis de alta qualidade com a elegância e o
            acabamento de uma marcenaria sob medida, mas com a praticidade e agilidade do e-commerce
            moderno.
          </p>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-roboto-bold mb-4">Nossa Missão</h2>
            <p className="text-muted-foreground leading-relaxed">
              Democratizar o acesso a móveis de alta qualidade, oferecendo designs exclusivos e
              acabamento impecável através de nossa parceria com a Marcenaria Diferente, garantindo
              qualidade artesanal em cada peça.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-roboto-bold mb-4">Como Trabalhamos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cada móvel do nosso catálogo é cuidadosamente projetado por designers especializados.
              Quando você faz seu pedido, ele é enviado diretamente para nossa parceira, a
              Marcenaria Diferente, onde artesãos experientes começam a produção da sua peça.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Todo o processo é transparente: você pode acompanhar o status do seu pedido em tempo
              real, desde o envio à marcenaria até a entrega na sua casa.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-roboto-bold mb-4">Nossos Diferenciais</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-roboto-bold">•</span>
                <span>Qualidade de marcenaria sob medida com a conveniência do e-commerce</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-roboto-bold">•</span>
                <span>Designs exclusivos desenvolvidos por profissionais especializados</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-roboto-bold">•</span>
                <span>Parceria com a renomada Marcenaria Diferente</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-roboto-bold">•</span>
                <span>Acompanhamento completo do seu pedido</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-roboto-bold">•</span>
                <span>Garantia de satisfação e suporte dedicado</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
