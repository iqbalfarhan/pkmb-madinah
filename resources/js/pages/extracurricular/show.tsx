import DDump from '@/components/d-dump';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Extracurricular } from '@/types/extracurricular';
import { FC } from 'react';

type Props = {
  extracurricular: Extracurricular;
};

const ShowExtracurricular: FC<Props> = ({ extracurricular }) => {
  return (
    <AppLayout title="Detail Extracurricular" description="Detail extracurricular">
      <Card>
        <CardHeader>
          <CardTitle>{extracurricular.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>

      <DDump content={extracurricular.activities} />
    </AppLayout>
  );
};

export default ShowExtracurricular;
