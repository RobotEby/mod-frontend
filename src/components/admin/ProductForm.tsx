import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { ImageUploader, MultiImageUploader } from './ImageUploader';

const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z.string().max(500, 'Descrição deve ter no máximo 500 caracteres').optional(),
  price: z.coerce.number().positive('Preço deve ser maior que 0'),
  category_id: z.string().min(1, 'Selecione uma categoria'),
  dimensions: z.string().optional(),
  lead_time: z.string().optional(),
  stock_quantity: z.coerce.number().min(0, 'Quantidade não pode ser negativa').default(0),
  sku: z.string().optional(),
  is_on_sale: z.boolean().default(false),
  discount_percent: z.coerce.number().min(0).max(100).default(0),
  main_image_url: z.string().optional().or(z.literal('')),
  gallery_images: z.array(z.string()).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  categories: Category[];
  initialData?: Partial<ProductFormData & { gallery_images?: string[] }>;
  isEditing?: boolean;
}

export const ProductForm = ({
  open,
  onOpenChange,
  onSubmit,
  categories,
  initialData,
  isEditing = false,
}: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [galleryUrls, setGalleryUrls] = useState<string[]>(initialData?.gallery_images || []);
  const [mainImageUrl, setMainImageUrl] = useState<string>(initialData?.main_image_url || '');

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category_id: '',
      dimensions: '',
      lead_time: '',
      stock_quantity: 0,
      sku: '',
      is_on_sale: false,
      discount_percent: 0,
      main_image_url: '',
      gallery_images: [],
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: initialData?.name || '',
        description: initialData?.description || '',
        price: initialData?.price || 0,
        category_id: initialData?.category_id || '',
        dimensions: initialData?.dimensions || '',
        lead_time: initialData?.lead_time || '',
        stock_quantity: initialData?.stock_quantity || 0,
        sku: initialData?.sku || '',
        is_on_sale: initialData?.is_on_sale || false,
        discount_percent: initialData?.discount_percent || 0,
        main_image_url: initialData?.main_image_url || '',
        gallery_images: initialData?.gallery_images || [],
      });
      setGalleryUrls(initialData?.gallery_images || []);
      setMainImageUrl(initialData?.main_image_url || '');
    }
  }, [open, initialData, form]);

  const handleSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setLoading(true);
    try {
      await onSubmit({
        ...data,
        main_image_url: mainImageUrl,
        gallery_images: galleryUrls,
      });
      form.reset();
      setGalleryUrls([]);
      setMainImageUrl('');
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const watchIsOnSale = form.watch('is_on_sale');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Nome do Produto *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Mesa de Jantar Elegance" maxLength={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrição detalhada do produto..."
                        className="min-h-[100px]"
                        maxLength={500}
                        {...field}
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground text-right">
                      {field.value?.length || 0}/500
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: MESA-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0.00"
                        {...field}
                        value={field.value as number}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade em Estoque</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} value={field.value as number} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimensões (LxAxP)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 180x90x75cm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lead_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prazo de Produção</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 15-20 dias úteis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <ImageUploader
                  label="Imagem Principal *"
                  value={mainImageUrl}
                  onChange={setMainImageUrl}
                />
              </div>

              <div className="md:col-span-2">
                <MultiImageUploader
                  label="Galeria de Imagens"
                  values={galleryUrls}
                  onChange={setGalleryUrls}
                  maxImages={10}
                />
              </div>

              <div className="md:col-span-2 border-t border-border pt-4 mt-2">
                <h4 className="font-medium mb-4">Configurações de Promoção</h4>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="is_on_sale"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Produto em Promoção</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {watchIsOnSale && (
                    <FormField
                      control={form.control}
                      name="discount_percent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Percentual de Desconto (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              {...field}
                              value={field.value as number}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isEditing ? 'Salvar Alterações' : 'Criar Produto'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
