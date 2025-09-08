import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Examscore } from '@/types/examscore';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ExamscoreDeleteDialog from './examscore-delete-dialog';
import ExamscoreFormSheet from './examscore-form-sheet';

type Props = {
  examscore: Examscore;
};

const ExamscoreItemCard: FC<Props> = ({ examscore }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{examscore.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {examscore.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('examscore.show', examscore.id)}>
            <Folder />
          </Link>
        </Button>
        <ExamscoreFormSheet purpose="edit" examscore={examscore}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ExamscoreFormSheet>
        <ExamscoreDeleteDialog examscore={examscore}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ExamscoreDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ExamscoreItemCard;
