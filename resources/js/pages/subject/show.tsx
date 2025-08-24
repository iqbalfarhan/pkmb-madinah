import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Subject } from '@/types/subject';
import { FC } from 'react';

type Props = {
  subject: Subject;
};

const ShowSubject: FC<Props> = ({ subject }) => {
  return (
    <AppLayout title="Detail Subject" description="Detail subject">
      <Card>
        <CardHeader>
          <CardTitle>{ subject.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowSubject;
