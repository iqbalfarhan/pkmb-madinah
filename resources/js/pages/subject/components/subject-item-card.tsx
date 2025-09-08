import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Subject } from '@/types/subject';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import SubjectDeleteDialog from './subject-delete-dialog';
import SubjectFormSheet from './subject-form-sheet';

type Props = {
  subject: Subject;
};

const SubjectItemCard: FC<Props> = ({ subject }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{subject.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {subject.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('subject.show', subject.id)}>
            <Folder />
          </Link>
        </Button>
        <SubjectFormSheet purpose="edit" subject={subject}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </SubjectFormSheet>
        <SubjectDeleteDialog subject={subject}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </SubjectDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default SubjectItemCard;
