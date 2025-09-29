import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SharedData } from '@/types';
import { Classroom } from '@/types/classroom';
import { usePage } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import ClassroomFormSheet from '../components/classroom-form-sheet';

type Props = {
  className?: string;
};

const ClassroomEditWdiget: FC<Props> = ({ className }) => {
  const { permissions, classroom } = usePage<SharedData & { classroom: Classroom }>().props;
  if (!permissions?.canUpdate) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Edit Kelas</CardTitle>
        <CardDescription>Edit informasi kelas</CardDescription>
      </CardHeader>
      <CardFooter>
        <ClassroomFormSheet purpose="edit" classroom={classroom}>
          <Button>
            <Edit />
            Edit kelas
          </Button>
        </ClassroomFormSheet>
      </CardFooter>
    </Card>
  );
};

export default ClassroomEditWdiget;
