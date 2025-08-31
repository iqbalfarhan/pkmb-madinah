import DDump from '@/components/d-dump';
import { ReportNilaiData } from '@/types/report';
import { FC } from 'react';

type Props = {
  data: ReportNilaiData;
};

const ReportNilai: FC<Props> = ({ data }) => {
  return (
    <>
      <DDump content={data} />
    </>
  );
};

export default ReportNilai;
