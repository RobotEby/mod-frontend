import { useAnimatedCounter } from './UseAnimatedCounter';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter = ({
  target,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) => {
  const { count, ref } = useAnimatedCounter({ target, duration, delay });

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count.toLocaleString('pt-BR')}
      {suffix}
    </div>
  );
};
