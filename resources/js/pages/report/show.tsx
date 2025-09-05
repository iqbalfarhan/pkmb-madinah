import BackButton from '@/components/back-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Report, ReportNilaiData, ReportPerkembanganData, ReportTahfidzData } from '@/types/report';
import { Link } from '@inertiajs/react';
import { Edit, FileJson } from 'lucide-react';
import { FC } from 'react';
import ReportNilaiReader from './reader/report-nilai';
import ReportPerkembanganReader from './reader/report-perkembangan';
import ReportTahfidzReader from './reader/report-tahfidz';

type Props = {
  report: Report;
};

const ShowReport: FC<Props> = ({ report }) => {
  return (
    <AppLayout
      title={`E-Rapor ${report.report_type}`}
      description={`Detail report tahun ajaran ${report.academic_year.label}`}
      actions={
        <>
          <BackButton />
          <Button asChild>
            <a href={route('report.raw', report.id)}>
              <FileJson />
              Raw data
            </a>
          </Button>
          <Button asChild>
            <Link href={route('report.edit', report.id)}>
              <Edit />
              Edit rapor
            </Link>
          </Button>
        </>
      }
    >
      <div className="mx-auto w-full max-w-4xl space-y-10">
        {report.report_type === 'perkembangan' && <ReportPerkembanganReader data={report.data as ReportPerkembanganData} />}
        {report.report_type === 'nilai' && <ReportNilaiReader data={report.data as ReportNilaiData} />}
        {report.report_type === 'tahfidz' && <ReportTahfidzReader data={report.data as ReportTahfidzData} />}
      </div>
    </AppLayout>
  );
};

export default ShowReport;
