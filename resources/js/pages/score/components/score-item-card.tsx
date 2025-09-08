import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Score } from '@/types/score';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ScoreDeleteDialog from './score-delete-dialog';
import ScoreFormSheet from './score-form-sheet';

type Props = {
  score: Score;
};

const ScoreItemCard: FC<Props> = ({ score }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{score.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {score.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('score.show', score.id)}>
            <Folder />
          </Link>
        </Button>
        <ScoreFormSheet purpose="edit" score={score}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ScoreFormSheet>
        <ScoreDeleteDialog score={score}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ScoreDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ScoreItemCard;
