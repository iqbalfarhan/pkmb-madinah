import { SharedData } from '@/types';
import { Report } from '@/types/report';
import { usePage } from '@inertiajs/react';

const ReportHeader = () => {
  const { settings, report } = usePage<SharedData & { report: Report }>().props;

  const label = {
    perkembangan: 'LAPORAN PERKEMBANGAN SISWA',
    nilai: 'LAPORAN HASIL AKHIR',
    tahfidz: 'LAPORAN PERKEMBANGAN HAFALAN AL-QURAN',
    tahsin: 'LAPORAN PERKEMBANGAN TAHSIN AL-MUYASSAR',
    'doa-hadist': 'LAPORAN HASIL HAFALAN DOA',
  } as const;

  const data = report.data as {
    semester?: string;
    tahunajaran?: string;
  };

  return (
    <div className="flex items-center">
      <h1 className="flex-1 text-center text-xl font-semibold uppercase">
        {label[report.report_type]}
        <br />
        {settings?.SCHOOL_NAME} SEMESTER {data.semester ?? ''}
        <br />
        TAHUN AJARAN {data.tahunajaran ?? ''}
      </h1>
    </div>
  );
};

export default ReportHeader;
