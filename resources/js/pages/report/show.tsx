import BackButton from '@/components/back-button';
import AppLayout from '@/layouts/app-layout';
import { Report } from '@/types/report';
import { FC } from 'react';
import ReportNilai from './variants/report-nilai';
import ReportPerkambangan from './variants/report-perkembangan';
import ReportTahfidz from './variants/report-tahfidz';
import ReportTahsin from './variants/report-tahsin';

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
        </>
      }
    >
      {report.report_type == 'perkembangan' && <ReportPerkambangan report={report} />}
      {report.report_type == 'nilai' && <ReportNilai />}
      {report.report_type == 'tahsin' && <ReportTahsin report={report} />}
      {report.report_type == 'tahfidz' && <ReportTahfidz />}
    </AppLayout>
  );
};

export default ShowReport;
