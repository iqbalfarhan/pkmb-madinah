import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Examscore } from '@/types/examscore';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  examscoreIds: Examscore['id'][];
};

const ExamscoreBulkEditSheet: FC<Props> = ({ children, examscoreIds }) => {
  const { data, put } = useForm({
    examscore_ids: examscoreIds,
  });

  const handleSubmit = () => {
    put(route('examscore.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Examscore updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah examscore</SheetTitle>
          <SheetDescription>Ubah data {data.examscore_ids.length} examscore</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan examscore
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

export default ExamscoreBulkEditSheet;
