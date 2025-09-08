import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Grade } from '@/types/grade';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import GradeDeleteDialog from './grade-delete-dialog';
import GradeFormSheet from './grade-form-sheet';

type Props = {
  grade: Grade;
};

const GradeItemCard: FC<Props> = ({ grade }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{grade.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {grade.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('grade.show', grade.id)}>
            <Folder />
          </Link>
        </Button>
        <GradeFormSheet purpose="edit" grade={grade}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </GradeFormSheet>
        <GradeDeleteDialog grade={grade}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </GradeDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default GradeItemCard;
