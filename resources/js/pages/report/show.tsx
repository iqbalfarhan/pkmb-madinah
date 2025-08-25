import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Report } from '@/types/report';
import { ChevronLeft } from 'lucide-react';
import { FC } from 'react';

type Props = {
  report: Report;
};

const ShowReport: FC<Props> = ({ report }) => {
  return (
    <AppLayout
      title="Detail Report"
      description="Detail report"
      actions={
        <>
          <Button onClick={() => window.history.back()} variant={'secondary'}>
            <ChevronLeft />
            Kembali
          </Button>
          <Button>Simpan</Button>
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{report.student.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowReport;
