import BackButton from '@/components/back-button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Activity } from '@/types/activity';
import { FC } from 'react';

type Props = {
  activity: Activity;
};

const ShowActivity: FC<Props> = ({ activity }) => {
  return (
    <AppLayout
      title="Detail Activity"
      description="Detail activity"
      actions={
        <>
          <BackButton />
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{activity.student.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowActivity;
