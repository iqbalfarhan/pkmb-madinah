import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Prevschool } from '@/types/prevschool';
import { Link } from '@inertiajs/react';
import PrevschoolFormSheet from './prevschool-form-sheet';
import PrevschoolDeleteDialog from './prevschool-delete-dialog';

type Props = {
  prevschool: Prevschool;
};

const PrevschoolItemCard: FC<Props> = ({ prevschool }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ prevschool.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { prevschool.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('prevschool.show', prevschool.id)}>
            <Folder />
          </Link>
        </Button>
        <PrevschoolFormSheet purpose="edit" prevschool={ prevschool }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </PrevschoolFormSheet>
        <PrevschoolDeleteDialog prevschool={ prevschool }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </PrevschoolDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default PrevschoolItemCard;
