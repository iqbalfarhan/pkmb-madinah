import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Paymenttype } from '@/types/paymenttype';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  paymenttype?: Paymenttype;
  purpose: FormPurpose;
};

const PaymenttypeFormSheet: FC<Props> = ({ children, paymenttype, purpose }) => {
  const [open, setOpen] = useState(false);

  const { defaultCycles } = usePage<{ defaultCycles: string[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    name: paymenttype?.name ?? '',
    billing_cycle: paymenttype?.billing_cycle ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('paymenttype.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Paymenttype created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('paymenttype.update', paymenttype?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Paymenttype updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data paymenttype</SheetTitle>
          <SheetDescription>Form untuk {purpose} data paymenttype</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama paymenttype">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Jenis pembayaran">
              <Select value={data.billing_cycle} onValueChange={(e) => setData('billing_cycle', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  {defaultCycles.map((cycle) => (
                    <SelectItem key={cycle} value={cycle}>
                      {cycle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} paymenttype`} loading={processing} disabled={processing} />
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

export default PaymenttypeFormSheet;
