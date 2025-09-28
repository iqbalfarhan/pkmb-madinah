import WidgetCard from '@/components/widget-card';
import { SharedData } from '@/types';
import { Bill } from '@/types/bill';
import { usePage } from '@inertiajs/react';
import { HandCoins } from 'lucide-react';

const BillWidget = () => {
  const { bills = [], permissions } = usePage<SharedData & { bills: Bill[] }>().props;

  if (!permissions?.canOpenStudentBill) return null;

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
