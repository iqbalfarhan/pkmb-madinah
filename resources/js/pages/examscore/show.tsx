import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Examscore } from '@/types/examscore';
import { FC } from 'react';

type Props = {
  examscore: Examscore;
};

const ShowExamscore: FC<Props> = ({ examscore }) => {
  return (
    <AppLayout title="Detail Examscore" description="Detail examscore">
      <Card>
        <CardHeader>
          <CardTitle>{ examscore.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowExamscore;
