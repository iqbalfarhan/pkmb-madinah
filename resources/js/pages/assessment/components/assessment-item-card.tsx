import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Assessment } from '@/types/assessment';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import AssessmentDeleteDialog from './assessment-delete-dialog';
import AssessmentFormSheet from './assessment-form-sheet';

type Props = {
  assessment: Assessment;
};

const AssessmentItemCard: FC<Props> = ({ assessment }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{assessment.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {assessment.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('assessment.show', assessment.id)}>
            <Folder />
          </Link>
        </Button>
        <AssessmentFormSheet purpose="edit" assessment={assessment}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </AssessmentFormSheet>
        <AssessmentDeleteDialog assessment={assessment}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </AssessmentDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default AssessmentItemCard;
