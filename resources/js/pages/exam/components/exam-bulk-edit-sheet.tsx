import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Exam } from '@/types/exam';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  examIds: Exam['id'][];
};

const ExamBulkEditSheet: FC<Props> = ({ children, examIds }) => {
  const { data, put } = useForm({
    exam_ids: examIds,
  });

  const handleSubmit = () => {
    put(route('exam.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Exam updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah exam</SheetTitle>
          <SheetDescription>Ubah data {data.exam_ids.length} exam</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan exam
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

export default ExamBulkEditSheet;
