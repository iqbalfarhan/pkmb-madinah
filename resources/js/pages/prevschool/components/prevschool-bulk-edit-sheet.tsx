import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Prevschool } from '@/types/prevschool';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  prevschoolIds: Prevschool['id'][];
};

const PrevschoolBulkEditSheet: FC<Props> = ({ children, prevschoolIds }) => {
  const { data, put } = useForm({
    prevschool_ids: prevschoolIds,
  });

  const handleSubmit = () => {
    put(route('prevschool.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Prevschool updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah prevschool</SheetTitle>
          <SheetDescription>Ubah data {data.prevschool_ids.length} prevschool</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan prevschool
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

export default PrevschoolBulkEditSheet;
