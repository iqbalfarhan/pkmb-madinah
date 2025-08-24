import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Teacher } from '@/types/teacher';
import { Link } from '@inertiajs/react';
import TeacherFormSheet from './teacher-form-sheet';
import TeacherDeleteDialog from './teacher-delete-dialog';

type Props = {
  teacher: Teacher;
};

const TeacherItemCard: FC<Props> = ({ teacher }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ teacher.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { teacher.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('teacher.show', teacher.id)}>
            <Folder />
          </Link>
        </Button>
        <TeacherFormSheet purpose="edit" teacher={ teacher }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </TeacherFormSheet>
        <TeacherDeleteDialog teacher={ teacher }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </TeacherDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default TeacherItemCard;
