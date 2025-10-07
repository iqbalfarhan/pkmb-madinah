import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Assessment } from '@/types/assessment';
import { FC } from 'react';

type Props = {
  assessment: Assessment;
};

const ShowAssessment: FC<Props> = ({ assessment }) => {
  return (
    <AppLayout title="Detail Assessment" description="Detail assessment">
      <Card>
        <CardHeader>
          <CardTitle>{assessment.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowAssessment;
