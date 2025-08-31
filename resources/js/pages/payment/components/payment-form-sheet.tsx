import FormControl from '@/components/form-control';
import MoneyInput from '@/components/money-input';
import SubmitButton from '@/components/submit-button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Bill } from '@/types/bill';
import { Payment } from '@/types/payment';
import { router, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  billId: Bill['id'];
  payment?: Payment;
  purpose: FormPurpose;
};

const PaymentFormSheet: FC<Props> = ({ children, payment, purpose, billId }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, post, processing } = useForm({
    bill_id: payment?.bill_id ?? billId,
    amount: payment?.amount ?? '',
    file: undefined as File | undefined,
    remark: payment?.remark ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('payment.store'), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Payment created successfully');
          setData('file', undefined);
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      router.post(
        route('payment.update', payment?.id),
        { ...data, _method: 'put' },
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success('Payment updated successfully');
            setData('file', undefined);
            setOpen(false);
          },
          onError: (e) => toast.error(em(e)),
        },
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data payment</SheetTitle>
          <SheetDescription>Form untuk {purpose} data payment</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-4">
            <FormControl label="Nominal bayar">
              <MoneyInput value={Number(data.amount)} onValueChange={(e) => setData('amount', Number(e))} />
            </FormControl>
            <FormControl label="Bukti bayar">
              <Input accept="image/*" type="file" onChange={(e) => setData('file', e.target.files?.[0])} />
              {data.file && (
                <Avatar className="size-32 rounded-xl">
                  <AvatarImage src={URL.createObjectURL(data.file)} className="object-cover" />
                </Avatar>
              )}
            </FormControl>
            <FormControl label="Catatan pembayaran">
              <Textarea placeholder="Catatan pembayaran" value={data.remark} onChange={(e) => setData('remark', e.target.value)} />
            </FormControl>
          </div>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} payment`} loading={processing} disabled={processing} />
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

export default PaymentFormSheet;
