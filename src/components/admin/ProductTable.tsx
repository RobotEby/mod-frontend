import { useState } from 'react';
import { Edit, Trash2, MoreHorizontal, Eye, Copy, Star } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Product, ProductReviewStats } from '@/services/productService';

interface ProductTableProps {
  products: Product[];
  categories: { id: string; name: string }[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onView: (productId: string) => void;
  onDuplicate?: (productId: string) => void;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

const ITEMS_PER_PAGE = 10;

export const ProductTable = ({
  products,
  categories,
  onEdit,
  onDelete,
  onView,
  onDuplicate,
  selectedIds,
  onSelectionChange,
}: ProductTableProps) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Sem categoria';
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || 'Desconhecida';
  };

  const renderRating = (reviewStats?: ProductReviewStats) => {
    if (!reviewStats || reviewStats.total_reviews === 0) {
      return <span className="text-muted-foreground text-sm">Sem avaliações</span>;
    }
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="font-roboto-medium">{reviewStats.average_rating.toFixed(1)}</span>
        <span className="text-muted-foreground text-sm">({reviewStats.total_reviews})</span>
      </div>
    );
  };

  const isAllSelected =
    paginatedProducts.length > 0 && paginatedProducts.every((p) => selectedIds.includes(p.id));

  const isSomeSelected =
    paginatedProducts.some((p) => selectedIds.includes(p.id)) && !isAllSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newIds = [...new Set([...selectedIds, ...paginatedProducts.map((p) => p.id)])];
      onSelectionChange(newIds);
    } else {
      const pageIds = paginatedProducts.map((p) => p.id);
      onSelectionChange(selectedIds.filter((id) => !pageIds.includes(id)));
    }
  };

  const handleSelectOne = (productId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, productId]);
    } else {
      onSelectionChange(selectedIds.filter((id) => id !== productId));
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar produtos por nome..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="max-w-sm"
      />

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelected ? true : isSomeSelected ? 'indeterminate' : false}
                  onCheckedChange={handleSelectAll}
                  aria-label="Selecionar todos"
                />
              </TableHead>
              <TableHead className="w-[80px]">Imagem</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-center">Avaliação</TableHead>
              <TableHead className="text-center">Estoque</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow
                key={product.id}
                className={cn(
                  'hover:bg-muted/30',
                  selectedIds.includes(product.id) && 'bg-primary/5',
                )}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(product.id)}
                    onCheckedChange={(checked) => handleSelectOne(product.id, !!checked)}
                    aria-label={`Selecionar ${product.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                    {product.main_image_url ? (
                      <img
                        src={product.main_image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        N/A
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-roboto-medium text-foreground">{product.name}</p>
                    {product.is_on_sale && (
                      <Badge
                        variant="outline"
                        className="mt-1 text-xs border-emerald-600 text-emerald-600"
                      >
                        {product.discount_percent}% OFF
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {getCategoryName(product.category_id)}
                </TableCell>
                <TableCell className="text-right font-roboto-medium">
                  R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-center">{renderRating(product.review_stats)}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      'font-roboto-medium',
                      (product.stock_quantity || 0) === 0
                        ? 'text-destructive'
                        : (product.stock_quantity || 0) <= 5
                          ? 'text-amber-600'
                          : 'text-foreground',
                    )}
                  >
                    {product.stock_quantity || 0}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(product.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(product)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      {onDuplicate && (
                        <DropdownMenuItem onClick={() => onDuplicate(product.id)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(product.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {paginatedProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de{' '}
            {filteredProducts.length} produtos
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page: number;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="sm"
                    className="w-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
