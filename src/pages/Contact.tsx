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
    <main className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container px-4 py-8 md:py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-roboto-bold text-foreground mb-3 md:mb-4">
              Transforme Seu Espaço com{' '}
              <span className="text-primary">Móveis de Alta Qualidade</span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6">
              Aumente suas vendas criando orçamentos de forma mais rápida e sem erros. Nossa equipe
              está pronta para ajudar você a encontrar a solução perfeita.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button asChild size="lg" className="min-h-[44px]">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Fale com a nossa equipe no WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px]">
                <Link to="/catalogo" className="flex items-center gap-2">
                  Ver Catálogo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b bg-card">
        <div className="container px-4 py-6 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto mb-1 md:mb-2" />
                <p className="text-xl md:text-3xl font-roboto-bold text-foreground">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="container px-4 py-6 md:py-12">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-lg md:text-2xl font-roboto-bold text-foreground">Entre em Contato</h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Escolha a forma mais conveniente para falar conosco.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className={`relative p-4 md:p-6 rounded-xl border bg-card ${method.highlight ? 'border-primary' : ''}`}
            >
              {method.highlight && (
                <span className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] font-roboto-medium px-2 py-0.5 rounded-full">
                  Recomendado
                </span>
              )}
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <method.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <h3 className="text-sm md:text-base font-roboto-bold text-foreground">
                {method.title}
              </h3>
              <p className="text-xs md:text-sm font-roboto-medium text-foreground mt-1">
                {method.value}
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                {method.description}
              </p>
              {method.action && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="mt-3 min-h-[36px] p-0 text-primary"
                >
                  <a
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    {method.actionLabel}
                    <ChevronRight className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 border-y">
        <div className="container px-4 py-6 md:py-12">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <span className="text-primary text-xs md:text-sm font-roboto-semibold uppercase tracking-wider">
                Sobre Nós
              </span>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-roboto-bold text-foreground mt-1 mb-3 md:mb-4">
                Móveis Sob Medida com a Qualidade que Você Merece
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                Somos especialistas em conectar você às melhores marcenarias do Brasil. Nossa
                plataforma simplifica todo o processo de compra, desde o orçamento até a entrega.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                Com mais de 15 anos de experiência no mercado de móveis planejados, desenvolvemos um
                sistema que permite criar orçamentos de forma rápida, precisa e sem erros.
              </p>
              <ul className="space-y-2 mb-4">
                {reasons.map((reason, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm md:text-base text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="min-h-[44px]">
                <Link to="/sobre" className="flex items-center gap-2">
                  Conheça Nossa História
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative bg-card rounded-2xl border p-6 md:p-8 text-center shadow-sm">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
                <p className="text-2xl md:text-4xl font-roboto-bold text-foreground">98%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Taxa de satisfação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-6 md:py-12">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-lg md:text-2xl font-roboto-bold text-foreground">O Que Oferecemos</h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Qualidade, confiança e atendimento excepcional em cada detalhe
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="p-4 md:p-6 rounded-xl border bg-card text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <benefit.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h3 className="text-sm md:text-base font-roboto-bold text-foreground mb-1">
                {benefit.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t">
        <div className="container px-4 py-8 md:py-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 md:p-12 text-center">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-roboto-bold text-foreground mb-2 md:mb-3">
              Pronto para Transformar Seu Ambiente?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-xl mx-auto">
              Entre em contato agora e receba um orçamento personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
              <Button asChild size="lg" className="min-h-[44px]">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[44px]">
                <Link to="/faq" className="flex items-center gap-2">
                  Perguntas Frequentes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
