import LessonItemCard from '@/pages/lesson/components/lesson-item-card';
import { Lesson } from '@/types/lesson';
import { FC } from 'react';
import ClassroomLayout from '../layout/classroom-layout';

type Props = {
  lessons: Lesson[];
};

const ClassroomLessonsTab: FC<Props> = ({ lessons }) => {
  return (
    <ClassroomLayout>
      <div className="grid grid-cols-4 gap-4">
        {lessons.map((lesson) => (
          <LessonItemCard lesson={lesson} key={lesson.id} />
        ))}
      </div>
    </ClassroomLayout>
  );
};

export default ClassroomLessonsTab;
