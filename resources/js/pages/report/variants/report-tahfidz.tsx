import DDump from '@/components/d-dump';
import { ReportTahfidzData } from '@/types/report';
import { FC } from 'react';

type Props = {
  data: ReportTahfidzData;
};

const ReportTahfidz: FC<Props> = ({ data }) => {
  return <DDump content={data} />;
};

export default ReportTahfidz;
