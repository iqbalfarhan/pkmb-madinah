import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Student } from '@/types/student';
import { Link } from '@inertiajs/react';
import StudentFormSheet from './student-form-sheet';
import StudentDeleteDialog from './student-delete-dialog';

type Props = {
  student: Student;
};

const StudentItemCard: FC<Props> = ({ student }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ student.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { student.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('student.show', student.id)}>
            <Folder />
          </Link>
        </Button>
        <StudentFormSheet purpose="edit" student={ student }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </StudentFormSheet>
        <StudentDeleteDialog student={ student }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </StudentDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default StudentItemCard;
