import BackButton from '@/components/back-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Report, ReportNilaiData, ReportPerkembanganData, ReportTahfidzData, ReportTahsinData } from '@/types/report';
import { FileJson } from 'lucide-react';
import { FC } from 'react';
import ReportNilai from './variants/report-nilai';
import ReportPerkambangan from './variants/report-perkembangan';
import ReportTahfidz from './variants/report-tahfidz';
import ReportTahsin from './variants/report-tahsin';

type Props = {
  report: Report;
};

const EditReport: FC<Props> = ({ report }) => {
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
        {report.report_type == 'perkembangan' && <ReportPerkambangan data={report.data as ReportPerkembanganData} />}
        {report.report_type == 'nilai' && <ReportNilai data={report.data as ReportNilaiData} />}
        {report.report_type == 'tahsin' && <ReportTahsin data={report.data as ReportTahsinData} />}
        {report.report_type == 'tahfidz' && <ReportTahfidz data={report.data as ReportTahfidzData} />}
      </div>
    </AppLayout>
  );
};

export default EditReport;
