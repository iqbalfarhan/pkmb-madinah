import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

const widgetCardVariants = cva('cursor-pointer hover:opacity-80', {
  variants: {
    variant: {
      default: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
      info: 'text-info',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type Props = VariantProps<typeof widgetCardVariants> &
  PropsWithChildren & {
    count?: string;
    href?: string;
    icon?: LucideIcon;
    title?: string;
    description?: string;
  };

const WidgetCard: FC<Props> = ({ variant, count, icon: Icon, href, title = 'Widget title', description = 'Widget description' }) => {
  return (
    <Card onClick={() => (href ? router.visit(href) : undefined)} className={cn(widgetCardVariants({ variant }))}>
      <CardHeader className="flex flex-row items-center justify-between">
        <Button variant={variant} size={'icon'}>
          {Icon && <Icon />}
        </Button>
        {count && (
          <Button variant={'ghost'} className="text-foreground opacity-60">
            {count}
          </Button>
        )}
      </CardHeader>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-1">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default WidgetCard;
