import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'admin-recent-searches';
const MAX_RECENT = 5;

interface SearchResult {
  id: string;
  name: string;
  type: 'product' | 'category' | 'sku';
  highlight?: string;
}

interface AdminSearchBarProps {
  products: Array<{ id: string; name: string; sku: string; category_id: string | null }>;
  categories: Array<{ id: string; name: string }>;
  onSearch: (query: string) => void;
  onProductSelect?: (productId: string) => void;
  className?: string;
}

export const AdminSearchBar = ({
  products,
  categories,
  onSearch,
  onProductSelect,
  className,
}: AdminSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    products.forEach((product) => {
      if (product.name.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: product.id,
          name: product.name,
          type: 'product',
        });
      } else if (product.sku.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: product.id,
          name: product.name,
          type: 'sku',
          highlight: product.sku,
        });
      }
    });

    categories.forEach((category) => {
      if (category.name.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: category.id,
          name: category.name,
          type: 'category',
        });
      }
    });

    setResults(searchResults.slice(0, 10));
    setSelectedIndex(-1);
  }, [query, products, categories]);

  const saveSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    const updated = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(
      0,
      MAX_RECENT,
    );

    setRecentSearches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      saveSearch(query);
      onSearch(query);
      setIsFocused(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'product' || result.type === 'sku') {
      onProductSelect?.(result.id);
    }
    saveSearch(result.name);
    setQuery(result.name);
    setIsFocused(false);
  };

  const handleRecentClick = (search: string) => {
    setQuery(search);
    onSearch(search);
    setIsFocused(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = results.length || recentSearches.length;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      if (results.length > 0) {
        handleResultClick(results[selectedIndex]);
      } else if (recentSearches.length > 0) {
        handleRecentClick(recentSearches[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  const showDropdown = isFocused && (results.length > 0 || (recentSearches.length > 0 && !query));

  return (
    <div className={cn('relative', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar produtos, SKU, categorias..."
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {results.length > 0 && (
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-2 mb-2">Resultados</p>
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors',
                    selectedIndex === index ? 'bg-accent' : 'hover:bg-muted',
                  )}
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="font-roboto-medium truncate">{result.name}</p>
                    {result.highlight && (
                      <p className="text-xs text-muted-foreground">SKU: {result.highlight}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {result.type === 'product'
                      ? 'Produto'
                      : result.type === 'sku'
                        ? 'SKU'
                        : 'Categoria'}
                  </Badge>
                </button>
              ))}
            </div>
          )}

          {!query && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-2 mb-2">
                <p className="text-xs text-muted-foreground">Buscas Recentes</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto text-xs p-0 text-muted-foreground hover:text-foreground"
                  onClick={clearRecentSearches}
                >
                  Limpar
                </Button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => handleRecentClick(search)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors',
                    selectedIndex === index ? 'bg-accent' : 'hover:bg-muted',
                  )}
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 truncate">{search}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
