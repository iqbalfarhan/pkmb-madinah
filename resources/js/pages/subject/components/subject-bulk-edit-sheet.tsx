import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Subject } from '@/types/subject';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  subjectIds: Subject['id'][];
};

const SubjectBulkEditSheet: FC<Props> = ({ children, subjectIds }) => {
  const { data, put } = useForm({
    subject_ids: subjectIds,
  });

  const handleSubmit = () => {
    put(route('subject.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Subject updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah subject</SheetTitle>
          <SheetDescription>Ubah data {data.subject_ids.length} subject</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan subject
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

export default SubjectBulkEditSheet;
