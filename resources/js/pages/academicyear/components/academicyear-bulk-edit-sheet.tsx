import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Academicyear } from '@/types/academicyear';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  academicyearIds: Academicyear['id'][];
};

const AcademicyearBulkEditSheet: FC<Props> = ({ children, academicyearIds }) => {
  const { data, put } = useForm({
    academicyear_ids: academicyearIds,
  });

  const handleSubmit = () => {
    put(route('academicyear.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Academicyear updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah academicyear</SheetTitle>
          <SheetDescription>Ubah data {data.academicyear_ids.length} academicyear</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan academicyear
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

export default AcademicyearBulkEditSheet;
