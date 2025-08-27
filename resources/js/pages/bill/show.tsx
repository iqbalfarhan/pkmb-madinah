import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Bill } from '@/types/bill';
import { FC } from 'react';

type Props = {
  bill: Bill;
};

const ShowBill: FC<Props> = ({ bill }) => {
  return (
    <AppLayout title="Detail Bill" description="Detail bill">
      <Card>
        <CardHeader>
          <CardTitle>{ bill.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowBill;
