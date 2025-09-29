import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  Pagination as ShadPagination,
  PaginationLink as ShadPaginationLink,
  PaginationNext as ShadPaginationNext,
  PaginationPrevious as ShadPaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationLink as TPaginationLink } from '@/types';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  links: TPaginationLink[];
};

const DataPagination: FC<Props> = ({ links }) => {
  return (
    <ShadPagination>
      <PaginationContent>
        {links.map((link, i) => {
          if (link.label.includes('Previous') || link.label.includes('pagination.previous')) {
            return (
              <PaginationItem key={i}>
                {link.url ? (
                  <Link href={link.url} preserveScroll>
                    <ShadPaginationPrevious size={'default'} />
                  </Link>
                ) : (
                  <ShadPaginationPrevious size={'default'} className="cursor-not-allowed opacity-50" />
                )}
              </PaginationItem>
            );
          }

          if (link.label.includes('Next') || link.label.includes('pagination.next')) {
            return (
              <PaginationItem key={i}>
                {link.url ? (
                  <Link href={link.url} preserveScroll>
                    <ShadPaginationNext size={'default'} />
                  </Link>
                ) : (
                  <ShadPaginationNext size={'default'} className="cursor-not-allowed opacity-50" />
                )}
              </PaginationItem>
            );
          }

          if (link.label === '...') {
            return (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={i}>
              {link.url ? (
                <Link href={link.url} preserveScroll>
                  <ShadPaginationLink size={'icon'} isActive={link.active}>
                    {link.label}
                  </ShadPaginationLink>
                </Link>
              ) : (
                <ShadPaginationLink size={'icon'} isActive={link.active} className="cursor-not-allowed opacity-50">
                  {link.label}
                </ShadPaginationLink>
              )}
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </ShadPagination>
  );
};

export default DataPagination;
