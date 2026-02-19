import { useState, useEffect, useRef } from 'react';
import { Users, Package, Star, ThumbsUp } from 'lucide-react';

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Mais de 10 mil Clientes Satisfeitos' },
  { icon: Package, value: 10000, suffix: '+', label: '10.000+ Móveis Entregues ' },
  { icon: Star, value: 4.9, suffix: '', label: '4.9/5 Avaliação Média ', decimals: 1 },
  { icon: ThumbsUp, value: 98, suffix: '%', label: '98% dos Clientes Recomendam' },
];

const useCountUp = (end: number, duration = 2000, decimals = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Number((eased * end).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasStarted, end, duration, decimals]);

  return { count, ref };
};

export const SocialProof = () => {
  return (
    <section className="py-6 md:py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat) => {
            const { count, ref } = useCountUp(stat.value, 2000, stat.decimals || 0);
            return (
              <div key={stat.label} ref={ref} className="text-center group">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-primary/10 mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-5 w-5 md:h-8 md:w-8 text-primary" />
                </div>
                <div className="text-xl md:text-3xl lg:text-4xl font-roboto-bold text-foreground mb-0.5 md:mb-1">
                  {stat.decimals ? count.toFixed(stat.decimals) : Math.round(count)}
                  {stat.suffix}
                </div>
                <p className="text-[10px] md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
