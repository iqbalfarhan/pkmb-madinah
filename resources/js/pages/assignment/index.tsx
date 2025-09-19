import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { strLimit } from '@/lib/utils';
import { SharedData } from '@/types';
import { Assignment } from '@/types/assignment';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import AssignmentBulkDeleteDialog from './components/assignment-bulk-delete-dialog';
import AssignmentBulkEditSheet from './components/assignment-bulk-edit-sheet';
import AssignmentDeleteDialog from './components/assignment-delete-dialog';
import AssignmentFilterSheet from './components/assignment-filter-sheet';
import AssignmentFormSheet from './components/assignment-form-sheet';

type Props = {
  assignments: Assignment[];
  query: { [key: string]: string };
};

const AssignmentList: FC<Props> = ({ assignments, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Assignments"
      description="Manage your assignments"
      actions={
        <>
          {permissions?.canAdd && (
            <AssignmentFormSheet purpose="create">
              <Button>
                <Plus />
                Create new assignment
              </Button>
            </AssignmentFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search assignments..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <AssignmentFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </AssignmentFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <AssignmentBulkEditSheet assignmentIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </AssignmentBulkEditSheet>
            <AssignmentBulkDeleteDialog assignmentIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </AssignmentBulkDeleteDialog>
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
                    checked={ids.length === assignments.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(assignments.map((assignment) => assignment.id));
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
            <TableHead>Judul tugas</TableHead>
            <TableHead>Bobot nilai</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments
            .filter((assignment) => JSON.stringify(assignment).toLowerCase().includes(cari.toLowerCase()))
            .map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(assignment.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, assignment.id]);
                          } else {
                            setIds(ids.filter((id) => id !== assignment.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{assignment.lesson.classroom.name}</TableCell>
                <TableCell>
                  <Link href={route('lesson.show', assignment.lesson_id)}>{assignment.lesson.name}</Link>
                </TableCell>
                <TableCell>{strLimit(assignment.name)}</TableCell>
                <TableCell>{assignment.rate}%</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('assignment.show', assignment.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <AssignmentFormSheet purpose="edit" assignment={assignment}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </AssignmentFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <AssignmentDeleteDialog assignment={assignment}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </AssignmentDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default AssignmentList;
