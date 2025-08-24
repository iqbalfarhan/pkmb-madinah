import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Paymenttype } from '@/types/paymenttype';
import { Link } from '@inertiajs/react';
import PaymenttypeFormSheet from './paymenttype-form-sheet';
import PaymenttypeDeleteDialog from './paymenttype-delete-dialog';

type Props = {
  paymenttype: Paymenttype;
};

const PaymenttypeItemCard: FC<Props> = ({ paymenttype }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ paymenttype.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { paymenttype.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('paymenttype.show', paymenttype.id)}>
            <Folder />
          </Link>
        </Button>
        <PaymenttypeFormSheet purpose="edit" paymenttype={ paymenttype }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </PaymenttypeFormSheet>
        <PaymenttypeDeleteDialog paymenttype={ paymenttype }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </PaymenttypeDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default PaymenttypeItemCard;
