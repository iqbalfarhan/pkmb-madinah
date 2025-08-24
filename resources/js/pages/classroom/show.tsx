import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Classroom } from '@/types/classroom';
import { FC } from 'react';

type Props = {
  classroom: Classroom;
};

const ShowClassroom: FC<Props> = ({ classroom }) => {
  return (
    <AppLayout title="Detail Classroom" description="Detail classroom">
      <Card>
        <CardHeader>
          <CardTitle>{classroom.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{classroom.name}</CardTitle>
            <CardDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, quia!</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{classroom.name}</CardTitle>
            <CardDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, quia!</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{classroom.name}</CardTitle>
            <CardDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, quia!</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{classroom.name}</CardTitle>
            <CardDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, quia!</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ShowClassroom;
