import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Material } from '@/types/material';
import { Link } from '@inertiajs/react';
import MaterialFormSheet from './material-form-sheet';
import MaterialDeleteDialog from './material-delete-dialog';

type Props = {
  material: Material;
};

const MaterialItemCard: FC<Props> = ({ material }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ material.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { material.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('material.show', material.id)}>
            <Folder />
          </Link>
        </Button>
        <MaterialFormSheet purpose="edit" material={ material }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </MaterialFormSheet>
        <MaterialDeleteDialog material={ material }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </MaterialDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default MaterialItemCard;
