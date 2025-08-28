import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dateDFY, strLimit } from '@/lib/utils';
import AssignmentDeleteDialog from '@/pages/assignment/components/assignment-delete-dialog';
import AssignmentFormSheet from '@/pages/assignment/components/assignment-form-sheet';
import AssignmentRateFormPopover from '@/pages/assignment/components/assignment-rate-form-popover';
import { SharedData } from '@/types';
import { Assignment } from '@/types/assignment';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Folder, Plus, Trash2 } from 'lucide-react';

const LessonTugasTab = () => {
  const { assignments, permissions } = usePage<SharedData & { assignments: Assignment[] }>().props;
  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Daftar Tugas"
        description="daftar tugas untuk peljaran ini"
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
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Assignment</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Bobot</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.name}</TableCell>
              <TableCell>{strLimit(assignment.description)}</TableCell>
              <TableCell>
                <AssignmentRateFormPopover assignment={assignment} />
              </TableCell>
              <TableCell>{dateDFY(assignment.created_at)}</TableCell>
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
    </div>
  );
};

export default LessonTugasTab;
