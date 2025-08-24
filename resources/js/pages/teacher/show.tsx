import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Teacher } from '@/types/teacher';
import { FC } from 'react';

type Props = {
  teacher: Teacher;
};

const ShowTeacher: FC<Props> = ({ teacher }) => {
  return (
    <AppLayout title="Detail Teacher" description="Detail teacher">
      <Card>
        <CardHeader>
          <CardTitle>{ teacher.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowTeacher;
