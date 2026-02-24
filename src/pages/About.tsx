const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container px-4 py-6 md:py-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-roboto-bold text-foreground">
            Sobre a Movelaria on Demand
          </h1>
        </div>
      </div>

      <div className="container px-4 py-6 md:py-12">
        <div className="max-w-3xl space-y-6 md:space-y-8">
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
            Somos uma empresa dedicada a oferecer móveis de alta qualidade com a elegância e o
            acabamento de uma marcenaria sob medida, mas com a praticidade e agilidade do e-commerce
            moderno.
          </p>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 md:p-8 rounded-2xl">
            <h2 className="text-lg md:text-2xl font-roboto-bold mb-2 md:mb-4 text-foreground">
              Nossa Missão
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Democratizar o acesso a móveis de alta qualidade, oferecendo designs exclusivos e
              acabamento impecável através de nossa parceria com a Marcenaria Diferente, garantindo
              qualidade artesanal em cada peça.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-roboto-bold mb-2 md:mb-4 text-foreground">
              Como Trabalhamos
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              Cada móvel do nosso catálogo é cuidadosamente projetado por designers especializados.
              Quando você faz seu pedido, ele é enviado diretamente para nossa parceira, a
              Marcenaria Diferente, onde artesãos experientes começam a produção da sua peça.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Todo o processo é transparente: você pode acompanhar o status do seu pedido em tempo
              real, desde o envio à marcenaria até a entrega na sua casa.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-roboto-bold mb-2 md:mb-4 text-foreground">
              Nossos Diferenciais
            </h2>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-muted-foreground">
              {[
                'Qualidade de marcenaria sob medida com a conveniência do e-commerce',
                'Designs exclusivos desenvolvidos por profissionais especializados',
                'Parceria com a renomada Marcenaria Diferente',
                'Acompanhamento completo do seu pedido',
                'Garantia de satisfação e suporte dedicado',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-roboto-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
