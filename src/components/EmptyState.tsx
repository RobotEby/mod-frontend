import { LucideIcon, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}
    >
      <div className="p-6 bg-muted rounded-full mb-6">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-roboto-roboto text-foreground mb-2">{title}</h3>
      {description && <p className="text-muted-foreground max-w-md mb-6">{description}</p>}
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
};
