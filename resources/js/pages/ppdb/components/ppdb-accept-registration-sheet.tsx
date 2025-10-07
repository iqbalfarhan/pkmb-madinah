import FormControl from '@/components/form-control';
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
import { Classroom } from '@/types/classroom';
import { Student } from '@/types/student';
import { router, usePage } from '@inertiajs/react';
import { CheckCheck } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  ppdb: Student;
};

const PpdbAcceptRegistrationSheet: FC<Props> = ({ children, ppdb }) => {
  const [open, setOpen] = useState(false);
  const [classroomId, setClassroomId] = useState<Classroom['id'] | undefined>(undefined);

  const { classrooms = [] } = usePage<{ classrooms: Classroom[] }>().props;

  const handleDelete = () => {
    router.put(
      route('student.update', ppdb.id),
      {
        status: 'aktif',
        classroom_id: classroomId,
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
        <FormControl label="Pilih kelas untuk siswa baru">
          <Select value={classroomId?.toString()} onValueChange={(value) => setClassroomId(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kelas" />
            </SelectTrigger>
            <SelectContent>
              {classrooms
                .filter((c) => c.grade_id === ppdb.grade_id)
                .map((cl) => (
                  <SelectItem key={cl.id} value={cl.id.toString()}>
                    {cl.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </FormControl>
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
