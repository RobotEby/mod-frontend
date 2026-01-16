import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentMethodSchema, PaymentMethodFormData } from '@/lib/validationSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Loader2, CreditCard } from 'lucide-react';

interface PaymentMethodFormProps {
  onSubmit: (data: PaymentMethodFormData) => Promise<void>;
}

export const PaymentMethodForm = ({ onSubmit }: PaymentMethodFormProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentMethodFormData>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      is_default: false,
    },
  });

  const submitWrapper = async (data: PaymentMethodFormData) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => (currentYear + i).toString().slice(-2));
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  return (
    <form
      onSubmit={handleSubmit(submitWrapper)}
      className="space-y-4 border p-4 rounded-lg bg-card"
    >
      <div className="space-y-2">
        <Label htmlFor="card_number">Número do Cartão</Label>
        <div className="relative">
          <Input
            id="card_number"
            {...register('card_number')}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className="pl-10"
          />
          <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        {errors.card_number && (
          <span className="text-red-500 text-xs">{errors.card_number.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardholder_name">Nome no Cartão</Label>
        <Input
          id="cardholder_name"
          {...register('cardholder_name')}
          placeholder="COMO ESTA NO CARTAO"
          className="uppercase"
        />
        {errors.cardholder_name && (
          <span className="text-red-500 text-xs">{errors.cardholder_name.message}</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Mês</Label>
          <Select onValueChange={(val) => setValue('expiry_month', val)}>
            <SelectTrigger>
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.expiry_month && (
            <span className="text-red-500 text-xs">{errors.expiry_month.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label>Ano</Label>
          <Select onValueChange={(val) => setValue('expiry_year', val)}>
            <SelectTrigger>
              <SelectValue placeholder="AA" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.expiry_year && (
            <span className="text-red-500 text-xs">{errors.expiry_year.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" {...register('cvv')} placeholder="123" maxLength={4} />
          {errors.cvv && <span className="text-red-500 text-xs">{errors.cvv.message}</span>}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_default_payment"
          onCheckedChange={(checked) => setValue('is_default', checked as boolean)}
        />
        <Label htmlFor="is_default_payment">Definir como cartão principal</Label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Salvar Cartão
      </Button>
    </form>
  );
};
