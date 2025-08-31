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
import { Academicyear } from '@/types/academicyear';
import { Classroom } from '@/types/classroom';
import { Exam } from '@/types/exam';
import { Lesson } from '@/types/lesson';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  lessonId: Lesson['id'];
  exam?: Exam;
  purpose: FormPurpose;
};

const ExamFormSheet: FC<Props> = ({ children, lessonId, exam, purpose }) => {
  const [open, setOpen] = useState(false);

  const {
    lessons = [],
    academicYears = [],
    classrooms = [],
  } = usePage<{
    lessons: Lesson[];
    academicYears: Academicyear[];
    classrooms: Classroom[];
  }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    name: exam?.name ?? '',
    description: exam?.description ?? '',
    lesson_id: exam?.lesson_id ?? lessonId ?? '',
    classroom_id: exam?.classroom_id ?? '',
    academic_year_id: exam?.academic_year_id ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('exam.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Exam created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('exam.update', exam?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Exam updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data exam</SheetTitle>
          <SheetDescription>Form untuk {purpose} data exam</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Tahun ajaran">
              <Select value={data.academic_year_id.toString()} onValueChange={(value) => setData('academic_year_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((academic_year) => (
                    <SelectItem key={academic_year.id} value={academic_year.id.toString()}>
                      {academic_year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Kelas">
              <Select value={data.classroom_id.toString()} onValueChange={(value) => setData('classroom_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pelajaran" />
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
            <FormControl label="Pelajaran">
              <Select value={data.lesson_id.toString()} onValueChange={(value) => setData('lesson_id', Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {lessons.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id.toString()}>
                      {lesson.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Nama exam">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Deskripsi">
              <Textarea placeholder="Name" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} exam`} loading={processing} disabled={processing} />
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

export default ExamFormSheet;
