import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Grade } from '@/types/grade';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import GradeBulkDeleteDialog from './components/grade-bulk-delete-dialog';
import GradeBulkEditSheet from './components/grade-bulk-edit-sheet';
import GradeDeleteDialog from './components/grade-delete-dialog';
import GradeFilterSheet from './components/grade-filter-sheet';
import GradeFormSheet from './components/grade-form-sheet';

type Props = {
  grades: Grade[];
  query: { [key: string]: string };
};

const GradeList: FC<Props> = ({ grades, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Tingkat kelas"
      description="Manage your grades"
      actions={
        <>
          {permissions?.canAdd && (
            <GradeFormSheet purpose="create">
              <Button>
                <Plus />
                Create new grade
              </Button>
            </GradeFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search grades..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <GradeFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </GradeFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <GradeBulkEditSheet gradeIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </GradeBulkEditSheet>
            <GradeBulkDeleteDialog gradeIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </GradeBulkDeleteDialog>
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
                    checked={ids.length === grades.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(grades.map((grade) => grade.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Pengembangan karakter</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grades
            .filter((grade) => JSON.stringify(grade).toLowerCase().includes(cari.toLowerCase()))
            .map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(grade.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, grade.id]);
                          } else {
                            setIds(ids.filter((id) => id !== grade.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{grade.group}</TableCell>
                <TableCell>{grade.name}</TableCell>
                <TableCell>{grade.characters?.join(', ')}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('grade.show', grade.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <GradeFormSheet purpose="edit" grade={grade}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </GradeFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <GradeDeleteDialog grade={grade}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </GradeDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default GradeList;
