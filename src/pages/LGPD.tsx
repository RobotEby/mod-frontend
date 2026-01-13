import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText, Users, ChevronRight } from 'lucide-react';
import LegalPageSidebar from '@/components/LegalPageSideBar';

const navLinks = [
  { id: 'o-que-e', label: 'O que é LGPD?' },
  { id: 'objetivos', label: 'Objetivos da LGPD' },
  { id: 'conformidade', label: 'MOD e a LGPD' },
  { id: 'atuacao', label: 'Nossa Atuação' },
];

const faqItems = [
  {
    question: 'O que é LGPD?',
    answer:
      'A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) é a legislação brasileira que regulamenta o tratamento de dados pessoais por empresas e organizações.',
  },
  {
    question: 'Quais são meus direitos?',
    answer:
      'Você tem direito a acessar, corrigir, excluir seus dados, além de revogar consentimento e solicitar portabilidade dos dados.',
  },
  {
    question: 'Como a MOD protege meus dados?',
    answer:
      'Utilizamos criptografia, controles de acesso rigorosos, servidores seguros e seguimos as melhores práticas de segurança da informação.',
  },
  {
    question: 'Como solicitar meus dados?',
    answer:
      'Entre em contato pelo e-mail privacidade@movelariaondemand.com.br informando seu nome e e-mail cadastrado.',
  },
  {
    question: 'Onde buscar mais informações?',
    answer:
      'Consulte nosso Aviso de Privacidade e Termos de Uso, ou entre em contato conosco para esclarecer qualquer dúvida.',
  },
];

const LGPD = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 md:py-16 lg:py-20">
        <div className="container max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                <span>Em Conformidade</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6">
                A Movelaria On Demand está em conformidade com a LGPD
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Nos tornamos mais simples criar, orçar e produzir os móveis do seu cliente, tudo
                isso enquanto protegemos os dados pessoais de cada cliente que utiliza nossas
                plataformas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <Link
                  to="/privacidade"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Aviso de Privacidade
                </Link>
                <Link
                  to="/termos"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Termos de Uso
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-16">
        <div className="container max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <LegalPageSidebar
              title="Lei Geral de Proteção de Dados"
              navLinks={navLinks}
              faqItems={faqItems}
              faqTitle="Perguntas Frequentes"
            />

            <main className="flex-1 min-w-0">
              <div className="prose prose-sm md:prose-base max-w-none">
                <section id="o-que-e" className="scroll-mt-28 mb-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">O que é LGPD?</h2>
                  <p className="text-muted-foreground">
                    A Lei Geral de Proteção de Dados Pessoais (LGPD) entrou em vigor em 2020,
                    visando regulamentar o tratamento de dados pessoais pelas empresas, uma vez que
                    os dados pessoais ganharam grande importância na economia moderna, pois permitem
                    fazer predições, analisar perfis de consumo, opinião, entre outras atividades.
                  </p>
                </section>

                <section id="objetivos" className="scroll-mt-28 mb-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-6">
                    Os principais Objetivos da LGPD
                  </h2>
                  <div className="grid gap-4 md:gap-6">
                    <div className="flex items-start gap-4 p-4 md:p-6 bg-card border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Direito à Privacidade</h3>
                        <p className="text-sm text-muted-foreground">
                          Assegurar o direito à privacidade e à proteção de dados pessoais dos
                          usuários.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 md:p-6 bg-card border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Regras Claras</h3>
                        <p className="text-sm text-muted-foreground">
                          Estabelecer regras claras sobre o tratamento de dados pessoais.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 md:p-6 bg-card border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Segurança e Confiança</h3>
                        <p className="text-sm text-muted-foreground">
                          Fortalecer a segurança e a confiança do titular no tratamento de dados
                          pessoais, garantindo a defesa das relações comerciais e de consumo.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 md:p-6 bg-card border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Desenvolvimento Econômico</h3>
                        <p className="text-sm text-muted-foreground">
                          Desenvolvimento econômico, tecnológico e inovação, bem como livre
                          iniciativa, livre concorrência e a defesa do consumidor.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="conformidade" className="scroll-mt-28 mb-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">
                    A Movelaria On Demand e a LGPD
                  </h2>
                  <p className="text-muted-foreground">
                    A LGPD entrou em vigor em setembro de 2020, com isso foram realizadas melhorias
                    nos processos de coleta e tratamento dos dados. Além disso, atualizamos nossas
                    políticas, normas e contratos para se adequar à nova lei e fornecer maior
                    segurança na proteção dos dados de clientes.
                  </p>
                </section>

                <section id="atuacao" className="scroll-mt-28 mb-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">
                    Atuação da Movelaria On Demand
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    A MOD já aderiu ao LGPD, promovendo avanços nos sistemas, elaborando um plano de
                    orientações de como nossos colaboradores devem agir em conformidade e está
                    capacitando parceiros no tema da privacidade de dados.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <h4 className="font-semibold mb-2">Políticas Atualizadas</h4>
                      <p className="text-sm text-muted-foreground">
                        Termos de uso e avisos de privacidade em conformidade com a legislação.
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <h4 className="font-semibold mb-2">Segurança de Dados</h4>
                      <p className="text-sm text-muted-foreground">
                        Criptografia e controles de acesso para proteger suas informações.
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <h4 className="font-semibold mb-2">Treinamento Contínuo</h4>
                      <p className="text-sm text-muted-foreground">
                        Equipe capacitada em privacidade e proteção de dados.
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <h4 className="font-semibold mb-2">Canal de Atendimento</h4>
                      <p className="text-sm text-muted-foreground">
                        E-mail dedicado para solicitações relacionadas à LGPD.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                  <h3 className="text-lg md:text-xl font-bold mb-4">
                    Precisa exercer seus direitos?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Entre em contato conosco para qualquer solicitação relacionada aos seus dados
                    pessoais.
                  </p>
                  <a
                    href="mailto:privacidade@movelariaondemand.com.br"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    privacidade@movelariaondemand.com.br
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-xl border">
                  <p className="text-sm text-muted-foreground m-0">
                    <strong>Última atualização:</strong> 12 de Janeiro de 2026
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LGPD;
