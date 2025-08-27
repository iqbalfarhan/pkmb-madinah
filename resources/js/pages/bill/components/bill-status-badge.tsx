import { Badge } from '@/components/ui/badge';
import { FC } from 'react';

type Props = {
  status: string;
};

const BillStatusBadge: FC<Props> = ({ status }) => {
  return (
    <>
      {status == 'unpaid' && <Badge variant={'secondary'}>Belum Dibayar</Badge>}
      {status == 'partial' && <Badge variant={'warning'}>Sebagian Dibayar</Badge>}
      {status == 'paid' && <Badge variant={'default'}>Sudah Dibayar</Badge>}
    </>
  );
};

export default BillStatusBadge;
