import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Family } from '@/types/family';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import FamilyDeleteDialog from './family-delete-dialog';
import FamilyFormSheet from './family-form-sheet';

type Props = {
  family: Family;
};

const FamilyItemCard: FC<Props> = ({ family }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{family.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {family.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('family.show', family.id)}>
            <Folder />
          </Link>
        </Button>
        <FamilyFormSheet purpose="edit" family={family}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </FamilyFormSheet>
        <FamilyDeleteDialog family={family}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </FamilyDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default FamilyItemCard;
