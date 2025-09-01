import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Classroom } from '@/types/classroom';
import { FC } from 'react';

type Props = {
  classroom: Classroom;
};

const ClassroomItemCard: FC<Props> = ({ classroom }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{classroom.name}</CardTitle>
        <CardDescription>{classroom.grade.name}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ClassroomItemCard;
