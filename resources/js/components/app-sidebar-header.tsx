import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';
import { FC } from 'react';
import ThemeToggler from './theme-toggler';
import { Button } from './ui/button';

type Props = {
  breadcrumbs?: BreadcrumbItemType[];
};

export const AppSidebarHeader: FC<Props> = () => {
  const { activeAcademicYear } = usePage<SharedData>().props;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border border-border bg-card px-6 transition-[width,height] ease-linear md:m-2 md:rounded-lg md:px-4 md:shadow-sm">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>

        <div className="flex">
          <Button variant={'ghost'} disabled className="hidden md:flex">
            {activeAcademicYear.label}
          </Button>
          <ThemeToggler size="icon" />
        </div>
      </div>
    </header>
  );
};
