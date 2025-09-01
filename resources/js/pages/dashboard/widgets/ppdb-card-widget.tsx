import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

const PpdbCardWidget = () => {
  const { settings } = usePage<SharedData>().props;

  if (settings?.PPDB_OPEN !== 'true') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="!leading-lg">Sesi pendaftaran siswa baru telah dibuka</CardTitle>
        <CardDescription>Hai parents, saat ini sesi pendaftaran sedang dibuka, ayo mendaftak sekarang juga.</CardDescription>
      </CardHeader>

      <Separator />
      <CardFooter>
        <Button asChild>
          <Link href={route('ppdb.create')}>
            Mulai mendaftar <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PpdbCardWidget;
