import WidgetCard from '@/components/widget-card';
import { usePage } from '@inertiajs/react';
import { Wallet } from 'lucide-react';

const UnverifiedPaymentWidget = () => {
  const { unverifiedPaymentsCount = 0, menus } = usePage<{ unverifiedPaymentsCount: number; menus: Record<string, boolean> }>().props;

  if (!menus.payment) return null;

  return (
    <WidgetCard
      href={route('payment.index')}
      variant={'warning'}
      icon={Wallet}
      count={`${unverifiedPaymentsCount} Pembayaran`}
      title="Konfirmasi pembayaran"
      description="pembayaran belum terferifikasi"
    />
  );
};

export default UnverifiedPaymentWidget;
