import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Academicyear } from '@/types/academicyear';
import { Classroom } from '@/types/classroom';
import { Lesson } from '@/types/lesson';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: { [key: string]: string };
};

const ExamFilterSheet: FC<Props> = ({ children, query }) => {
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

  const { data, setData, get } = useForm({
    lesson_id: query.lesson_id ?? '',
    academic_year_id: query.academic_year_id ?? '',
    classroom_id: query.classroom_id ?? '',
  });

  const applyFilter = () => {
    get(route('exam.index'), {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onSuccess: () => {
        toast.success('Filter applied successfully');
        setOpen(false);
      },
    });
  };

  const resetFilter = () => {
    setData('lesson_id', '');
    setData('academic_year_id', '');
    setData('classroom_id', '');
    router.get(
      route('exam.index'),
      {
        lesson_id: undefined,
        academic_year_id: undefined,
        classroom_id: undefined,
      },
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
      },
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter exam</SheetTitle>
          <SheetDescription>Filter data exam</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            method="get"
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilter();
            }}
          >
            <FormControl label="Tahun ajaran">
              <Select value={data.academic_year_id.toString()} onValueChange={(value) => setData('academic_year_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tahun ajaran" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((academicYear) => (
                    <SelectItem key={academicYear.id} value={academicYear.id.toString()}>
                      {academicYear.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Kelas">
              <Select value={data.classroom_id.toString()} onValueChange={(value) => setData('classroom_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms
                    .filter((c) => (data.academic_year_id ? c.academic_year_id == Number(data.academic_year_id) : false))
                    .map((classroom) => (
                      <SelectItem key={classroom.id} value={classroom.id.toString()}>
                        {classroom.name}
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
                    .filter((c) => (data.classroom_id ? c.classroom_id == Number(data.classroom_id) : false))
                    .map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id.toString()}>
                        <p className="max-w-full break-all">{lesson.name}</p>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={applyFilter}>
            <Check /> Apply filter
          </Button>
          <Button variant={'outline'} onClick={resetFilter}>
            <X /> Reset filter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ExamFilterSheet;
