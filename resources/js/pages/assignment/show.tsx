import BackButton from '@/components/back-button';
import DDump from '@/components/d-dump';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Assignment } from '@/types/assignment';
import { FC } from 'react';

type Props = {
  assignment: Assignment;
};

const ShowAssignment: FC<Props> = ({ assignment }) => {
  return (
    <AppLayout
      title="Detail Assignment"
      description="Detail assignment"
      actions={
        <>
          <BackButton />
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{assignment.name}</CardTitle>
          <CardDescription>{assignment.description}</CardDescription>
        </CardHeader>
      </Card>

      <DDump content={assignment.scores} />
    </AppLayout>
  );
};

export default ShowAssignment;
