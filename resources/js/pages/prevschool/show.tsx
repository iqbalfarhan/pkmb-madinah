import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Prevschool } from '@/types/prevschool';
import { FC } from 'react';

type Props = {
  prevschool: Prevschool;
};

const ShowPrevschool: FC<Props> = ({ prevschool }) => {
  return (
    <AppLayout title="Detail Prevschool" description="Detail prevschool">
      <Card>
        <CardHeader>
          <CardTitle>{prevschool.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowPrevschool;
