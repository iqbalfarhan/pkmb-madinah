import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Report } from '@/types/report';
import { Link, usePage } from '@inertiajs/react';
import { Download, Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ReportBulkDeleteDialog from './components/report-bulk-delete-dialog';
import ReportBulkEditSheet from './components/report-bulk-edit-sheet';
import ReportDeleteDialog from './components/report-delete-dialog';
import ReportFilterSheet from './components/report-filter-sheet';
import ReportFormSheet from './components/report-form-sheet';

type Props = {
  reports: Report[];
  query: { [key: string]: string };
};

const ReportList: FC<Props> = ({ reports, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Reports"
      description="Manage your reports"
      actions={
        <>
          {permissions?.canAdd && (
            <ReportFormSheet purpose="create">
              <Button>
                <Plus />
                Create new report
              </Button>
            </ReportFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search reports..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ReportFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ReportFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ReportBulkEditSheet reportIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ReportBulkEditSheet>
            <ReportBulkDeleteDialog reportIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ReportBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === reports.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(reports.map((report) => report.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>NISN</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Jenis rapor</TableHead>
            <TableHead>Classroom</TableHead>
            <TableHead>Academic year</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports
            .filter((report) => JSON.stringify(report).toLowerCase().includes(cari.toLowerCase()))
            .map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(report.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, report.id]);
                          } else {
                            setIds(ids.filter((id) => id !== report.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{report.student.nisn}</TableCell>
                <TableCell>{report.student.name}</TableCell>
                <TableCell>{report.report_type}</TableCell>
                <TableCell>{report.classroom.name}</TableCell>
                <TableCell>{report.academic_year.label}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <>
                      <Button variant={'ghost'} size={'icon'}>
                        <Link href={route('report.show', report.id)}>
                          <Folder />
                        </Link>
                      </Button>
                      <Button variant={'ghost'} size={'icon'}>
                        <a href={route('report.download', report.id)}>
                          <Download />
                        </a>
                      </Button>
                    </>
                  )}
                  {permissions?.canUpdate && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('report.edit', report.id)}>
                        <Edit />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canDelete && (
                    <ReportDeleteDialog report={report}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ReportDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ReportList;
