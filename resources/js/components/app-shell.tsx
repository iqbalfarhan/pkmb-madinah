import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
  const isOpen = usePage<SharedData>().props.sidebarOpen;

  if (variant === 'header') {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>;
  }

  return (
    <SidebarProvider defaultOpen={isOpen} className={cn('bg-gradient-to-br from-primary/10 to-success/10')}>
      {children}
    </SidebarProvider>
  );
}
