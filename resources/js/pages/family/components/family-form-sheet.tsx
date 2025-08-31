import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Family } from '@/types/family';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  family?: Family;
  student: Student;
  purpose: FormPurpose;
};

const FamilyFormSheet: FC<Props> = ({ children, family, purpose, student }) => {
  const [open, setOpen] = useState(false);

  const { sallaryLists = [] } = usePage<{ sallaryLists: string[] }>().props;

  const { data, setData, put, post, processing } = useForm({
    student_id: student.id,
    father_name: family?.father_name ?? '',
    father_ocupation: family?.father_ocupation ?? '',
    father_address: family?.father_address ?? '',
    father_phone: family?.father_phone ?? '',
    father_sallary: family?.father_sallary ?? '',
    mother_name: family?.mother_name ?? '',
    mother_ocupation: family?.mother_ocupation ?? '',
    mother_address: family?.mother_address ?? '',
    mother_phone: family?.mother_phone ?? '',
    mother_sallary: family?.mother_sallary ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('family.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Family created successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('family.update', family?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Family updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data family</SheetTitle>
          <SheetDescription>Form untuk {purpose} data family</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="flex-1 space-y-6 px-4">
            <HeadingSmall title="Data ayah" description="Informasi data ayah" />
            <FormControl label="Nama ayah">
              <Input type="text" placeholder="Name" value={data.father_name} onChange={(e) => setData('father_name', e.target.value)} />
            </FormControl>
            <FormControl label="Pekerjaan ayah">
              <Input
                type="text"
                placeholder="Pekerjaan ayah"
                value={data.father_ocupation}
                onChange={(e) => setData('father_ocupation', e.target.value)}
              />
            </FormControl>
            <FormControl label="Alamat ayah">
              <Textarea placeholder="Alamat" value={data.father_address} onChange={(e) => setData('father_address', e.target.value)} />
            </FormControl>
            <FormControl label="Nomor telepon ayah">
              <Input type="tel" placeholder="Nomor telepon" value={data.father_phone} onChange={(e) => setData('father_phone', e.target.value)} />
            </FormControl>
            <FormControl label="Pendapatan ayah">
              <Select value={data.father_sallary} onValueChange={(e) => setData('father_sallary', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pendapatan" />
                </SelectTrigger>
                <SelectContent>
                  {sallaryLists.map((sallary) => (
                    <SelectItem key={sallary} value={sallary}>
                      {sallary}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <HeadingSmall title="Data ibu" description="Informasi data ibu" />
            <FormControl label="Nama ibu">
              <Input type="text" placeholder="Name" value={data.mother_name} onChange={(e) => setData('mother_name', e.target.value)} />
            </FormControl>
            <FormControl label="Pekerjaan ibu">
              <Input
                type="text"
                placeholder="Pekerjaan ibu"
                value={data.mother_ocupation}
                onChange={(e) => setData('mother_ocupation', e.target.value)}
              />
            </FormControl>
            <FormControl label="Alamat ibu">
              <Textarea placeholder="Alamat" value={data.mother_address} onChange={(e) => setData('mother_address', e.target.value)} />
            </FormControl>
            <FormControl label="Nomor telepon ibu">
              <Input type="tel" placeholder="Nomor telepon" value={data.mother_phone} onChange={(e) => setData('mother_phone', e.target.value)} />
            </FormControl>
            <FormControl label="Pendapatan ibu">
              <Select value={data.mother_sallary} onValueChange={(e) => setData('mother_sallary', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pendapatan" />
                </SelectTrigger>
                <SelectContent>
                  {sallaryLists.map((sallary) => (
                    <SelectItem key={sallary} value={sallary}>
                      {sallary}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} family`} loading={processing} disabled={processing} />
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

export default FamilyFormSheet;
