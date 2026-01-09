import { CreditCard } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface InstallmentCalculatorProps {
  price: number;
  maxInstallments?: number;
}

export const InstallmentCalculator = ({
  price,
  maxInstallments = 12,
}: InstallmentCalculatorProps) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const installments = Array.from({ length: maxInstallments }, (_, i) => {
    const numInstallments = i + 1;
    const installmentValue = price / numInstallments;
    return {
      num: numInstallments,
      value: installmentValue,
      noInterest: numInstallments <= 12,
    };
  });

  const mainInstallment = installments[11];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <CreditCard className="h-4 w-4 text-primary" />
        <span>
          ou{' '}
          <span className="font-bold text-primary">
            {mainInstallment.num}x de {formatCurrency(mainInstallment.value)}
          </span>{' '}
          sem juros
        </span>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
            Ver todas as opções de parcelamento
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="start">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Opções de Parcelamento</h4>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {installments.map((inst) => (
                <div
                  key={inst.num}
                  className="flex justify-between items-center py-1 text-sm border-b border-border last:border-0"
                >
                  <span>
                    {inst.num}x de{' '}
                    <span className="font-semibold">{formatCurrency(inst.value)}</span>
                  </span>
                  {inst.noInterest && (
                    <span className="text-xs text-primary font-medium">sem juros</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Total à vista: {formatCurrency(price)}</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
