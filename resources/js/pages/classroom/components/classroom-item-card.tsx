import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
        <CardDescription>Tingkat {classroom.grade.name}</CardDescription>
      </CardHeader>
      <CardFooter>
        <CardDescription>{classroom.students?.length} siswa</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default ClassroomItemCard;
