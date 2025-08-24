import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Grade } from '@/types/grade';
import { FC } from 'react';

type Props = {
  grade: Grade;
};

const ShowGrade: FC<Props> = ({ grade }) => {
  return (
    <AppLayout title="Detail Grade" description="Detail grade">
      <Card>
        <CardHeader>
          <CardTitle>{ grade.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowGrade;
