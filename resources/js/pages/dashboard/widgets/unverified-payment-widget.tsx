import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';

const UnverifiedPaymentWidget = () => {
  const { unverifiedPaymentsCount = 0 } = usePage<{ unverifiedPaymentsCount: number }>().props;
  return (
    <Card onClick={() => router.visit(route('payment.index'))}>
      <div className="flex">
        <CardHeader>
          <Bell />
        </CardHeader>
        <CardHeader className="pl-0">
          <CardTitle>Konfirmasi pembayaran</CardTitle>
          <CardDescription>{unverifiedPaymentsCount} pembayaran belum terferifikasi</CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
};

export default UnverifiedPaymentWidget;
