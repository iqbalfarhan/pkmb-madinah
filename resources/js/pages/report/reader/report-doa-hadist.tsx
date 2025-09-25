import { Card, CardContent } from '@/components/ui/card';
import { ReportDataMeta, ReportDoaHadistData } from '@/types/report';
import { FC } from 'react';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportDoaHadistData;
};

const ReportDoaHadistReader: FC<Props> = ({ data }) => {
  return (
    <>
      <ReportHeader />
      <ReportStudentCard meta={data as ReportDataMeta} />
      <Card>
        <CardContent>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, dolorum. Perferendis ad temporibus saepe sit sed, cumque dolorem
          repellendus error adipisci quam quia dolore est recusandae. Id molestias fuga vel!
        </CardContent>
      </Card>
    </>
  );
};

export default ReportDoaHadistReader;
