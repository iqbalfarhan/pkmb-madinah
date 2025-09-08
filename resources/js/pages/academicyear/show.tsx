import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Academicyear } from '@/types/academicyear';
import { FC } from 'react';

type Props = {
  academicyear: Academicyear;
};

const ShowAcademicyear: FC<Props> = ({ academicyear }) => {
  return (
    <AppLayout title="Detail Academicyear" description="Detail academicyear">
      <Card>
        <CardHeader>
          <CardTitle>{academicyear.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowAcademicyear;
