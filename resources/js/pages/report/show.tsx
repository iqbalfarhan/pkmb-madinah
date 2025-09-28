import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Report } from '@/types/report';
import { Link } from '@inertiajs/react';
import { Download, Edit } from 'lucide-react';
import { FC } from 'react';

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
          <Button asChild>
            <a href={route('report.download', { report: report.id, type: 'download' })}>
              <Download />
              Download
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
      <iframe src={route('report.download', { report: report.id, type: 'stream' })} className="h-full" />
      {/* <div className="mx-auto w-full max-w-4xl space-y-10">
        {report.report_type === 'perkembangan' && <ReportPerkembanganReader data={report.data as ReportPerkembanganData} />}
        {report.report_type === 'nilai' && <ReportNilaiReader data={report.data as ReportNilaiData} />}
        {report.report_type === 'tahfidz' && <ReportTahfidzReader data={report.data as ReportTahfidzData} />}
        {report.report_type === 'tahsin' && <ReportTahsinReader data={report.data as ReportTahsinData} />}
        {report.report_type === 'doa-hadist' && <ReportDoaHadistReader data={report.data as ReportDoaHadistData} />}
      </div>

      <DDump content={report.data} /> */}
    </AppLayout>
  );
};

export default ShowReport;
