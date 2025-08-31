import BackButton from '@/components/back-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Report, ReportPerkembanganData } from '@/types/report';
import { FileJson } from 'lucide-react';
import { FC } from 'react';
import ReportPerkembanganReader from './reader/report-perkembangan';

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
        </>
      }
    >
      <div className="mx-auto w-full max-w-4xl space-y-10">
        {report.report_type === 'perkembangan' && <ReportPerkembanganReader data={report.data as ReportPerkembanganData} />}
      </div>
    </AppLayout>
  );
};

export default ShowReport;
