import { useState, useEffect, useRef } from 'react';
import { Users, Package, Star, ThumbsUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Clientes Satisfeitos',
  },
  {
    icon: Package,
    value: 10000,
    suffix: '+',
    label: 'Móveis Entregues',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '',
    label: 'Avaliação Média',
    decimals: 1,
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: '%',
    label: 'Recomendam',
  },
];

const useCountUp = (end: number, duration: number = 2000, decimals: number = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

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
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [hasStarted, end, duration, decimals]);

  return { count, ref };
};

export const SocialProof = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const { count, ref } = useCountUp(stat.value, 2000, stat.decimals || 0);

            return (
              <div key={stat.label} ref={ref} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.decimals ? count.toFixed(stat.decimals) : Math.round(count)}
                  {stat.suffix}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
