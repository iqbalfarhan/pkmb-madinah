import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Assignment } from '@/types/assignment';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  assignmentIds: Assignment['id'][];
};

const AssignmentBulkEditSheet: FC<Props> = ({ children, assignmentIds }) => {
  const { data, put } = useForm({
    assignment_ids: assignmentIds,
  });

  const handleSubmit = () => {
    put(route('assignment.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Assignment updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah assignment</SheetTitle>
          <SheetDescription>Ubah data {data.assignment_ids.length} assignment</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan assignment
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

export default AssignmentBulkEditSheet;
