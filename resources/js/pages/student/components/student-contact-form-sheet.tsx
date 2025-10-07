import AddressSelectorDialog from '@/components/address-selector-dialog';
import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Student } from '@/types/student';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  student?: Student;
};

const StudentContactFormSheet: FC<Props> = ({ children, student }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, processing } = useForm({
    phone: student?.phone ?? '',
    email: student?.email ?? '',
    address: student?.address ?? {
      jalan: '',
      dusun: '',
      rt: '',
      rw: '',
      kelurahan: '',
      kodepos: '',
      kecamatan: '',
      kota: '',
      provinsi: '',
    },
  });

  const handleSubmit = () => {
    put(route('student.update', student?.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Student updated successfully');
        setOpen(false);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit contact student</SheetTitle>
          <SheetDescription>Form untuk edit kontak student</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nomor telepon">
              <Input type="text" placeholder="phone number" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat email">
              <Input type="text" placeholder="email address" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat">
              <AddressSelectorDialog value={data.address} onValueChange={(value) => setData('address', value)} />
              {/* <Textarea placeholder="Alamat tempat tinggal" value={data.address} onChange={(e) => setData('address', e.target.value)} /> */}
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`Simpan kontak`} loading={processing} disabled={processing} />
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

export default StudentContactFormSheet;
