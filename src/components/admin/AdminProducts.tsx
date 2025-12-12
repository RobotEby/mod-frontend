import { useState, useEffect } from 'react';
import { Plus, RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductTable } from '@/components/admin/ProductTable';
import { ProductForm } from '@/components/admin/ProductForm';
import { BulkActionBar } from '@/components/admin/BulkActionBar';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { productService, Product, Category } from '@/services/productService';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminProducts() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts({
          categoryId: categoryFilter !== 'all' ? categoryFilter : undefined,
          sortBy,
          sortOrder,
        }),
        productService.getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar os produtos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryFilter, sortBy, sortOrder]);

  const handleSubmit = async (data: any) => {
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, {
          ...data,
          gallery_images: data.gallery_images || [],
        });
        toast({ title: 'Produto atualizado com sucesso!' });
      } else {
        await productService.createProduct({
          ...data,
          gallery_images: data.gallery_images || [],
          dimensions: data.dimensions || '',
          lead_time: data.lead_time || '15-20 dias úteis',
        });
        toast({ title: 'Produto criado com sucesso!' });
      }
      setEditingProduct(null);
      setFormOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar produto',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await productService.deleteProduct(productId);
        toast({ title: 'Produto excluído com sucesso!' });
        fetchData();
      } catch (error: any) {
        toast({
          title: 'Erro ao excluir produto',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  const handleView = (productId: string) => {
    navigate(`/produto/${productId}`);
  };

  const handleDuplicate = async (productId: string) => {
    try {
      await productService.duplicateProduct(productId);
      toast({ title: 'Produto duplicado com sucesso!' });
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Erro ao duplicar produto',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleExportCSV = () => {
    productService.exportProductsToCSV(products, categories);
    toast({ title: 'Arquivo CSV exportado com sucesso!' });
  };

  const handleBulkDelete = async () => {
    try {
      const count = await productService.deleteProducts(selectedIds);
      toast({ title: `${count} produto(s) excluído(s) com sucesso!` });
      setSelectedIds([]);
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir produtos',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleBulkUpdateCategory = async (categoryId: string) => {
    try {
      const count = await productService.updateProductsCategory(selectedIds, categoryId);
      toast({ title: `Categoria atualizada em ${count} produto(s)!` });
      setSelectedIds([]);
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar categoria',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleBulkUpdateStock = async (quantity: number) => {
    try {
      const count = await productService.updateProductsStock(selectedIds, quantity);
      toast({ title: `Estoque atualizado em ${count} produto(s)!` });
      setSelectedIds([]);
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar estoque',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Gerenciamento de Produtos</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button variant="outline" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Data</SelectItem>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="price">Preço</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as any)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Ordem" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Decrescente</SelectItem>
            <SelectItem value="asc">Crescente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProductTable
        products={products}
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onDuplicate={handleDuplicate}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />

      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        categories={categories}
        initialData={editingProduct || undefined}
        isEditing={!!editingProduct}
      />

      <BulkActionBar
        selectedCount={selectedIds.length}
        categories={categories}
        onDelete={handleBulkDelete}
        onUpdateCategory={handleBulkUpdateCategory}
        onUpdateStock={handleBulkUpdateStock}
        onClearSelection={() => setSelectedIds([])}
      />
    </div>
  );
}
