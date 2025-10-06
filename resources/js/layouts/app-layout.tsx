import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Toaster } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
import { PropsWithChildren, type ReactNode } from 'react';

type AppLayoutProps = PropsWithChildren & {
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
};

export default ({
  children,
  breadcrumbs = [
    {
      title: 'Dashboard',
      href: route('dashboard'),
    },
  ],
  title = 'Page Heading',
  description = 'Page description',
  actions,
}: AppLayoutProps) => {
  const isMobile = useIsMobile();
  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs}>
      <Head title="Sistem informasi akademis :: SIAKAD :: PKBM AL-MADINAH">
        <link rel="icon" type="image/svg+xml" href="/rapor-perkembangan.png" />
      </Head>
      <div className={cn('mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 space-y-4 overflow-x-auto rounded-xl p-6')}>
        <div className="flex items-start justify-between gap-6">
          <Heading title={title} description={description} />
          {actions && (
            <>
              {isMobile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'secondary'} size={'icon'}>
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="flex flex-col space-y-2">
                    {actions}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex flex-col items-center gap-2 md:justify-end xl:flex-row">{actions}</div>
              )}
            </>
          )}
        </div>
        {children}
      </div>
      <Toaster position="top-center" />
    </AppLayoutTemplate>
  );
};
