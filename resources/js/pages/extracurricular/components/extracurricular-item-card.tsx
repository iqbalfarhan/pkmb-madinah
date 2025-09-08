import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Extracurricular } from '@/types/extracurricular';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ExtracurricularDeleteDialog from './extracurricular-delete-dialog';
import ExtracurricularFormSheet from './extracurricular-form-sheet';

type Props = {
  extracurricular: Extracurricular;
};

const ExtracurricularItemCard: FC<Props> = ({ extracurricular }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{extracurricular.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {extracurricular.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('extracurricular.show', extracurricular.id)}>
            <Folder />
          </Link>
        </Button>
        <ExtracurricularFormSheet purpose="edit" extracurricular={extracurricular}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ExtracurricularFormSheet>
        <ExtracurricularDeleteDialog extracurricular={extracurricular}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ExtracurricularDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ExtracurricularItemCard;
