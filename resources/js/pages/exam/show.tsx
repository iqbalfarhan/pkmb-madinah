import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Exam } from '@/types/exam';
import { FC } from 'react';

type Props = {
  exam: Exam;
};

const ShowExam: FC<Props> = ({ exam }) => {
  return (
    <AppLayout title="Detail Exam" description="Detail exam">
      <Card>
        <CardHeader>
          <CardTitle>{exam.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowExam;
