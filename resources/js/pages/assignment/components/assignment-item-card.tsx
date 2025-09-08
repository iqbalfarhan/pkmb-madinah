import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Assignment } from '@/types/assignment';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import AssignmentDeleteDialog from './assignment-delete-dialog';
import AssignmentFormSheet from './assignment-form-sheet';

type Props = {
  assignment: Assignment;
};

const AssignmentItemCard: FC<Props> = ({ assignment }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{assignment.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {assignment.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('assignment.show', assignment.id)}>
            <Folder />
          </Link>
        </Button>
        <AssignmentFormSheet purpose="edit" assignment={assignment}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </AssignmentFormSheet>
        <AssignmentDeleteDialog assignment={assignment}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </AssignmentDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default AssignmentItemCard;
