import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Classroom } from '@/types/classroom';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  classroomIds: Classroom['id'][];
};

const ClassroomBulkEditSheet: FC<Props> = ({ children, classroomIds }) => {
  const { data, put } = useForm({
    classroom_ids: classroomIds,
  });

  const handleSubmit = () => {
    put(route('classroom.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Classroom updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah classroom</SheetTitle>
          <SheetDescription>Ubah data {data.classroom_ids.length} classroom</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan classroom
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

export default ClassroomBulkEditSheet;
