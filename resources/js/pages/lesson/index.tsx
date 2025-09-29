import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Lesson } from '@/types/lesson';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import LessonBulkDeleteDialog from './components/lesson-bulk-delete-dialog';
import LessonBulkEditSheet from './components/lesson-bulk-edit-sheet';
import LessonDeleteDialog from './components/lesson-delete-dialog';
import LessonFilterSheet from './components/lesson-filter-sheet';
import LessonFormSheet from './components/lesson-form-sheet';

type Props = {
  lessons: Lesson[];
  query: { [key: string]: string };
};

const LessonList: FC<Props> = ({ lessons, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Sesi pelajaran"
      description="Manage your lessons"
      actions={
        <>
          {permissions?.canAdd && (
            <LessonFormSheet purpose="create">
              <Button>
                <Plus />
                Create new lesson
              </Button>
            </LessonFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search lessons..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <LessonFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </LessonFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <LessonBulkEditSheet lessonIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </LessonBulkEditSheet>
            <LessonBulkDeleteDialog lessonIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </LessonBulkDeleteDialog>
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
                    checked={ids.length === lessons.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(lessons.map((lesson) => lesson.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Nama pelajaran</TableHead>
            <TableHead>Pengajar</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons
            .filter((lesson) => JSON.stringify(lesson).toLowerCase().includes(cari.toLowerCase()))
            .map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(lesson.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, lesson.id]);
                          } else {
                            setIds(ids.filter((id) => id !== lesson.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{lesson.name}</TableCell>
                <TableCell>{lesson.user.name}</TableCell>
                <TableCell>{lesson.classroom.name}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('lesson.show', lesson.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <LessonFormSheet purpose="edit" lesson={lesson}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </LessonFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <LessonDeleteDialog lesson={lesson}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </LessonDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default LessonList;
