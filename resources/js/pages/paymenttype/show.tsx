import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Paymenttype } from '@/types/paymenttype';
import { FC } from 'react';

type Props = {
  paymenttype: Paymenttype;
};

const ShowPaymenttype: FC<Props> = ({ paymenttype }) => {
  return (
    <AppLayout title="Detail Paymenttype" description="Detail paymenttype">
      <Card>
        <CardHeader>
          <CardTitle>{ paymenttype.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowPaymenttype;
