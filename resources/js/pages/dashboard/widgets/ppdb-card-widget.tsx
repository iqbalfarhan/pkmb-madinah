import { IllustrationUserCard } from '@/components/illustration/illustration-user-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

const PpdbCardWidget = () => {
  const { settings } = usePage<SharedData>().props;

  if (settings?.PPDB_OPEN !== 'true') return null;

  return (
    <Card className="group min-h-80 bg-gradient-to-tl from-primary to-primary/40 text-primary-foreground md:p-14">
      <CardContent className="grid h-full gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="flex h-full flex-1 flex-row items-center justify-center gap-4 space-y-6 xl:col-span-2">
          <IllustrationUserCard className="size-64 transition-all duration-300 group-hover:scale-110 group-hover:rotate-2" />
        </div>
        <div className="flex h-full flex-1 flex-col items-center justify-center space-y-6 text-center">
          <div className="leading-lg text-3xl font-bold">Sesi pendaftaran siswa baru telah dibuka</div>
          <div className="opacity-70">Halo ayah bunda, saat ini sesi pendaftaran sedang dibuka, ayo daftarkan anak anda sekarang juga.</div>
          <Button asChild size={'lg'} className="w-fit" variant={'secondary'}>
            <Link href={route('ppdb.create')}>
              Mulai mendaftar <ChevronRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PpdbCardWidget;
