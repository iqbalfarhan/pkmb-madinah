import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

const PpdbCardWidget = () => {
  const { settings } = usePage<SharedData>().props;

  if (settings?.PPDB_OPEN !== 'true') {
    return null;
  }

  return (
    <Card className="dark">
      <CardHeader>
        <CardTitle>Sesi pendaftaran siswa baru telah dibuka</CardTitle>
        <CardDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam amet vel sed quia maiores commodi, quasi veritatis labore quae perferendis
          perspiciatis rem repellat a cum doloremque voluptatibus. Ab, illum obcaecati?
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link href={route('ppdb.create')}>
            Lihat selengkapnya <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PpdbCardWidget;
