import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentMethodSchema, PaymentMethodFormData } from '@/lib/validationSchemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface PaymentMethodFormProps {
  onSubmit: (data: PaymentMethodFormData) => Promise<void>;
  submitLabel?: string;
}

export const PaymentMethodForm = ({
  onSubmit,
  submitLabel = 'Adicionar Cartão',
}: PaymentMethodFormProps) => {
  const form = useForm({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardholder_name: '',
      card_number: '',
      expiry_month: '',
      expiry_year: '',
      cvv: '',
      is_default: false,
    },
  } as const);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="card_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número do Cartão</FormLabel>
              <FormControl>
                <Input
                  placeholder="0000 0000 0000 0000"
                  value={formatCardNumber(field.value)}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\s/g, '');
                    if (/^\d*$/.test(cleaned) && cleaned.length <= 16) {
                      field.onChange(cleaned);
                    }
                  }}
                  maxLength={19}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardholder_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome no Cartão</FormLabel>
              <FormControl>
                <Input placeholder="Como está impresso no cartão" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="expiry_month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mês</FormLabel>
                <FormControl>
                  <Input placeholder="MM" {...field} maxLength={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiry_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano</FormLabel>
                <FormControl>
                  <Input placeholder="AA" {...field} maxLength={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input placeholder="000" type="password" {...field} maxLength={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_default"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="save_card" />
              </FormControl>
              <Label htmlFor="save_card" className="!mt-0 cursor-pointer">
                Salvar cartão para próximas compras
              </Label>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Adicionando...' : submitLabel}
        </Button>
      </form>
    </Form>
  );
};
