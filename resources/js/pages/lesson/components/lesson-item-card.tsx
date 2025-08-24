import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Lesson } from '@/types/lesson';
import { Link } from '@inertiajs/react';
import LessonFormSheet from './lesson-form-sheet';
import LessonDeleteDialog from './lesson-delete-dialog';

type Props = {
  lesson: Lesson;
};

const LessonItemCard: FC<Props> = ({ lesson }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ lesson.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { lesson.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('lesson.show', lesson.id)}>
            <Folder />
          </Link>
        </Button>
        <LessonFormSheet purpose="edit" lesson={ lesson }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </LessonFormSheet>
        <LessonDeleteDialog lesson={ lesson }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </LessonDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default LessonItemCard;
