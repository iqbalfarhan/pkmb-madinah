import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Exam } from '@/types/exam';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ExamDeleteDialog from './exam-delete-dialog';
import ExamFormSheet from './exam-form-sheet';

type Props = {
  exam: Exam;
};

const ExamItemCard: FC<Props> = ({ exam }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{exam.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {exam.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('exam.show', exam.id)}>
            <Folder />
          </Link>
        </Button>
        <ExamFormSheet purpose="edit" exam={exam}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ExamFormSheet>
        <ExamDeleteDialog exam={exam}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ExamDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ExamItemCard;
