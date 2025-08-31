import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router, usePage } from '@inertiajs/react';

const UnverifiedPaymentWidget = () => {
  const { unverifiedPaymentsCount = 0 } = usePage<{ unverifiedPaymentsCount: number }>().props;
  return (
    <Card onClick={() => router.visit(route('payment.index'))}>
      <CardHeader>
        <CardTitle>Konfirmasi pembayaran</CardTitle>
        <CardDescription>{unverifiedPaymentsCount} pembayaran belum terferifikasi</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default UnverifiedPaymentWidget;
