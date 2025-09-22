import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Academicyear } from '@/types/academicyear';
import { useForm } from '@inertiajs/react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Info, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  academicyear?: Academicyear;
  purpose: FormPurpose;
};

const AcademicyearFormSheet: FC<Props> = ({ children, academicyear, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset, processing } = useForm({
    year: academicyear?.year ?? '',
    semester: academicyear?.semester ?? 'ganjil',
    new_classroom: true as CheckedState,
    detach_students: true as CheckedState,
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
      <SheetContent>
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
            <FormControl label="Tahun" hint="format penulisan: 20xx/20xx">
              <Input type="text" placeholder="Name" value={data.year} onChange={(e) => setData('year', e.target.value)} />
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
            <FormControl label="Pengaturan kelas">
              <div className="grid">
                <Label className="flex h-8 items-center gap-2">
                  <Checkbox checked={data.new_classroom} onCheckedChange={(c) => setData('new_classroom', c)} />
                  <span>Buat kelas baru (duplicate dari sebelumnya)</span>
                </Label>
                <Label className="flex h-8 items-center gap-2">
                  <Checkbox checked={data.detach_students} onCheckedChange={(c) => setData('detach_students', c)} />
                  <span>Sinkronisasi kelas siswa (setelah naik atau tinggal kelas dari rapor)</span>
                </Label>
                <Label className="flex h-8 items-center gap-2">
                  <Checkbox checked={data.active} onCheckedChange={(c) => setData('active', c)} />
                  <span>Jadikan tahun ajaran sebagai aktif</span>
                </Label>
              </div>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          {purpose === 'create' && (
            <Alert variant={'success'}>
              <Info />
              <AlertTitle>Harap diperhatikan</AlertTitle>
              <AlertDescription>
                Mengubah tahun ajaran harus dilakukan apabila semua kegiatan yang berhubungan dengan tahun ajaran berakhir, data yang tahun ajaran
                yang sudah tidak berlaku tidak bisa diubah kembali
              </AlertDescription>
            </Alert>
          )}
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
