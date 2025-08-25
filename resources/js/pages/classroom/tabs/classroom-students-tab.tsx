import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StudentDeleteDialog from '@/pages/student/components/student-delete-dialog';
import StudentFormSheet from '@/pages/student/components/student-form-sheet';
import { SharedData } from '@/types';
import { Student } from '@/types/student';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ClassroomLayout from '../layout/classroom-layout';

type Props = {
  students: Student[];
};

const ClassroomStudentsTab: FC<Props> = ({ students }) => {
  const { permissions } = usePage<SharedData>().props;

  return (
    <ClassroomLayout>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NISN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.nisn}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>
                {permissions?.canShow && (
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('student.show', student.id)}>
                      <Folder />
                    </Link>
                  </Button>
                )}
                {permissions?.canUpdate && (
                  <StudentFormSheet purpose="edit" student={student}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </StudentFormSheet>
                )}
                {permissions?.canDelete && (
                  <StudentDeleteDialog student={student}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </StudentDeleteDialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ClassroomLayout>
  );
};

export default ClassroomStudentsTab;
