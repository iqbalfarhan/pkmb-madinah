import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Score } from '@/types/score';
import { FC } from 'react';

type Props = {
  score: Score;
};

const ShowScore: FC<Props> = ({ score }) => {
  return (
    <AppLayout title="Detail Score" description="Detail score">
      <Card>
        <CardHeader>
          <CardTitle>{score.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowScore;
