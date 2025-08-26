import { Badge } from '@/components/ui/badge';
import { FC } from 'react';

type Props = {
  status: string;
};

const StudentStatusBadge: FC<Props> = ({ status }) => {
  return (
    <>
      {status == 'draft' && <Badge variant={'secondary'}>Draft</Badge>}
      {status == 'ppdb' && <Badge variant={'warning'}>PPDB</Badge>}
      {status == 'aktif' && <Badge variant={'default'}>Aktif</Badge>}
      {status == 'dikeluarkan' && <Badge variant={'destructive'}>Dikeluarkan</Badge>}
      {status == 'lulus' && <Badge variant={'success'}>Lulus</Badge>}
      {status == 'pindah' && <Badge variant={'outline'}>Pindah</Badge>}
    </>
  );
};

export default StudentStatusBadge;
