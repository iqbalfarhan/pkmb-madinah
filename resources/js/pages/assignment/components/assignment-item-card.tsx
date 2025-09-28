import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Assignment } from '@/types/assignment';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  assignment: Assignment;
};

const AssignmentItemCard: FC<Props> = ({ assignment }) => {
  return (
    <Card className="flex flex-col justify-between p-2">
      <Link href={route('assignment.show', assignment.id)}>
        <CardHeader className="p-2">
          <CardTitle className="leading-normal">{assignment.name}</CardTitle>
          <CardDescription>{assignment.lesson.name}</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
};

export default AssignmentItemCard;
