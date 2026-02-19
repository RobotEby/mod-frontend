import { useState } from 'react';
import { Minus, Plus, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  sku?: string;
  stock_quantity?: number;
  low_stock_threshold?: number;
  status?: string;
}

interface InventoryTableProps {
  products: Product[];
  onUpdateStock: (productId: string, newQuantity: number) => void;
}

type FilterStatus = 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';

export const InventoryTable = ({ products, onUpdateStock }: InventoryTableProps) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  const getStockStatus = (product: Product) => {
    const qty = product.stock_quantity || 0;
    const threshold = product.low_stock_threshold || 5;

    if (qty === 0) return 'out_of_stock';
    if (qty <= threshold) return 'low_stock';
    return 'in_stock';
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku?.toLowerCase().includes(search.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && getStockStatus(product) === filterStatus;
  });

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setEditValue(product.stock_quantity || 0);
  };

  const handleSaveEdit = (productId: string) => {
    onUpdateStock(productId, editValue);
    setEditingId(null);
  };

  const handleQuickAdjust = (productId: string, currentQty: number, delta: number) => {
    const newQty = Math.max(0, currentQty + delta);
    onUpdateStock(productId, newQty);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'low_stock':
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'out_of_stock':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <Badge className="bg-emerald-600">Em Estoque</Badge>;
      case 'low_stock':
        return <Badge className="bg-amber-600">Baixo Estoque</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Sem Estoque</Badge>;
      default:
        return null;
    }
  };

  const stats = {
    total: products.length,
    inStock: products.filter((p) => getStockStatus(p) === 'in_stock').length,
    lowStock: products.filter((p) => getStockStatus(p) === 'low_stock').length,
    outOfStock: products.filter((p) => getStockStatus(p) === 'out_of_stock').length,
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Total de Produtos</p>
          <p className="text-2xl font-roboto-bold text-foreground">{stats.total}</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Em Estoque</p>
          <p className="text-2xl font-roboto-bold text-emerald-600">{stats.inStock}</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Baixo Estoque</p>
          <p className="text-2xl font-roboto-bold text-amber-600">{stats.lowStock}</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Sem Estoque</p>
          <p className="text-2xl font-roboto-bold text-red-600">{stats.outOfStock}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar por nome ou SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as FilterStatus)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="in_stock">Em Estoque</SelectItem>
            <SelectItem value="low_stock">Baixo Estoque</SelectItem>
            <SelectItem value="out_of_stock">Sem Estoque</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>SKU</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead className="text-center">Limite Mínimo</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ajuste Rápido</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product);
              const isEditing = editingId === product.id;

              return (
                <TableRow key={product.id} className="hover:bg-muted/30">
                  <TableCell className="font-roboto-mono text-sm text-muted-foreground">
                    {product.sku || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(stockStatus)}
                      <span className="font-roboto-medium text-foreground">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-2">
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                          className="w-20 h-8 text-center"
                          min={0}
                        />
                        <Button size="sm" onClick={() => handleSaveEdit(product.id)}>
                          Salvar
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <span
                        className={cn(
                          'font-roboto-bold cursor-pointer hover:underline',
                          stockStatus === 'out_of_stock' && 'text-red-600',
                          stockStatus === 'low_stock' && 'text-amber-600',
                          stockStatus === 'in_stock' && 'text-foreground',
                        )}
                        onClick={() => handleStartEdit(product)}
                      >
                        {product.stock_quantity || 0}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {product.low_stock_threshold || 5}
                  </TableCell>
                  <TableCell className="text-center">{getStatusBadge(stockStatus)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuickAdjust(product.id, product.stock_quantity || 0, -1)
                        }
                        disabled={(product.stock_quantity || 0) === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuickAdjust(product.id, product.stock_quantity || 0, 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
