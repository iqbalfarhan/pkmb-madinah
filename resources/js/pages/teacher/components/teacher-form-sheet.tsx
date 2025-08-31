import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Teacher } from '@/types/teacher';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  teacher?: Teacher;
  purpose: FormPurpose;
};

const TeacherFormSheet: FC<Props> = ({ children, teacher, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset, processing } = useForm({
    name: teacher?.name ?? '',
    email: teacher?.email ?? '',
    gender: teacher?.gender ?? '',
    phone: teacher?.phone ?? '',
    password: purpose === 'create' ? 'password' : undefined,
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('teacher.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Teacher created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('teacher.update', teacher?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Teacher updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data teacher</SheetTitle>
          <SheetDescription>Form untuk {purpose} data teacher</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama teacher">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Email">
              <Input type="email" placeholder="Email address" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            </FormControl>
            <FormControl label="Jenis kelamin" required>
              <Select value={data.gender ? '1' : '0'} onValueChange={(value) => setData('gender', value == '1' ? true : false)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Laki-laki</SelectItem>
                  <SelectItem value="0">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Nomor telepon">
              <Input type="tel" placeholder="Phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
            </FormControl>
            {purpose === 'create' && (
              <FormControl label="Password">
                <Input type="password" placeholder="Password login" value={data.password} onChange={(e) => setData('password', e.target.value)} />
              </FormControl>
            )}
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} teacher`} loading={processing} disabled={processing} />
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

export default TeacherFormSheet;
