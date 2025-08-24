import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Teacher } from '@/types/teacher';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  teacherIds: Teacher['id'][];
};

const TeacherBulkEditSheet: FC<Props> = ({ children, teacherIds }) => {
  const { data, put } = useForm({
    teacher_ids: teacherIds,
  });

  const handleSubmit = () => {
    put(route('teacher.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Teacher updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah teacher</SheetTitle>
          <SheetDescription>Ubah data {data.teacher_ids.length} teacher</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan teacher
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

export default TeacherBulkEditSheet;
