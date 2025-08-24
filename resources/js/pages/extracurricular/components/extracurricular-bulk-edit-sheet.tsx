import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Extracurricular } from '@/types/extracurricular';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  extracurricularIds: Extracurricular['id'][];
};

const ExtracurricularBulkEditSheet: FC<Props> = ({ children, extracurricularIds }) => {
  const { data, put } = useForm({
    extracurricular_ids: extracurricularIds,
  });

  const handleSubmit = () => {
    put(route('extracurricular.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Extracurricular updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah extracurricular</SheetTitle>
          <SheetDescription>Ubah data {data.extracurricular_ids.length} extracurricular</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan extracurricular
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

export default ExtracurricularBulkEditSheet;
