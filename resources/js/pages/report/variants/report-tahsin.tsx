import DDump from '@/components/d-dump';
import { Report } from '@/types/report';
import { FC } from 'react';

type Props = {
  report: Report;
};

const ReportTahsin: FC<Props> = ({ report }) => {
  return (
    <div>
      <DDump content={report} />
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, quam. Tempora ut nostrum, sunt suscipit expedita ducimus ea maxime incidunt
      earum cum repudiandae itaque nesciunt, nam iste? Esse, perspiciatis cumque!
    </div>
  );
};

export default ReportTahsin;
