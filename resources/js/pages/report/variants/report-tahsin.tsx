import DDump from '@/components/d-dump';
import { ReportTahsinData } from '@/types/report';
import { FC } from 'react';

type Props = {
  data: ReportTahsinData;
};

const ReportTahsin: FC<Props> = ({ data }) => {
  return (
    <div>
      <DDump content={data} />
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, quam. Tempora ut nostrum, sunt suscipit expedita ducimus ea maxime incidunt
      earum cum repudiandae itaque nesciunt, nam iste? Esse, perspiciatis cumque!
    </div>
  );
};

export default ReportTahsin;
