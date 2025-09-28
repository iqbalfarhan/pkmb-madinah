import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Academicyear } from '@/types/academicyear';
import { useForm } from '@inertiajs/react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Check, Minus, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  academicyear?: Academicyear;
  purpose: FormPurpose;
};

const AcademicyearFormSheet: FC<Props> = ({ children, academicyear, purpose }) => {
  const [open, setOpen] = useState(false);
  const mobile = useIsMobile();

  const { data, setData, put, post, reset, processing } = useForm({
    year: academicyear?.year ?? '',
    semester: academicyear?.semester ?? 'ganjil',
    new_classroom: true as CheckedState,
    sync_student_classroom: true as CheckedState,
    active: true as CheckedState,
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('academicyear.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Academicyear created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('academicyear.update', academicyear?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Academicyear updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={mobile ? 'bottom' : 'right'}>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data academicyear</SheetTitle>
          <SheetDescription>Form untuk {purpose} data academicyear</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Tahun ajaran" hint="format penulisan: 20xx/20xx">
              <Input type="text" placeholder="20xx/20xx" value={data.year} onChange={(e) => setData('year', e.target.value)} />
            </FormControl>
            {purpose === 'edit' && (
              <FormControl label="Semester">
                <Select value={data.semester} onValueChange={(e) => setData('semester', e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ganjil">Ganjil</SelectItem>
                    <SelectItem value="genap">Genap</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            )}
            <FormControl label="Opsi tahun ajaran baru" asDiv className="grid space-y-1">
              <Alert
                className="cursor-pointer"
                variant={data.new_classroom ? 'success' : 'default'}
                onClick={() => setData('new_classroom', !data.new_classroom)}
              >
                {data.new_classroom ? <Check /> : <Minus />}
                <AlertTitle>Buat kelas baru</AlertTitle>
                <AlertDescription>Duplikat data kelas dari tahun ajaran sebelumnya</AlertDescription>
              </Alert>
              <Alert
                className="cursor-pointer"
                variant={data.sync_student_classroom ? 'success' : 'default'}
                onClick={() => setData('sync_student_classroom', !data.sync_student_classroom)}
              >
                {data.sync_student_classroom ? <Check /> : <Minus />}
                <AlertTitle>Sinkronisasi kelas siswa</AlertTitle>
                <AlertDescription>Sesuaikan kelas siswa berdasarkan naik kelas atau tinggal kelas dari rapor nilai terakhir.</AlertDescription>
              </Alert>
              <Alert className="cursor-pointer" variant={data.active ? 'success' : 'default'} onClick={() => setData('active', !data.active)}>
                {data.active ? <Check /> : <Minus />}
                <AlertTitle>Jadikan tahun ajaran sebagai aktif</AlertTitle>
                <AlertDescription>Jadikan tahun ajaran baru ini sebgai tahun ajaran yang aktif.</AlertDescription>
              </Alert>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} academicyear`} loading={processing} disabled={processing} />
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

export default AcademicyearFormSheet;
