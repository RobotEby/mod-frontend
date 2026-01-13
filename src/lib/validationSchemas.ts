import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const addressSchema = z.object({
  nickname: z.string().optional(),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  zip_code: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  reference: z.string().optional(),
  is_default: z.boolean().default(false),
});

export const paymentMethodSchema = z.object({
  cardholder_name: z.string().min(1, 'Nome no cartão é obrigatório'),
  card_number: z.string().regex(/^\d{16}$/, 'Número do cartão inválido'),
  expiry_month: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Mês inválido'),
  expiry_year: z.string().regex(/^\d{2}$/, 'Ano inválido'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV inválido'),
  is_default: z.boolean().optional(),
});

export const profileSchema = z.object({
  full_name: z.string().min(1, 'Nome completo é obrigatório'),
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/, 'Telefone inválido')
    .optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;
export type PaymentMethodFormData = z.infer<typeof paymentMethodSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
