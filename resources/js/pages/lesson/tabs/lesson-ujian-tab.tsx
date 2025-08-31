import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SharedData } from '@/types';
import { Lesson } from '@/types/lesson';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';

const LessonUjianTab = () => {
  const { students = [] } = usePage<SharedData & { lesson: Lesson; students: Student[] }>().props;

  return (
    <div className="space-y-6">
      <HeadingSmall title="Daftar Nilai" description="Daftar nilai siswa untuk setiap tugas" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r-2 border-border">Nama siswa</TableHead>
            <TableHead className="border-l-2 border-border text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            return (
              <TableRow key={student.id}>
                <TableCell className="border-r-2 border-border">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={student.avatar} />
                    </Avatar>
                    <span>{student.name}</span>
                  </div>
                </TableCell>
                <TableCell className="w-fit border-l-2 border-border text-center">
                  <Button variant={'ghost'} size={'icon'}>
                    12
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LessonUjianTab;
