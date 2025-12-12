import { useState } from 'react';
import { Trash2, FolderEdit, Package, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/services/productService';

interface BulkActionBarProps {
  selectedCount: number;
  categories: Category[];
  onDelete: () => Promise<void>;
  onUpdateCategory: (categoryId: string) => Promise<void>;
  onUpdateStock: (quantity: number) => Promise<void>;
  onClearSelection: () => void;
}

export function BulkActionBar({
  selectedCount,
  categories,
  onDelete,
  onUpdateCategory,
  onUpdateStock,
  onClearSelection,
}: BulkActionBarProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState<string>('');
  const [loading, setLoading] = useState(false);

  if (selectedCount === 0) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
      setDeleteDialogOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;
    setLoading(true);
    try {
      await onUpdateCategory(selectedCategory);
      setCategoryDialogOpen(false);
      setSelectedCategory('');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async () => {
    const qty = parseInt(stockQuantity);
    if (isNaN(qty) || qty < 0) return;
    setLoading(true);
    try {
      await onUpdateStock(qty);
      setStockDialogOpen(false);
      setStockQuantity('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-card border border-border shadow-lg rounded-lg p-3 flex items-center gap-3 animate-in slide-in-from-bottom-4">
        <div className="flex items-center gap-2 pr-3 border-r border-border">
          <span className="text-sm font-medium">
            {selectedCount} {selectedCount === 1 ? 'item selecionado' : 'itens selecionados'}
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClearSelection}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCategoryDialogOpen(true)}>
            <FolderEdit className="h-4 w-4 mr-2" />
            Categoria
          </Button>

          <Button variant="outline" size="sm" onClick={() => setStockDialogOpen(true)}>
            <Package className="h-4 w-4 mr-2" />
            Estoque
          </Button>

          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produtos selecionados?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. {selectedCount}{' '}
              {selectedCount === 1 ? 'produto será excluído' : 'produtos serão excluídos'}{' '}
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar categoria</DialogTitle>
            <DialogDescription>
              Selecione a nova categoria para {selectedCount}{' '}
              {selectedCount === 1 ? 'produto' : 'produtos'}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="category">Nova Categoria</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCategoryDialogOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button onClick={handleUpdateCategory} disabled={loading || !selectedCategory}>
              {loading ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={stockDialogOpen} onOpenChange={setStockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar estoque</DialogTitle>
            <DialogDescription>
              Defina a nova quantidade em estoque para {selectedCount}{' '}
              {selectedCount === 1 ? 'produto' : 'produtos'}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="stock">Nova Quantidade</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              placeholder="0"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStockDialogOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateStock} disabled={loading || !stockQuantity}>
              {loading ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
