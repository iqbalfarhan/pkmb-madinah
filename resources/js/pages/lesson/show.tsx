import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Lesson } from '@/types/lesson';
import { FC } from 'react';

type Props = {
  lesson: Lesson;
};

const ShowLesson: FC<Props> = ({ lesson }) => {
  return (
    <AppLayout title="Detail Lesson" description="Detail lesson">
      <Card>
        <CardHeader>
          <CardTitle>{ lesson.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowLesson;
