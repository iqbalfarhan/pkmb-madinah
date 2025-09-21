import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { Assignment } from '@/types/assignment';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  assignment: Assignment;
};

const ScoreUploadAnswerDialog: FC<Props> = ({ children, assignment }) => {
  const { students = [] } = usePage<{ students: Student[] }>().props;

  const [open, setOpen] = useState(false);

  const { data, setData, processing, post } = useForm({
    assignment_id: assignment.id,
    student_id: students[0]?.id ?? '',
    answer: '',
    file: undefined as File | undefined,
  });

  const handleSendAnswer = () => {
    post(route('score.upload-answer'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil upload jawaban');
        setData('answer', '');
        setData('file', undefined);
        setOpen(false);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload jawaban</DialogTitle>
          <DialogDescription>Untuk pelajaran {assignment.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <FormControl label="Pilih siswa">
            <Select value={data.student_id.toString()} onValueChange={(value) => setData('student_id', Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder={'Pilih siswa'} />
              </SelectTrigger>
              <SelectContent>
                {students.map((std) => (
                  <SelectItem value={std.id.toString()}>{std.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Pilih file">
            <Input type="file" onChange={(e) => setData('file', e.target.files?.[0])} />
          </FormControl>
          <FormControl label="Keterangan">
            <Textarea placeholder="keterangan" value={data.answer} onChange={(e) => setData('answer', e.target.value)} />
          </FormControl>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'secondary'}>Batalkan</Button>
          </DialogClose>
          <SubmitButton loading={processing} label="Kirim jawaban" icon={Send} onClick={handleSendAnswer} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreUploadAnswerDialog;
