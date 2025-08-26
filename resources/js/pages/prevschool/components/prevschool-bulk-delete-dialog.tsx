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
import { Prevschool } from '@/types/prevschool';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  prevschoolIds: Prevschool['id'][];
};

const PrevschoolBulkDeleteDialog: FC<Props> = ({ children, prevschoolIds }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    router.delete(route('prevschool.bulk.destroy'), {
      data: { prevschool_ids: prevschoolIds },
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Prevschool deleted successfully');
        setOpen(false);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete selected prevschool and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            <Trash2 />
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PrevschoolBulkDeleteDialog;
