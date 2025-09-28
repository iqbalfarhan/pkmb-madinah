import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReportFormSheet from '@/pages/report/components/report-form-sheet';
import ReportItemCard from '@/pages/report/components/report-item-card';
import { SharedData } from '@/types';
import { Report } from '@/types/report';
import { router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FC, useState } from 'react';
import ClassroomLayout from '../layout/classroom-layout';

type Props = {
  reports: Report[];
  reportTypes: string[];
  query: Record<string, string>;
};

const ClassroomRarporsTab: FC<Props> = ({ reports, reportTypes, query }) => {
  const [tab] = useState(query.tab ?? 'all');
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <ClassroomLayout>
      <HeadingSmall
        title="Daftar rapor siswa"
        description="List rapor siswa kelas ini"
        actions={
          <>
            {permissions?.canAdd && (
              <>
                <ReportFormSheet purpose="create">
                  <Button>
                    <Plus />
                    Create e-report
                  </Button>
                </ReportFormSheet>
              </>
            )}
          </>
        }
      />

      <div className="flex flex-col gap-2 sm:flex-row">
        <Input placeholder="Cari dengan nama siswa" value={cari} onChange={(e) => setCari(e.target.value)} />
        <Select value={tab} onValueChange={(v) => router.get('', { tab: v })}>
          <SelectTrigger className="w-full md:w-fit">
            <SelectValue placeholder={'Pilih jenis rapor'} />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="all">Semua rapor</SelectItem>
            {reportTypes.map((type) => (
              <SelectItem key={type} value={type}>
                E-rapor {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid-responsive grid gap-4">
        {reports
          .filter((r) => (tab === 'all' ? true : r.report_type === tab))
          .filter((report) => JSON.stringify(report).toLowerCase().includes(cari.toLowerCase()))
          .map((report) => (
            <ReportItemCard key={report.id} report={report} />
          ))}
      </div>
    </ClassroomLayout>
  );
};

export default ClassroomRarporsTab;
