const Privacy = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Informações que Coletamos</h2>
            <p className="text-muted-foreground">
              Coletamos informações que você nos fornece diretamente, como nome, e-mail, endereço,
              telefone e informações de pagamento quando você faz um pedido ou cria uma conta em
              nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Como Usamos suas Informações</h2>
            <p className="text-muted-foreground">Usamos as informações coletadas para:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Processar e entregar seus pedidos</li>
              <li>Comunicar com você sobre seus pedidos e nossa conta</li>
              <li>Enviar informações de marketing (com seu consentimento)</li>
              <li>Melhorar nossos produtos e serviços</li>
              <li>Prevenir fraudes e proteger nossos sistemas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Compartilhamento de Informações</h2>
            <p className="text-muted-foreground">
              Não vendemos suas informações pessoais. Podemos compartilhar suas informações com:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Prestadores de serviços que nos ajudam a operar nosso negócio</li>
              <li>Transportadoras para entrega de pedidos</li>
              <li>Processadores de pagamento</li>
              <li>Autoridades legais quando exigido por lei</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Segurança das Informações</h2>
            <p className="text-muted-foreground">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas
              informações pessoais contra acesso não autorizado, perda ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-muted-foreground">
              Utilizamos cookies para melhorar sua experiência de navegação, analisar o tráfego do
              site e personalizar conteúdo. Você pode configurar seu navegador para recusar cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Seus Direitos</h2>
            <p className="text-muted-foreground">Você tem o direito de:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações incorretas</li>
              <li>Solicitar a exclusão de suas informações</li>
              <li>Opor-se ao processamento de suas informações</li>
              <li>Retirar seu consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Retenção de Dados</h2>
            <p className="text-muted-foreground">
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os
              propósitos descritos nesta política ou conforme exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Menores de Idade</h2>
            <p className="text-muted-foreground">
              Nosso site não é destinado a menores de 18 anos. Não coletamos intencionalmente
              informações de crianças.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Alterações nesta Política</h2>
            <p className="text-muted-foreground">
              Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças
              significativas publicando a nova política em nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contato</h2>
            <p className="text-muted-foreground">
              Se você tiver dúvidas sobre esta política de privacidade, entre em contato conosco
              através de contato@movelariaondemand.com.br
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

export default Privacy;
