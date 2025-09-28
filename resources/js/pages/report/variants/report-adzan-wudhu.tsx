import DDump from '@/components/d-dump';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportAdzanWudhuData, ReportDataMeta } from '@/types/report';
import { Check } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = PropsWithChildren & {
  data: ReportAdzanWudhuData;
};

const ReportAdzanWudhu: FC<Props> = ({ data }) => {
  const handleUpdate = () => {};

  return (
    <>
      <ReportHeader />
      <Button onClick={handleUpdate} className="fixed right-6 bottom-6">
        <Check />
        Simpan
      </Button>
      <ReportStudentCard meta={data as ReportDataMeta} />
      <Card>
        <CardHeader>
          <CardTitle>Bacaan sholat</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, et?</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bacaan sholat</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, et?</CardDescription>
        </CardHeader>
      </Card>
      <DDump content={data} />
    </>
  );
};

export default ReportAdzanWudhu;
