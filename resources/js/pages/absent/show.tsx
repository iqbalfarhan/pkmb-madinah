import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Absent } from '@/types/absent';
import { FC } from 'react';

type Props = {
  absent: Absent;
};

const ShowAbsent: FC<Props> = ({ absent }) => {
  return (
    <AppLayout title="Detail Absent" description="Detail absent">
      <Card>
        <CardHeader>
          <CardTitle>{absent.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowAbsent;
