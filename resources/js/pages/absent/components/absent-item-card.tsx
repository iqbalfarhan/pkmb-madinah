import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Absent } from '@/types/absent';
import { Link } from '@inertiajs/react';
import AbsentFormSheet from './absent-form-sheet';
import AbsentDeleteDialog from './absent-delete-dialog';

type Props = {
  absent: Absent;
};

const AbsentItemCard: FC<Props> = ({ absent }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ absent.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { absent.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('absent.show', absent.id)}>
            <Folder />
          </Link>
        </Button>
        <AbsentFormSheet purpose="edit" absent={ absent }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </AbsentFormSheet>
        <AbsentDeleteDialog absent={ absent }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </AbsentDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default AbsentItemCard;
