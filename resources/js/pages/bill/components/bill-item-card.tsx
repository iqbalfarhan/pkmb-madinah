import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bill } from '@/types/bill';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import BillDeleteDialog from './bill-delete-dialog';
import BillFormSheet from './bill-form-sheet';

type Props = {
  bill: Bill;
};

const BillItemCard: FC<Props> = ({ bill }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{bill.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {bill.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('bill.show', bill.id)}>
            <Folder />
          </Link>
        </Button>
        <BillFormSheet purpose="edit" bill={bill}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </BillFormSheet>
        <BillDeleteDialog bill={bill}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </BillDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default BillItemCard;
