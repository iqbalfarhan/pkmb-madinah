import BackButton from '@/components/back-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { Paymenttype } from '@/types/paymenttype';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import PaymenttypeFormSheet from './components/paymenttype-form-sheet';

type Props = {
  paymenttype: Paymenttype;
};

const ShowPaymenttype: FC<Props> = ({ paymenttype }) => {
  return (
    <AppLayout
      title="Detail Paymenttype"
      description="Detail paymenttype"
      actions={
        <>
          <BackButton />
          <PaymenttypeFormSheet purpose="edit" paymenttype={paymenttype}>
            <Button>
              <Edit /> Edit jenis pembayaran
            </Button>
          </PaymenttypeFormSheet>
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{paymenttype.name}</CardTitle>
          <CardDescription>Default amount: {formatRupiah(paymenttype.default_amount)}</CardDescription>
        </CardHeader>
        <Separator />
        <CardFooter>
          <Button variant={'outline'}>
            Waktu pembayaran
            <Badge>{paymenttype.billing_cycle}</Badge>
          </Button>
        </CardFooter>
      </Card>
    </AppLayout>
  );
};

export default ShowPaymenttype;
