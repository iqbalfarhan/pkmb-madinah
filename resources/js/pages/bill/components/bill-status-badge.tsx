import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bill } from '@/types/bill';
import { FC } from 'react';

type Props = {
  status: Bill['status'];
};

const BillStatusBadge: FC<Props> = ({ status }) => {
  const statuslist = {
    unpaid: {
      variant: 'secondary' as const,
      label: 'Belum dibayar',
      info: 'Tagihan ini belum ada pembayaran sama sekali.',
    },
    partial: {
      variant: 'warning' as const,
      label: 'Dibayar sebagian',
      info: 'Tagihan ini baru dibayar sebagian, masih ada sisa tunggakan.',
    },
    paid: {
      variant: 'success' as const,
      label: 'Sudah dibayar',
      info: 'Tagihan ini sudah dilunasi sepenuhnya.',
    },
  };

  const { variant, label, info } = statuslist[status];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge variant={variant} className="cursor-pointer">
          {label}
        </Badge>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="max-w-xs text-sm">
        {info}
      </PopoverContent>
    </Popover>
  );
};

export default BillStatusBadge;
