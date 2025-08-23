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
import { Academicyear } from '@/types/academicyear';
import { router } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  academicyear: Academicyear;
};

const AcademicyearSetActiveDialog: FC<Props> = ({ children, academicyear }) => {
  const [open, setOpen] = useState(false);

  const handleSetActive = () => {
    router.put(
      route('academicyear.set-active', academicyear.id),
      {},
      {
        preserveScroll: true,
        onSuccess: () => toast.success('Academicyear set active!'),
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
            This action cannot be undone. This will permanently delete academicyear and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSetActive}>
            <Check />
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AcademicyearSetActiveDialog;
