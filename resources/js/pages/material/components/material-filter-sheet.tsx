import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Classroom } from '@/types/classroom';
import { Lesson } from '@/types/lesson';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: { [key: string]: string };
};

const MaterialFilterSheet: FC<Props> = ({ children, query }) => {
  const [open, setOpen] = useState(false);

  const { lessons = [], classrooms = [] } = usePage<{
    lessons: Lesson[];
    classrooms: Classroom[];
  }>().props;

  const { data, setData, get } = useForm({
    classroom_id: query?.classroom_id ?? '',
    lesson_id: query?.lesson_id ?? '',
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
    router.get(
      '',
      {
        classroom_id: '',
        lesson_id: '',
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
          <SheetTitle>Filter material</SheetTitle>
          <SheetDescription>Filter data material</SheetDescription>
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
            {classrooms.length > 1 && (
              <FormControl label="Kelas">
                <Select value={data.classroom_id.toString()} onValueChange={(value) => setData('classroom_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {classrooms.map((kelas) => (
                      <SelectItem key={kelas.id} value={kelas.id.toString()}>
                        {kelas.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            )}
            {lessons.length > 1 && (
              <FormControl label="Pelajaran">
                <Select value={data.lesson_id.toString()} onValueChange={(value) => setData('lesson_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessons
                      .filter((lesson) => lesson.classroom_id.toString() === data.classroom_id.toString())
                      .map((lesson) => (
                        <SelectItem key={lesson.id} value={lesson.id.toString()}>
                          {lesson.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
            )}
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

export default MaterialFilterSheet;
