import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em, capitalizeWords } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Bill } from '@/types/bill';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  bill?: Bill;
  purpose: FormPurpose;
};

const BillFormSheet: FC<Props> = ({ children, bill, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset, processing } = useForm({
    name: bill?.name ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('bill.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Bill created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('bill.update', bill?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Bill updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data bill</SheetTitle>
          <SheetDescription>Form untuk {purpose} data bill</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama bill">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} bill`} loading={processing} disabled={processing} />
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

export default BillFormSheet;
