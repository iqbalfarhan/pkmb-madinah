import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { capitalizeWords, dateDFY, strLimit } from '@/lib/utils';
import AssignmentDeleteDialog from '@/pages/assignment/components/assignment-delete-dialog';
import AssignmentFormSheet from '@/pages/assignment/components/assignment-form-sheet';
import { SharedData } from '@/types';
import { Assignment, AssignmentType } from '@/types/assignment';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Folder, Plus, Trash2 } from 'lucide-react';
import { FC } from 'react';

type Props = {
  type: AssignmentType;
};

const LessonTugasTab: FC<Props> = ({ type }) => {
  const { assignments = [], permissions } = usePage<SharedData & { assignments: Assignment[] }>().props;
  // const totalRate = assignments.reduce((acc, curr) => acc + curr.rate, 0);
  // const isRateFix = totalRate === 100;

  return (
    <div className="space-y-6">
      <HeadingSmall
        title={`Daftar ${type}`}
        description={`daftar ${type} untuk peljaran ini`}
        actions={
          <>
            {permissions?.canAdd && (
              <AssignmentFormSheet purpose="create" type={type}>
                <Button>
                  <Plus />
                  Buat {type} baru
                </Button>
              </AssignmentFormSheet>
            )}
          </>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Kode</TableHead>
            <TableHead>Judul {type}</TableHead>
            <TableHead>Deskripsi</TableHead>
            {/* <TableHead className="text-center">Bobot %</TableHead> */}
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments
            .filter((assignment) => assignment.type === type)
            .map((assignment, index) => (
              <TableRow key={assignment.id}>
                <TableCell className="text-center">
                  <Button variant={'ghost'} size={'icon'}>
                    {capitalizeWords(type.charAt(0))}
                    {index + 1}
                  </Button>
                </TableCell>
                <TableCell>{assignment.name}</TableCell>
                <TableCell>{strLimit(assignment.description ?? '')}</TableCell>
                {/* <TableCell className="text-center">
                  <AssignmentRateFormPopover assignment={assignment} />
                </TableCell> */}
                <TableCell>{dateDFY(assignment.created_at)}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'} asChild>
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
          {/* <TableRow>
            <TableCell className="text-right" colSpan={2}>
              Total bobot :
            </TableCell>
            <TableCell className={isRateFix ? 'bg-success/10 text-center text-success' : 'bg-destructive/10 text-center text-destructive'}>
              {totalRate}%
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
};

export default LessonTugasTab;
