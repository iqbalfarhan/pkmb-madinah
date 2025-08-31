import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { em } from '@/lib/utils';
import { Student } from '@/types/student';
import { router } from '@inertiajs/react';
import { CheckCheck } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  ppdb: Student;
};

const PpdbAcceptRegistrationSheet: FC<Props> = ({ children, ppdb }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    router.put(
      route('student.update', ppdb.id),
      {
        status: 'aktif',
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Ppdb deleted successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      },
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete ppdb and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            <CheckCheck />
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PpdbAcceptRegistrationSheet;
