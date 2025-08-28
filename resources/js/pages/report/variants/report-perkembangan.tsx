import DDump from '@/components/d-dump';
import { Report } from '@/types/report';
import { FC } from 'react';

type Props = {
  report: Report;
};

const ReportPerkambangan: FC<Props> = ({ report }) => {
  return (
    <div>
      <h1>Laporan perkambangan siswa tahun ajaran 2025 semester genap</h1>
      <DDump content={report} />
    </div>
  );
};

export default ReportPerkambangan;
