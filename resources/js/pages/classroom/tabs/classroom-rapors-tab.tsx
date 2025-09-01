import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReportFormSheet from '@/pages/report/components/report-form-sheet';
import ReportItemCard from '@/pages/report/components/report-item-card';
import { Report } from '@/types/report';
import { router } from '@inertiajs/react';
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

  return (
    <ClassroomLayout>
      <HeadingSmall
        title="Daftar rapor siswa"
        description="List rapor siswa kelas ini"
        actions={
          <>
            <ReportFormSheet purpose="create">
              <Button>
                <Plus />
                Create e-report
              </Button>
            </ReportFormSheet>
          </>
        }
      />

      <div className="flex gap-2">
        <Input placeholder="Cari dengan nama siswa" value={cari} onChange={(e) => setCari(e.target.value)} />
        <Tabs value={tab} onValueChange={(v) => router.get('', { tab: v })}>
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            {reportTypes.map((type) => (
              <TabsTrigger value={type}>{type}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid-responsive grid gap-4">
        {reports
          .filter((r) => (tab === 'all' ? true : r.report_type === tab))
          .filter((report) => JSON.stringify(report).toLowerCase().includes(cari.toLowerCase()))
          .map((report) => (
            <ReportItemCard report={report} />
          ))}
      </div>
    </ClassroomLayout>
  );
};

export default ClassroomRarporsTab;
