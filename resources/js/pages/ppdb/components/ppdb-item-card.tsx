import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Ppdb } from '@/types/ppdb';
import { Link } from '@inertiajs/react';
import PpdbFormSheet from './ppdb-form-sheet';
import PpdbDeleteDialog from './ppdb-delete-dialog';

type Props = {
  ppdb: Ppdb;
};

const PpdbItemCard: FC<Props> = ({ ppdb }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ ppdb.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { ppdb.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('ppdb.show', ppdb.id)}>
            <Folder />
          </Link>
        </Button>
        <PpdbFormSheet purpose="edit" ppdb={ ppdb }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </PpdbFormSheet>
        <PpdbDeleteDialog ppdb={ ppdb }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </PpdbDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default PpdbItemCard;
