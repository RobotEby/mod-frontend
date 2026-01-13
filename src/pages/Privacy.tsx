import LegalPageSidebar from '@/components/LegalPageSideBar';

const navLinks = [
  { id: 'aceitacao', label: 'Aceitação dos Termos' },
  { id: 'definicoes', label: 'Definições' },
  { id: 'servicos', label: 'Nossos Serviços' },
  { id: 'responsabilidades', label: 'Suas Responsabilidades' },
  { id: 'dados', label: 'Dados Coletados' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'armazenamento', label: 'Armazenamento' },
  { id: 'direitos', label: 'Seus Direitos' },
  { id: 'compartilhamento', label: 'Compartilhamento' },
  { id: 'seguranca', label: 'Segurança' },
  { id: 'terceiros', label: 'Links de Terceiros' },
  { id: 'atualizacoes', label: 'Atualizações' },
];

const faqItems = [
  {
    question: 'O que são dados pessoais?',
    answer:
      'Dados pessoais são informações relacionadas a uma pessoa física identificada ou identificável, como nome, e-mail, telefone e endereço.',
  },
  {
    question: 'Como a MOD usa meus dados?',
    answer:
      'Utilizamos seus dados para viabilizar nossos serviços, como criação de projetos, geração de orçamentos e comunicação sobre seus pedidos.',
  },
  {
    question: 'Posso solicitar a exclusão dos meus dados?',
    answer:
      'Sim, você pode solicitar a exclusão dos seus dados a qualquer momento entrando em contato conosco pelo e-mail privacidade@movelariaondemand.com.br.',
  },
  {
    question: 'Meus dados são compartilhados com terceiros?',
    answer:
      'Seus dados são compartilhados apenas com prestadores de serviços essenciais para a execução dos nossos serviços, nunca sendo vendidos a terceiros.',
  },
  {
    question: 'Como alterar minhas preferências de cookies?',
    answer:
      'Você pode gerenciar suas preferências de cookies através do banner de consentimento exibido ao acessar nosso site ou nas configurações do seu navegador.',
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen py-8 md:py-12 lg:py-16">
      <div className="container max-w-6xl px-4">
        <div className="mb-8 lg:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Termos de Uso</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Última atualização: 12/01/2026
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <LegalPageSidebar title="Navegação Rápida" navLinks={navLinks} faqItems={faqItems} />

          <main className="flex-1 min-w-0">
            <div className="prose prose-sm md:prose-base max-w-none">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6 mb-8">
                <p className="text-base md:text-lg text-foreground m-0">
                  <strong>Olá, Usuário!</strong>
                  <br />
                  <br />
                  Seja bem-vindo(a) à Movelaria On Demand.
                  <br />
                  <br />
                  Este documento traz o nosso compromisso com todos que acessam nosso site e tem por
                  objetivo informar, de forma transparente, de que forma se dá o tratamento de dados
                  pessoais de cada pessoa que interage conosco.
                  <br />
                  <br />
                  Por isso, pedimos que leia este documento com atenção! Caso não haja a
                  concordância com quaisquer termos e condições, pedimos que nos contate através do
                  e-mail{' '}
                  <a
                    href="mailto:privacidade@movelariaondemand.com.br"
                    className="text-primary hover:underline"
                  >
                    privacidade@movelariaondemand.com.br
                  </a>{' '}
                  ou pare, imediatamente, com o uso da Plataforma e suas funcionalidades.
                </p>
              </div>

              <section id="aceitacao" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground">
                  Ao acessar e usar este site, você aceita e concorda em cumprir os termos e
                  condições aqui estabelecidos. Se você não concordar com qualquer parte destes
                  termos, não deve usar nosso site.
                </p>
              </section>

              <section id="definicoes" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">2. Definições</h2>
                <p className="text-muted-foreground mb-4">
                  Para que você, Usuário, tenha uma melhor compreensão deste documento, precisamos
                  que se atente para algumas definições:
                </p>
                <ul className="space-y-4 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Dados Pessoais:</strong> são os dados
                    relacionados a uma pessoa física, identificada ou identificável, fornecidos por
                    você, tal como nome, sobrenome e endereço de e-mail. Quando, através de uma
                    informação, for possível identificar uma pessoa, ainda que de forma indireta,
                    essa informação será considerada um dado pessoal para fins legais e desta
                    Política de Privacidade.
                  </li>
                  <li>
                    <strong className="text-foreground">Movelaria On Demand (MOD):</strong> pessoa
                    jurídica de direito privado, responsável pela plataforma e pelos serviços
                    oferecidos.
                  </li>
                  <li>
                    <strong className="text-foreground">Site ou Plataforma:</strong> espaço virtual
                    disponibilizado pela MOD, que possibilita que os diferentes usuários interajam e
                    definam termos de projetos de móveis, de acordo com as suas necessidades e
                    possibilidades de execução e entrega.
                  </li>
                  <li>
                    <strong className="text-foreground">Usuário:</strong> pessoa física que acessa e
                    interage com as funcionalidades do Site e, também, gera os projetos a serem
                    adquiridos.
                  </li>
                </ul>
              </section>

              <section id="servicos" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">3. Sobre Nossos Serviços</h2>
                <p className="text-muted-foreground">
                  Objetivando facilitar o dia a dia dos profissionais da marcenaria, madeireiras,
                  profissionais da construção civil e de todas as pessoas que desejam projetar,
                  comprar ou vender móveis de madeira, a MOD desenvolveu um sistema que permite a
                  criação e a elaboração de projetos, geração de orçamentos e start na produção em
                  um único lugar.
                </p>
                <p className="text-muted-foreground mt-4">
                  Assim como nos comprometemos em entregar a melhor experiência para os Usuários
                  navegarem pela nossa Plataforma, nós nos comprometemos com a transparência e a
                  segurança dos dados de cada uma das pessoas que interage conosco.
                </p>
              </section>

              <section id="responsabilidades" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">4. Suas Responsabilidades</h2>
                <p className="text-muted-foreground">
                  Você se compromete a fornecer suas informações de forma verdadeira e precisa e a
                  utilizar nossa Plataforma de maneira coerente com os fins para os quais ela foi
                  desenvolvida.
                </p>
                <p className="text-muted-foreground mt-4">
                  Você se compromete, ainda, a informar dados que digam respeito tão somente a você
                  e, se necessário o tratamento de dados pessoais de terceiros, que você possui a
                  capacidade e legalidade de realizar este tratamento.
                </p>
              </section>

              <section id="dados" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">5. Dados Pessoais Coletados</h2>
                <p className="text-muted-foreground mb-4">
                  Coletamos Dados Pessoais fornecidos diretamente por você e, também,
                  automaticamente, a partir das suas atividades de navegação. Prezamos por manter os
                  seus Dados apenas pelo tempo necessário para o cumprimento das finalidades de
                  tratamento.
                </p>

                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-sm border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-3 text-left font-semibold">Dados Pessoais</th>
                        <th className="border p-3 text-left font-semibold">Finalidade</th>
                        <th className="border p-3 text-left font-semibold">Momento da Coleta</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3 text-muted-foreground">
                          Nome completo, telefone, e-mail, senha
                        </td>
                        <td className="border p-3 text-muted-foreground">
                          Criação ou atualização do seu perfil e viabilização das interações
                        </td>
                        <td className="border p-3 text-muted-foreground">Cadastro no site</td>
                      </tr>
                      <tr>
                        <td className="border p-3 text-muted-foreground">Endereço de entrega</td>
                        <td className="border p-3 text-muted-foreground">
                          Envio de produtos e cálculo de frete
                        </td>
                        <td className="border p-3 text-muted-foreground">Checkout</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="cookies" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">6. Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Cookies são pequenos arquivos de texto dos sites que, quando visitados por você,
                  permitem manter uma memória sobre sua navegação. Nós utilizamos Cookies mantidos
                  por nós e, também, mantidos e administrados por outras empresas.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Cookies Necessários</h3>
                <p className="text-muted-foreground">
                  Esses Cookies são essenciais para que as nossas páginas funcionem adequadamente.
                  Eles não podem ser desabilitados, pois a disponibilização das nossas páginas
                  ficará comprometida.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Cookies Analíticos</h3>
                <p className="text-muted-foreground">
                  Os cookies analíticos nos permitem manter controle sobre as visitas e as fontes de
                  tráfego dentro de nossas páginas, para que possamos medir e melhorar a performance
                  dos nossos sites.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Cookies de Marketing</h3>
                <p className="text-muted-foreground">
                  Os cookies de marketing podem ser utilizados por parceiros de publicidade para
                  entender as suas preferências e mostrar quais os anúncios fazem mais sentido e são
                  mais relevantes para você.
                </p>
              </section>

              <section id="armazenamento" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">7. Tempo de Armazenamento</h2>
                <p className="text-muted-foreground">
                  Todos os Dados Pessoais coletados pela MOD são armazenados pelo tempo necessário
                  para atender as finalidades descritas neste documento, para cumprimento dos
                  contratos firmados através da Plataforma ou até que você, Usuário, exerça os seus
                  direitos de oposição ou cancelamento.
                </p>
                <p className="text-muted-foreground mt-4">
                  De toda forma, será possível manter os Dados armazenados para resguardar seus
                  direitos, cumprir ordens judiciais ou requisições emanadas de autoridades
                  competentes.
                </p>
              </section>

              <section id="direitos" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">8. Seus Direitos</h2>
                <p className="text-muted-foreground mb-4">
                  Você pode solicitar, a qualquer momento, mediante envio de e-mail ao endereço{' '}
                  <a
                    href="mailto:privacidade@movelariaondemand.com.br"
                    className="text-primary hover:underline"
                  >
                    privacidade@movelariaondemand.com.br
                  </a>
                  :
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>A confirmação da existência do tratamento de seus Dados Pessoais</li>
                  <li>A correção dos Dados Pessoais incompletos, inexatos ou desatualizados</li>
                  <li>O bloqueio, anonimização ou eliminação dos Dados Pessoais desnecessários</li>
                  <li>A portabilidade dos seus Dados Pessoais</li>
                  <li>A revogação do consentimento dado para Dados Pessoais específicos</li>
                  <li>
                    Informações sobre as entidades com as quais há o compartilhamento de dados
                  </li>
                </ul>
              </section>

              <section id="compartilhamento" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">9. Compartilhamento de Dados</h2>
                <p className="text-muted-foreground">
                  Nós apenas compartilhamos suas informações com nossos colaboradores, prestadores
                  de serviços e fornecedores, mediante o uso de ferramentas seguras, para que possam
                  executar as finalidades mencionadas acima.
                </p>
                <p className="text-muted-foreground mt-4 font-semibold">
                  Em hipótese nenhuma nós vendemos seus Dados Pessoais para terceiros.
                </p>
              </section>

              <section id="seguranca" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  10. Segurança das Informações
                </h2>
                <p className="text-muted-foreground">
                  A MOD armazena os dados coletados em servidores seguros e são empregados todos os
                  esforços razoáveis de mercado com o objetivo de preservar a segurança dos dados.
                </p>
                <p className="text-muted-foreground mt-4">
                  Se houver alguma violação, alteração, invasão ou evento semelhante, vamos informar
                  a você a extensão das violações, os dados impactados e nossas estratégias de
                  solução.
                </p>
              </section>

              <section id="terceiros" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">11. Links de Terceiros</h2>
                <p className="text-muted-foreground">
                  Nossos sites podem fornecer links para sites de terceiros. Como não temos controle
                  sobre esses sites, o Usuário reconhece e concorda que a MOD não é responsável pela
                  disponibilidade dos sites, e não endossa qualquer conteúdo, publicidade, produtos,
                  serviços ou outros materiais disponíveis em sites de terceiros.
                </p>
              </section>

              <section id="atualizacoes" className="scroll-mt-28 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">12. Atualizações dos Termos</h2>
                <p className="text-muted-foreground">
                  Estes Termos podem ser alterados a qualquer momento, a critério da MOD, informando
                  as principais alterações ao Usuário por meio de nota em destaque na Plataforma.
                </p>
                <p className="text-muted-foreground mt-4">
                  Em caso de alterações significativas ou que reduzam os direitos dos Usuários, a
                  MOD enviará, previamente, um e-mail aos Usuários cadastrados.
                </p>
              </section>

              <div className="mt-12 p-4 md:p-6 bg-muted/50 rounded-xl border">
                <p className="text-sm text-muted-foreground m-0">
                  Se você leu, compreendeu e está de acordo com nossos Termos de Uso, acordamos com
                  a sua utilização do Site.
                </p>
                <p className="text-sm text-muted-foreground mt-4 m-0">
                  <strong>Última atualização:</strong> 12/01/2026
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Terms;
