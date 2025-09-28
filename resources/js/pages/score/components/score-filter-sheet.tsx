import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Assignment } from '@/types/assignment';
import { Classroom } from '@/types/classroom';
import { Lesson } from '@/types/lesson';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: { [key: string]: string };
};

const ScoreFilterSheet: FC<Props> = ({ children, query }) => {
  const [open, setOpen] = useState(false);

  const {
    classrooms = [],
    lessons = [],
    assignments = [],
  } = usePage<{ classrooms: Classroom[]; lessons: Lesson[]; assignments: Assignment[] }>().props;

  const { data, setData, get } = useForm({
    classroom_id: query.classroom_id ?? '',
    lesson_id: query.lesson_id ?? '',
    assignment_id: query.assignment_id ?? '',
  });

  const applyFilter = () => {
    get('', {
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
    setData('classroom_id', '');
    setData('lesson_id', '');
    setData('assignment_id', '');
    router.get(
      '',
      {
        classroom_id: undefined,
        lesson_id: undefined,
        assignment_id: undefined,
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
          <SheetTitle>Filter score</SheetTitle>
          <SheetDescription>Filter data score</SheetDescription>
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
            <FormControl label="Pilih kelas">
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
            <FormControl label="Pilih pelajaran">
              <Select value={data.lesson_id.toString()} onValueChange={(value) => setData('lesson_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {lessons
                    .filter((lesson) => (data.classroom_id ? data.classroom_id.toString() === lesson.classroom_id.toString() : true))
                    .map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id.toString()}>
                        {lesson.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Pilih tugas">
              <Select value={data.assignment_id.toString()} onValueChange={(value) => setData('assignment_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tugas" />
                </SelectTrigger>
                <SelectContent>
                  {assignments
                    .filter((assignment) => (data.lesson_id ? data.lesson_id.toString() === assignment.lesson_id.toString() : true))
                    .map((assignment) => (
                      <SelectItem key={assignment.id} value={assignment.id.toString()}>
                        {assignment.name}
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

export default ScoreFilterSheet;
