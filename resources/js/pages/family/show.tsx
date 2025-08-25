import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Family } from '@/types/family';
import { FC } from 'react';

type Props = {
  family: Family;
};

const ShowFamily: FC<Props> = ({ family }) => {
  return (
    <AppLayout title="Detail Family" description="Detail family">
      <Card>
        <CardHeader>
          <CardTitle>{ family.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowFamily;
