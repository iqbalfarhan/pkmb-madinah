import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';
import { PanelLeftClose } from 'lucide-react';
import ThemeToggler from './theme-toggler';
import { Button } from './ui/button';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  const { activeAcademicYear } = usePage<SharedData>().props;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:m-2 md:rounded-lg md:px-4 md:shadow-sm">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger icon={PanelLeftClose} />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        <div className="flex">
          <Button variant={'ghost'} disabled className="hidden md:flex">
            {activeAcademicYear.label}
          </Button>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
