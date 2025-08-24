import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Lesson } from '@/types/lesson';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  lessonIds: Lesson['id'][];
};

const LessonBulkEditSheet: FC<Props> = ({ children, lessonIds }) => {
  const { data, put } = useForm({
    lesson_ids: lessonIds,
  });

  const handleSubmit = () => {
    put(route('lesson.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Lesson updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah lesson</SheetTitle>
          <SheetDescription>Ubah data {data.lesson_ids.length} lesson</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan lesson
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

export default LessonBulkEditSheet;
