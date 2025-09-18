import HeadingSmall from '@/components/heading-small';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import LessonFormSheet from '@/pages/lesson/components/lesson-form-sheet';
import LessonItemCard from '@/pages/lesson/components/lesson-item-card';
import { SharedData } from '@/types';
import { Lesson } from '@/types/lesson';
import { usePage } from '@inertiajs/react';
import { Edit, Folder, Grid2X2, Plus, TableIcon, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ClassroomLayout from '../layout/classroom-layout';

type Props = {
  lessons: Lesson[];
};

const ClassroomLessonsTab: FC<Props> = ({ lessons }) => {
  const [view, setView] = useState('grid');
  const { permissions } = usePage<SharedData>().props;

  return (
    <ClassroomLayout>
      <HeadingSmall
        title="Daftar Pelajaran"
        description="Daftar pelajaran yang diajarkan di kelas ini"
        actions={
          <>
            {permissions?.canAddLesson && (
              <LessonFormSheet purpose={'create'}>
                <Button>
                  <Plus />
                  Buat sesi pelajaran
                </Button>
              </LessonFormSheet>
            )}
            <Button onClick={() => setView((prev) => (prev === 'table' ? 'grid' : 'table'))} size={'icon'}>
              {view === 'table' ? <TableIcon /> : <Grid2X2 />}
            </Button>
          </>
        }
      />
      {view === 'table' && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No</TableHead>
              <TableHead>Mata pelajaran</TableHead>
              <TableHead>Guru pengajar</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson, index) => (
              <TableRow>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{lesson.subject.name}</TableCell>
                <TableCell>{lesson.user.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant={'secondary'}>{lesson.materials.length} material</Badge>
                    <Badge variant={'secondary'}>{lesson.assignments.length} tugas</Badge>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {permissions?.canShowLesson && (
                    <Button size={'icon'} variant={'ghost'}>
                      <Folder />
                    </Button>
                  )}
                  {permissions?.canUpdateLesson && (
                    <Button size={'icon'} variant={'ghost'}>
                      <Edit />
                    </Button>
                  )}
                  {permissions?.canDeleteLesson && (
                    <Button size={'icon'} variant={'ghost'}>
                      <Trash2 />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {view === 'grid' && (
        <div className="grid-responsive grid gap-4">
          {lessons.map((lesson) => (
            <LessonItemCard lesson={lesson} key={lesson.id} />
          ))}
        </div>
      )}
    </ClassroomLayout>
  );
};

export default ClassroomLessonsTab;
