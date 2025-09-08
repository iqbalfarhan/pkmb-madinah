import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Academicyear } from '@/types/academicyear';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import AcademicyearDeleteDialog from './academicyear-delete-dialog';
import AcademicyearFormSheet from './academicyear-form-sheet';

type Props = {
  academicyear: Academicyear;
};

const AcademicyearItemCard: FC<Props> = ({ academicyear }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{academicyear.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {academicyear.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('academicyear.show', academicyear.id)}>
            <Folder />
          </Link>
        </Button>
        <AcademicyearFormSheet purpose="edit" academicyear={academicyear}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </AcademicyearFormSheet>
        <AcademicyearDeleteDialog academicyear={academicyear}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </AcademicyearDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default AcademicyearItemCard;
