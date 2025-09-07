import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import LessonFormSheet from '@/pages/lesson/components/lesson-form-sheet';
import LessonItemCard from '@/pages/lesson/components/lesson-item-card';
import { SharedData } from '@/types';
import { Lesson } from '@/types/lesson';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FC } from 'react';
import ClassroomLayout from '../layout/classroom-layout';

type Props = {
  lessons: Lesson[];
};

const ClassroomLessonsTab: FC<Props> = ({ lessons }) => {
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
          </>
        }
      />
      <div className="grid-responsive grid gap-4">
        {lessons.map((lesson) => (
          <LessonItemCard lesson={lesson} key={lesson.id} />
        ))}
      </div>
    </ClassroomLayout>
  );
};

export default ClassroomLessonsTab;
