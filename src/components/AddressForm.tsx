import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addressSchema, AddressFormData } from '@/lib/validationSchemas';
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
import { fetchAddressByZipCode } from '@/lib/viaCepService';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => Promise<void>;
  defaultValues?: Partial<AddressFormData>;
  submitLabel?: string;
}

export const AddressForm = ({
  onSubmit,
  defaultValues,
  submitLabel = 'Salvar Endereço',
}: AddressFormProps) => {
  const [isLoadingZipCode, setIsLoadingZipCode] = useState(false);

  const form = useForm<z.input<typeof addressSchema>, unknown, AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zip_code: '',
      reference: '',
      is_default: false,
      ...defaultValues,
    },
  });

  const handleZipCodeBlur = async () => {
    const zipCode = form.getValues('zip_code');
    if (!zipCode) return;

    setIsLoadingZipCode(true);
    try {
      const addressData = await fetchAddressByZipCode(zipCode);
      if (addressData) {
        form.setValue('street', addressData.logradouro, { shouldValidate: true });
        form.setValue('neighborhood', addressData.bairro, { shouldValidate: true });
        form.setValue('city', addressData.localidade, { shouldValidate: true });
        form.setValue('state', addressData.uf, { shouldValidate: true });
      }
    } finally {
      setIsLoadingZipCode(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apelido (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Casa, Trabalho" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="zip_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="00000-000"
                      {...field}
                      onBlur={handleZipCodeBlur}
                      maxLength={9}
                    />
                    {isLoadingZipCode && (
                      <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da rua" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Complemento (Opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apt, Bloco, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do bairro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="UF" {...field} maxLength={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ponto de Referência (Opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Próximo a..." {...field} />
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
                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="is_default" />
              </FormControl>
              <Label htmlFor="is_default" className="!mt-0 cursor-pointer">
                Definir como endereço padrão
              </Label>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
      </form>
    </Form>
  );
};
