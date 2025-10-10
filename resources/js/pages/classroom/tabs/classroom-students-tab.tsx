import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { groupBy } from '@/lib/utils';
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
      <HeadingSmall title="Daftar Siswa" description="Daftar siswa yang terdaftar di kelas ini" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">NISN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Nomor telepon</TableHead>
            <TableHead>Ketidakhadiran</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="text-center">
                <Button variant={'ghost'}>{student.nisn}</Button>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={student.avatar} />
                  </Avatar>
                  <span>{student.name}</span>
                </div>
              </TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'ghost'}>{student.absents?.length} hari</Button>
                  </PopoverTrigger>
                  <PopoverContent asChild align="end" className="w-fit">
                    <Table>
                      {Object.entries(groupBy(student.absents ?? [], 'reason')).map(([reason, item]) => (
                        <TableRow>
                          <TableCell>{reason}</TableCell>
                          <TableCell>:</TableCell>
                          <TableCell className="w-full">{item.length} hari</TableCell>
                        </TableRow>
                      ))}
                    </Table>
                  </PopoverContent>
                </Popover>
              </TableCell>
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
