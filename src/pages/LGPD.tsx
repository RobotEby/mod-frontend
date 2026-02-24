import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText, Users, ChevronRight } from 'lucide-react';
import LegalPageSidebar from '@/components/LegalPageSideBar';

const navLinks = [
  { id: 'o-que-e', label: 'O que é LGPD?' },
  { id: 'objetivos', label: 'Objetivos da LGPD' },
  { id: 'conformidade', label: 'MOD e a LGPD' },
  { id: 'atuacao', label: 'Nossa Atuação' },
];

const LGPD = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container px-4 py-8 md:py-16">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-roboto-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 md:mb-4">
                <Shield className="h-3.5 w-3.5" />
                Em Conformidade
              </span>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-roboto-bold text-foreground mb-3 md:mb-4">
                A Movelaria On Demand está em conformidade com a LGPD
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6">
                Nos tornamos mais simples criar, orçar e produzir os móveis do seu cliente, tudo
                isso enquanto protegemos os dados pessoais de cada cliente que utiliza nossas
                plataformas.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <Link
                  to="/privacidade"
                  className="inline-flex items-center gap-2 text-sm font-roboto-medium text-primary hover:underline min-h-[44px]"
                >
                  <FileText className="h-4 w-4" />
                  Aviso de Privacidade
                </Link>
                <Link
                  to="/termos"
                  className="inline-flex items-center gap-2 text-sm font-roboto-medium text-primary hover:underline min-h-[44px]"
                >
                  <FileText className="h-4 w-4" />
                  Termos de Uso
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-12 w-12 md:h-20 md:w-20 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          <LegalPageSidebar navLinks={navLinks} title={''} faqItems={[]} />

          <div className="flex-1 max-w-3xl">
            <div className="space-y-6 md:space-y-10">
              <section id="o-que-e">
                <h2 className="text-lg md:text-2xl font-roboto-bold mb-2 md:mb-3 text-foreground">
                  O que é LGPD?
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  A Lei Geral de Proteção de Dados Pessoais (LGPD) entrou em vigor em 2020, visando
                  regulamentar o tratamento de dados pessoais pelas empresas, uma vez que os dados
                  pessoais ganharam grande importância na economia moderna, pois permitem fazer
                  predições, analisar perfis de consumo, opinião, entre outras atividades.
                </p>
              </section>

              <section id="objetivos">
                <h2 className="text-lg md:text-2xl font-roboto-bold mb-3 md:mb-4 text-foreground">
                  Os principais Objetivos da LGPD
                </h2>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    {
                      icon: Lock,
                      title: 'Direito à Privacidade',
                      description:
                        'Assegurar o direito à privacidade e à proteção de dados pessoais dos usuários.',
                    },
                    {
                      icon: FileText,
                      title: 'Regras Claras',
                      description:
                        'Estabelecer regras claras sobre o tratamento de dados pessoais.',
                    },
                    {
                      icon: Shield,
                      title: 'Segurança e Confiança',
                      description:
                        'Fortalecer a segurança e a confiança do titular no tratamento de dados pessoais, garantindo a defesa das relações comerciais e de consumo.',
                    },
                    {
                      icon: Users,
                      title: 'Desenvolvimento Econômico',
                      description:
                        'Desenvolvimento econômico, tecnológico e inovação, bem como livre iniciativa, livre concorrência e a defesa do consumidor.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-card border"
                    >
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm md:text-base font-roboto-semibold mb-0.5 text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="conformidade">
                <h2 className="text-lg md:text-2xl font-roboto-bold mb-2 md:mb-3 text-foreground">
                  A Movelaria On Demand e a LGPD
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  A LGPD entrou em vigor em setembro de 2020, com isso foram realizadas melhorias
                  nos processos de coleta e tratamento dos dados. Além disso, atualizamos nossas
                  políticas, normas e contratos para se adequar à nova lei e fornecer maior
                  segurança na proteção dos dados de clientes.
                </p>
              </section>

              <section id="atuacao">
                <h2 className="text-lg md:text-2xl font-roboto-bold mb-2 md:mb-3 text-foreground">
                  Atuação da Movelaria On Demand
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                  A MOD já aderiu ao LGPD, promovendo avanços nos sistemas, elaborando um plano de
                  orientações de como nossos colaboradores devem agir em conformidade e está
                  capacitando parceiros no tema da privacidade de dados.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    {
                      title: 'Políticas Atualizadas',
                      desc: 'Termos de uso e avisos de privacidade em conformidade com a legislação.',
                    },
                    {
                      title: 'Segurança de Dados',
                      desc: 'Criptografia e controles de acesso para proteger suas informações.',
                    },
                    {
                      title: 'Treinamento Contínuo',
                      desc: 'Equipe capacitada em privacidade e proteção de dados.',
                    },
                    {
                      title: 'Canal de Atendimento',
                      desc: 'E-mail dedicado para solicitações relacionadas à LGPD.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="p-3 md:p-4 rounded-xl bg-muted/50 border">
                      <h3 className="text-sm md:text-base font-roboto-semibold mb-1 text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-roboto-bold mb-2 text-foreground">
                  Precisa exercer seus direitos?
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-3">
                  Entre em contato conosco para qualquer solicitação relacionada aos seus dados
                  pessoais.
                </p>
                <a
                  href="mailto:privacidade@movelariaondemand.com.br"
                  className="inline-flex items-center gap-2 text-primary font-roboto-medium text-sm hover:underline min-h-[44px]"
                >
                  privacidade@movelariaondemand.com.br
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div className="text-xs md:text-sm text-muted-foreground">
                Última atualização: 12 de Janeiro de 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LGPD;
