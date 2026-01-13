import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import {
  Mail,
  Phone,
  Clock,
  MessageSquare,
  Users,
  Package,
  Building2,
  ArrowRight,
  Truck,
  Shield,
  Wrench,
  Award,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

const Contact = () => {
  const stats = [
    { icon: Users, target: 5000, suffix: '+', label: 'Clientes Satisfeitos' },
    { icon: Package, target: 10000, suffix: '+', label: 'Móveis Entregues' },
    { icon: Building2, target: 50, suffix: '+', label: 'Marcenarias Parceiras' },
    { icon: Award, target: 15, suffix: '+', label: 'Anos de Experiência' },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'E-mail',
      value: 'contato@movelariaondemand.com.br',
      description: 'Resposta em até 24 horas úteis',
      action: 'mailto:contato@movelariaondemand.com.br',
      actionLabel: 'Enviar e-mail',
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '(11) 3000-0000',
      description: 'Segunda a sexta, 9h às 18h',
      action: 'tel:+551130000000',
      actionLabel: 'Ligar agora',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: '(11) 99999-9999',
      description: 'Atendimento rápido e personalizado',
      action: 'https://wa.me/5511999999999',
      actionLabel: 'Iniciar conversa',
      highlight: true,
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      value: 'Seg a Sex: 9h às 18h',
      description: 'Sábado: 9h às 13h',
      action: null,
      actionLabel: null,
    },
  ];

  const benefits = [
    {
      icon: Truck,
      title: 'Entrega em Todo Brasil',
      description: 'Enviamos para todas as regiões com rastreamento completo e seguro de carga.',
    },
    {
      icon: Shield,
      title: 'Garantia Estendida',
      description: 'Todos os móveis possuem garantia de 2 anos contra defeitos de fabricação.',
    },
    {
      icon: Wrench,
      title: 'Montagem Profissional',
      description: 'Equipe especializada para instalação com agendamento flexível.',
    },
    {
      icon: Award,
      title: 'Qualidade Certificada',
      description: 'Materiais de primeira linha e acabamento impecável em cada peça.',
    },
  ];

  const reasons = [
    'Atendimento personalizado do início ao fim',
    'Projetos exclusivos sob medida',
    'Preços competitivos direto da fábrica',
    'Acompanhamento em tempo real do pedido',
    'Suporte técnico especializado',
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 animate-fade-in">
              Transforme Seu Espaço com{' '}
              <span className="text-primary">Móveis de Alta Qualidade</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 animate-fade-in animation-delay-100 px-4">
              Aumente suas vendas criando orçamentos de forma mais rápida e sem erros. Nossa equipe
              está pronta para ajudar você a encontrar a solução perfeita.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-in animation-delay-200 px-4">
              <Button size="lg" className="w-full sm:w-auto gap-2 h-12 md:h-14 text-base" asChild>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-5 w-5" />
                  Fale com a nossa equipe no WhatsApp
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 h-12 md:h-14 text-base"
                asChild
              >
                <Link to="/catalogo">
                  Ver Catálogo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 md:w-64 md:h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 md:w-96 md:h-96 bg-primary rounded-full blur-3xl" />
        </div>
      </section>

      <section className="py-10 md:py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-4 md:p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2 md:mb-3" />
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  delay={index * 150}
                  duration={2000}
                  className="text-2xl md:text-3xl font-bold text-primary mb-1"
                />
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Entre em Contato</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
              Escolha a forma mais conveniente para falar conosco. Nossa equipe está pronta para
              atender você.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                className={`relative p-5 md:p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in ${
                  method.highlight ? 'bg-primary/5 border-primary/20' : 'bg-card'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {method.highlight && (
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-primary text-primary-foreground text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-medium">
                    Recomendado
                  </div>
                )}
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4 ${
                    method.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
                  }`}
                >
                  <method.icon
                    className={`h-5 w-5 md:h-6 md:w-6 ${method.highlight ? '' : 'text-primary'}`}
                  />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-1">{method.title}</h3>
                <p className="text-primary font-medium mb-1 text-sm md:text-base">{method.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  {method.description}
                </p>
                {method.action && (
                  <Button
                    variant={method.highlight ? 'default' : 'outline'}
                    size="sm"
                    className="w-full gap-2 h-9 md:h-10 text-sm"
                    asChild
                  >
                    <a
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                    >
                      {method.actionLabel}
                      <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in order-2 lg:order-1">
              <span className="text-primary font-medium text-sm md:text-base">Sobre Nós</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-4 md:mb-6">
                Móveis Sob Medida com a Qualidade que Você Merece
              </h2>
              <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
                Somos especialistas em conectar você às melhores marcenarias do Brasil. Nossa
                plataforma simplifica todo o processo de compra, desde o orçamento até a entrega,
                garantindo qualidade e transparência em cada etapa.
              </p>
              <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
                Com mais de 15 anos de experiência no mercado de móveis planejados, desenvolvemos um
                sistema que permite criar orçamentos de forma rápida, precisa e sem erros,
                otimizando seu tempo e aumentando suas vendas.
              </p>

              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {reasons.map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 md:gap-3 animate-fade-in text-sm md:text-base"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="gap-2 h-11 md:h-12" asChild>
                <Link to="/sobre">
                  Conheça Nossa História
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative animate-fade-in animation-delay-200 order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618219944342-824e40a13285?w=800&q=80"
                  alt="Móveis de alta qualidade"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-card p-4 md:p-6 rounded-xl border shadow-lg hidden sm:block">
                <div className="text-2xl md:text-3xl font-bold text-primary">98%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Taxa de satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">O Que Oferecemos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
              Qualidade, confiança e atendimento excepcional em cada detalhe
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="p-5 md:p-6 rounded-xl bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                  <benefit.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-base md:text-lg mb-2">{benefit.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Pronto para Transformar Seu Ambiente?
            </h2>
            <p className="text-base md:text-lg opacity-90 mb-6 md:mb-8">
              Entre em contato agora e receba um orçamento personalizado. Nossa equipe está pronta
              para atender você!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto gap-2 h-12 md:h-14 text-base"
                asChild
              >
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto gap-2 h-12 md:h-14 text-base"
                asChild
              >
                <Link to="/faq">
                  Perguntas Frequentes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center px-4">
            <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border mb-3 md:mb-4">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs md:text-sm font-medium">
                Tempo médio de resposta: 2 horas
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Respondemos todas as mensagens em até 24 horas úteis. Para urgências, utilize nosso
              WhatsApp para atendimento imediato.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
