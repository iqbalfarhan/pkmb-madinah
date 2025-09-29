import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Exam } from '@/types/exam';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ExamBulkDeleteDialog from './components/exam-bulk-delete-dialog';
import ExamBulkEditSheet from './components/exam-bulk-edit-sheet';
import ExamDeleteDialog from './components/exam-delete-dialog';
import ExamFilterSheet from './components/exam-filter-sheet';
import ExamFormSheet from './components/exam-form-sheet';

type Props = {
  exams: Exam[];
  query: { [key: string]: string };
};

const ExamList: FC<Props> = ({ exams, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Evaluasi"
      description="Manage your exams"
      actions={
        <>
          {permissions?.canAdd && (
            <ExamFormSheet purpose="create">
              <Button>
                <Plus />
                Create new exam
              </Button>
            </ExamFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search exams..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ExamFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ExamFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ExamBulkEditSheet examIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ExamBulkEditSheet>
            <ExamBulkDeleteDialog examIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ExamBulkDeleteDialog>
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
                    checked={ids.length === exams.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(exams.map((exam) => exam.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Pelajaran</TableHead>
            <TableHead>Nama ujian</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams
            .filter((exam) => JSON.stringify(exam).toLowerCase().includes(cari.toLowerCase()))
            .map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(exam.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, exam.id]);
                          } else {
                            setIds(ids.filter((id) => id !== exam.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{exam.classroom.name}</TableCell>
                <TableCell>{exam.lesson.name}</TableCell>
                <TableCell>{exam.name}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('exam.show', exam.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <ExamFormSheet purpose="edit" exam={exam}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ExamFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <ExamDeleteDialog exam={exam}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ExamDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ExamList;
