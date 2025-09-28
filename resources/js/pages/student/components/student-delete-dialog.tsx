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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { em } from '@/lib/utils';
import { Student } from '@/types/student';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  student: Student;
};

const StudentDeleteDialog: FC<Props> = ({ children, student }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

  // const { statusLists = [] } = usePage<{ statusLists: string[] }>().props;

  const handleDelete = () => {
    router.delete(route('student.destroy', student.id), {
      data: {
        status,
      },
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Student deleted successfully');
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
          <AlertDialogTitle>Arsipkan siswa?</AlertDialogTitle>
          <AlertDialogDescription>Pilih status siswa sebagai alasan mengapa siswa diarsipkan.</AlertDialogDescription>
        </AlertDialogHeader>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status siswa" />
          </SelectTrigger>
          <SelectContent>
            {['lulus', 'dikeluarkan', 'pindah'].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

export default StudentDeleteDialog;
