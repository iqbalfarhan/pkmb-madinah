import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Payment } from '@/types/payment';
import { FC } from 'react';

type Props = {
  payment: Payment;
};

const ShowPayment: FC<Props> = ({ payment }) => {
  return (
    <AppLayout title="Detail Payment" description="Detail payment">
      <Card>
        <CardHeader>
          <CardTitle>{payment.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowPayment;
