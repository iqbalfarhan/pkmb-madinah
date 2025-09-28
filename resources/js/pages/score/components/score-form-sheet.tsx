import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Assignment } from '@/types/assignment';
import { Classroom } from '@/types/classroom';
import { Lesson } from '@/types/lesson';
import { Score } from '@/types/score';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  score?: Score;
  purpose: FormPurpose;
};

const ScoreFormSheet: FC<Props> = ({ children, score, purpose }) => {
  const [open, setOpen] = useState(false);

  const {
    classrooms = [],
    students = [],
    lessons = [],
    assignments = [],
  } = usePage<{ classrooms: Classroom[]; students: Student[]; lessons: Lesson[]; assignments: Assignment[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    student_id: score?.student_id ?? '',
    classroom_id: '',
    lesson_id: score?.lesson_id ?? '',
    assignment_id: score?.assignment_id ?? '',
    score: score?.score ?? '',
    remark: score?.remark ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('score.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Score created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('score.update', score?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Score updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data score</SheetTitle>
          <SheetDescription>Form untuk {purpose} data score</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-4 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Kelas">
              <Select value={data.classroom_id.toString()} onValueChange={(value) => setData('classroom_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms.map((classroom) => (
                    <SelectItem key={classroom.id} value={classroom.id.toString()}>
                      {classroom.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Nama siswa">
              <Select value={data.student_id.toString()} onValueChange={(value) => setData('student_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih siswa" />
                </SelectTrigger>
                <SelectContent>
                  {students
                    .filter((student) => (data?.classroom_id ? data?.classroom_id.toString() === student?.classroom_id?.toString() : false))
                    .map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Pelajaran">
              <Select value={data.lesson_id.toString()} onValueChange={(value) => setData('lesson_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {lessons
                    .filter((lesson) => (data?.classroom_id ? data?.classroom_id.toString() === lesson?.classroom_id?.toString() : false))
                    .map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id.toString()}>
                        {lesson.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Assignment">
              <Select value={data.assignment_id.toString()} onValueChange={(value) => setData('assignment_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih assignment" />
                </SelectTrigger>
                <SelectContent>
                  {assignments
                    .filter((assignment) => (data.lesson_id ? data.lesson_id.toString() === assignment.lesson_id.toString() : false))
                    .map((assignment) => (
                      <SelectItem key={assignment.id} value={assignment.id.toString()}>
                        <span className="line-clamp-1 w-full">{assignment.name}</span>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Nilai">
              <Input type="number" step={0.01} placeholder="Nilai" value={data.score} onChange={(e) => setData('score', e.target.value)} />
            </FormControl>
            <FormControl label="Keterangan">
              <Textarea placeholder="Keterangan" value={data.remark} onChange={(e) => setData('remark', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} score`} loading={processing} disabled={processing} />
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

export default ScoreFormSheet;
