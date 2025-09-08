import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Payment } from '@/types/payment';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import PaymentDeleteDialog from './payment-delete-dialog';
import PaymentFormSheet from './payment-form-sheet';

type Props = {
  payment: Payment;
};

const PaymentItemCard: FC<Props> = ({ payment }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{payment.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {payment.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('payment.show', payment.id)}>
            <Folder />
          </Link>
        </Button>
        <PaymentFormSheet purpose="edit" payment={payment}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </PaymentFormSheet>
        <PaymentDeleteDialog payment={payment}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </PaymentDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default PaymentItemCard;
