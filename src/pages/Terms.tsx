const Terms = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground">
              Ao acessar e usar este site, você aceita e concorda em cumprir os termos e condições
              aqui estabelecidos. Se você não concordar com qualquer parte destes termos, não deve
              usar nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Uso do Site</h2>
            <p className="text-muted-foreground">
              O conteúdo deste site é apenas para sua informação geral e uso. Está sujeito a
              alterações sem aviso prévio. Você concorda em usar este site apenas para fins legais e
              de maneira que não infrinja os direitos de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Produtos e Preços</h2>
            <p className="text-muted-foreground">
              Todos os produtos estão sujeitos à disponibilidade. Reservamo-nos o direito de limitar
              as quantidades de qualquer produto que oferecemos. Os preços estão sujeitos a
              alterações sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Pedidos e Pagamentos</h2>
            <p className="text-muted-foreground">
              Ao fazer um pedido, você se compromete a fornecer informações precisas e completas.
              Reservamo-nos o direito de recusar ou cancelar qualquer pedido por qualquer motivo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Entrega</h2>
            <p className="text-muted-foreground">
              Os prazos de entrega são estimativas e não garantias. Não nos responsabilizamos por
              atrasos causados por circunstâncias fora de nosso controle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Propriedade Intelectual</h2>
            <p className="text-muted-foreground">
              Todo o conteúdo deste site, incluindo textos, gráficos, logos e imagens, é propriedade
              da Movelaria on Demand ou de seus fornecedores de conteúdo e é protegido por leis de
              propriedade intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground">
              Em nenhum caso seremos responsáveis por quaisquer danos diretos, indiretos,
              incidentais, especiais ou consequenciais decorrentes do uso ou da incapacidade de usar
              este site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Alterações nos Termos</h2>
            <p className="text-muted-foreground">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações
              entrarão em vigor imediatamente após a publicação no site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Lei Aplicável</h2>
            <p className="text-muted-foreground">
              Estes termos são regidos e interpretados de acordo com as leis do Brasil. Quaisquer
              disputas relacionadas a estes termos estarão sujeitas à jurisdição exclusiva dos
              tribunais brasileiros.
            </p>
          </section>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
