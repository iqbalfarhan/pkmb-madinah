import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Assessment } from '@/types/assessment';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import AssessmentBulkDeleteDialog from './components/assessment-bulk-delete-dialog';
import AssessmentBulkEditSheet from './components/assessment-bulk-edit-sheet';
import AssessmentDeleteDialog from './components/assessment-delete-dialog';
import AssessmentFilterSheet from './components/assessment-filter-sheet';
import AssessmentFormSheet from './components/assessment-form-sheet';

type Props = {
  assessments: Assessment[];
  groupLists: string[];
  query: { [key: string]: string };
};

const AssessmentList: FC<Props> = ({ assessments, query, groupLists = [] }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');
  const [group, setGroup] = useState(query.group ?? 'doa harian');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Data penilaian"
      description="List penilaian untuk rapor doa-hadist, praktek dan tahfidz"
      actions={
        <>
          {permissions?.canAdd && (
            <AssessmentFormSheet purpose="create">
              <Button>
                <Plus />
                Tambah penilaian
              </Button>
            </AssessmentFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search assessments..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <Select
          value={group}
          onValueChange={(value) => {
            setGroup(value);
            router.get(
              '',
              {
                group: value === 'all' ? undefined : value,
              },
              {
                preserveScroll: true,
                preserveState: true,
                replace: true,
              },
            );
          }}
        >
          <SelectTrigger className="w-full md:w-fit">
            <SelectValue placeholder={'Pilih group'} />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="all">Semua group penilaian</SelectItem>
            {groupLists.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <AssessmentFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </AssessmentFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <AssessmentBulkEditSheet assessmentIds={ids} onSuccess={() => setIds([])}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </AssessmentBulkEditSheet>
            <AssessmentBulkDeleteDialog assessmentIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </AssessmentBulkDeleteDialog>
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
                    checked={ids.length === assessments.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(assessments.map((assessment) => assessment.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Nama penilaian</TableHead>
            <TableHead>Tingkat</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments
            .filter((assessment) => (group != 'all' ? assessment.group === group : true))
            .filter((assessment) => JSON.stringify(assessment).toLowerCase().includes(cari.toLowerCase()))
            .map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(assessment.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, assessment.id]);
                          } else {
                            setIds(ids.filter((id) => id !== assessment.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{assessment.group}</TableCell>
                <TableCell>{assessment.name}</TableCell>
                <TableCell>{assessment.grade?.name}</TableCell>
                <TableCell>{assessment.semester ?? ''}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('assessment.show', assessment.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <AssessmentFormSheet purpose="edit" assessment={assessment}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </AssessmentFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <AssessmentDeleteDialog assessment={assessment}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </AssessmentDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default AssessmentList;
