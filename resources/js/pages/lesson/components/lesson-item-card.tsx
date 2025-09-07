import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lesson } from '@/types/lesson';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  lesson: Lesson;
};

const LessonItemCard: FC<Props> = ({ lesson }) => {
  return (
    <Link href={route('lesson.show', lesson.id)}>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="line-clamp-1">{lesson.subject.name}</CardTitle>
          <CardDescription>Pengajar: {lesson.user.name}</CardDescription>
          {lesson.classroom && <CardDescription>Kelas: {lesson.classroom.name}</CardDescription>}
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-1">
          {lesson.materials && <Badge variant={'secondary'}>{lesson.materials?.length} materi</Badge>}
          {lesson.assignments && <Badge variant={'secondary'}>{lesson.assignments?.length} tugas</Badge>}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default LessonItemCard;
