import { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/**
 * NOTE: This component only supports setting an image by URL.
 *
 * A drag-and-drop / file-picker upload flow was previously scaffolded here,
 * but it called a `storageService.uploadImage()` that was never implemented
 * (there is no backend file-storage endpoint documented or available for
 * this project). Rather than ship a spinner that never resolves, that path
 * has been removed until a real upload endpoint exists. Track this as a
 * known limitation — see README "Known Limitations".
 */

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUploader({ value, onChange, label, className }: ImageUploaderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}

      <Input
        type="url"
        placeholder="https://exemplo.com/imagem.jpg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg border border-border"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onChange('')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

interface MultiImageUploaderProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxImages?: number;
  className?: string;
}

export function MultiImageUploader({
  values,
  onChange,
  label,
  maxImages = 10,
  className,
}: MultiImageUploaderProps) {
  const [newUrl, setNewUrl] = useState('');

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleAddUrl = () => {
    if (newUrl && values.length < maxImages) {
      onChange([...values, newUrl]);
      setNewUrl('');
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {label && <Label>{label}</Label>}

      {values.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {values.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={url}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {values.length < maxImages && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <Button type="button" onClick={handleAddUrl} disabled={!newUrl}>
            <ImageIcon className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      )}
    </div>
  );
}
