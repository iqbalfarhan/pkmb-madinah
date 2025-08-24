import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const PpdbCardWidget = () => {
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
        <Button>
          Lihat selengkapnya <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PpdbCardWidget;
