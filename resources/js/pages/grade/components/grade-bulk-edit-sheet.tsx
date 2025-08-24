import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Grade } from '@/types/grade';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  gradeIds: Grade['id'][];
};

const GradeBulkEditSheet: FC<Props> = ({ children, gradeIds }) => {
  const { data, put } = useForm({
    grade_ids: gradeIds,
  });

  const handleSubmit = () => {
    put(route('grade.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Grade updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah grade</SheetTitle>
          <SheetDescription>Ubah data {data.grade_ids.length} grade</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan grade
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

export default GradeBulkEditSheet;
