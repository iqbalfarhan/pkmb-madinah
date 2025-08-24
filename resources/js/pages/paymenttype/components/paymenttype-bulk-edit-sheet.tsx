import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Paymenttype } from '@/types/paymenttype';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  paymenttypeIds: Paymenttype['id'][];
};

const PaymenttypeBulkEditSheet: FC<Props> = ({ children, paymenttypeIds }) => {
  const { data, put } = useForm({
    paymenttype_ids: paymenttypeIds,
  });

  const handleSubmit = () => {
    put(route('paymenttype.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Paymenttype updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah paymenttype</SheetTitle>
          <SheetDescription>Ubah data {data.paymenttype_ids.length} paymenttype</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan paymenttype
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

export default PaymenttypeBulkEditSheet;
