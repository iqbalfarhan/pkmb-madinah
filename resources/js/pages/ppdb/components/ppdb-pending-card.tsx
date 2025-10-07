import { IllustrationPending } from '@/components/illustration/illustration-pending';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Student } from '@/types/student';
import { Link } from '@inertiajs/react';
import { RefreshCw, Wallet } from 'lucide-react';
import { FC } from 'react';

type Props = {
  ppdb: Student;
};

const PpdbPendingCard: FC<Props> = ({ ppdb }) => {
  return (
    <Card className="group min-h-80 bg-gradient-to-tl from-primary to-primary/40 text-primary-foreground md:p-14">
      <CardContent className="grid h-full gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="flex items-center justify-center xl:col-span-2">
          <IllustrationPending className="size-48" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="text-3xl font-bold">Menunggu persetujuan admin</div>
          <div>Saat ini status siswa masih menunggu verifikasi dari pihak sekolah. dan menunggu pembuatan tagihan pendaftaran.</div>
          <div className="flex flex-row gap-2">
            <Button asChild variant={'default'}>
              <Link href={route('ppdb.show', ppdb.id)}>
                <RefreshCw />
                Reload halaman
              </Link>
            </Button>
            <Button asChild variant={'secondary'}>
              <Link href={route('bills')}>
                <Wallet />
                Lihat tagihan
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PpdbPendingCard;
