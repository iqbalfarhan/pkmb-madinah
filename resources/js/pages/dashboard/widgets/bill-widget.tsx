import WidgetCard from '@/components/widget-card';
import { Bill } from '@/types/bill';
import { usePage } from '@inertiajs/react';
import { HandCoins } from 'lucide-react';

const BillWidget = () => {
  const { bills = [], menus } = usePage<{ bills: Bill[]; menus: Record<string, boolean> }>().props;

  if (!menus.studentBill) return null;

  return (
    <WidgetCard
      href={route('bills')}
      variant={'success'}
      icon={HandCoins}
      count={`${bills.length.toString()} tagihan`}
      title="Tagihan pembayaran"
      description="Tagihan biaya sekolah untuk siswa"
    />
  );
};

export default BillWidget;
