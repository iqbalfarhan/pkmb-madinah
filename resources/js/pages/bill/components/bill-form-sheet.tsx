import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Bill } from '@/types/bill';
import { Paymenttype } from '@/types/paymenttype';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  bill?: Bill;
  purpose: FormPurpose;
};

const BillFormSheet: FC<Props> = ({ children, bill, purpose }) => {
  const [open, setOpen] = useState(false);

  const { student, students, paymentTypes = [] } = usePage<{ student: Student; students: Student[]; paymentTypes: Paymenttype[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    student_id: bill?.student_id ?? student?.id ?? '',
    payment_type_id: bill?.payment_type_id ?? '',
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
            <FormControl label="Pilih siswa">
              <Select value={data.student_id.toString()} onValueChange={(e) => setData('student_id', parseInt(e))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Siswa" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Tipe Pembayaran">
              <Select value={data.payment_type_id.toString()} onValueChange={(e) => setData('payment_type_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tipe Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
