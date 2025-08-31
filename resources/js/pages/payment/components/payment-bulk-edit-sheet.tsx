import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Payment } from '@/types/payment';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  paymentIds: Payment['id'][];
};

const PaymentBulkEditSheet: FC<Props> = ({ children, paymentIds }) => {
  const { data, put } = useForm({
    payment_ids: paymentIds,
  });

  const handleSubmit = () => {
    put(route('payment.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Payment updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah payment</SheetTitle>
          <SheetDescription>Ubah data {data.payment_ids.length} payment</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan payment
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PaymentBulkEditSheet;
