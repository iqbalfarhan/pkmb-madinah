import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Absent } from '@/types/absent';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  absentIds: Absent['id'][];
};

const AbsentBulkEditSheet: FC<Props> = ({ children, absentIds }) => {
  const { data, put } = useForm({
    absent_ids: absentIds,
  });

  const handleSubmit = () => {
    put(route('absent.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Absent updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah absent</SheetTitle>
          <SheetDescription>Ubah data {data.absent_ids.length} absent</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan absent
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

export default AbsentBulkEditSheet;
