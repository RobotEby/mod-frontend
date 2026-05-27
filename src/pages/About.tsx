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
            Somos uma marca dedicada a transformar a compra de móveis em uma experiência mais
            simples, segura e personalizada, unindo qualidade, bom acabamento e a praticidade do
            atendimento digital.
          </p>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 md:p-8 rounded-2xl">
            <h2 className="text-lg md:text-2xl font-roboto-bold mb-2 md:mb-4 text-foreground">
              Nossa Missão
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Facilitar o acesso a móveis bem planejados, com design funcional, acabamento de
              qualidade e uma jornada de compra clara do início ao fim, valorizando cada detalhe da
              escolha até a entrega.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-roboto-bold mb-2 md:mb-4 text-foreground">
              Como Trabalhamos
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              Cada móvel do nosso catálogo é pensado para unir estética, funcionalidade e
              durabilidade. Após a confirmação do pedido, acompanhamos as etapas necessárias para
              que sua peça seja produzida com cuidado e atenção aos detalhes.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Todo o processo é transparente: você pode acompanhar o status do seu pedido em tempo
              real, desde a preparação da produção até a entrega na sua casa.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-roboto-bold mb-2 md:mb-4 text-foreground">
              Nossos Diferenciais
            </h2>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-muted-foreground">
              {[
                'Qualidade, acabamento e praticidade em uma experiência de compra digital',
                'Designs funcionais desenvolvidos para diferentes estilos de ambiente',
                'Produção cuidadosa com atenção aos detalhes de cada peça',
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
