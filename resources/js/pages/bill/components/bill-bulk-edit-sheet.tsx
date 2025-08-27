import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Bill } from '@/types/bill';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  billIds: Bill['id'][];
};

const BillBulkEditSheet: FC<Props> = ({ children, billIds }) => {
  const { data, put } = useForm({
    bill_ids: billIds,
  });

  const handleSubmit = () => {
    put(route('bill.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Bill updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah bill</SheetTitle>
          <SheetDescription>Ubah data {data.bill_ids.length} bill</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan bill
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

export default BillBulkEditSheet;
