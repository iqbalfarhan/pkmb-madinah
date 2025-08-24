import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Classroom } from '@/types/classroom';
import { Link } from '@inertiajs/react';
import ClassroomFormSheet from './classroom-form-sheet';
import ClassroomDeleteDialog from './classroom-delete-dialog';

type Props = {
  classroom: Classroom;
};

const ClassroomItemCard: FC<Props> = ({ classroom }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ classroom.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { classroom.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('classroom.show', classroom.id)}>
            <Folder />
          </Link>
        </Button>
        <ClassroomFormSheet purpose="edit" classroom={ classroom }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ClassroomFormSheet>
        <ClassroomDeleteDialog classroom={ classroom }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ClassroomDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ClassroomItemCard;
