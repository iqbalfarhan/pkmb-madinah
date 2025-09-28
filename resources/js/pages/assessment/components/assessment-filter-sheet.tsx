import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Grade } from '@/types/grade';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: { [key: string]: string };
};

const AssessmentFilterSheet: FC<Props> = ({ children, query }) => {
  const [open, setOpen] = useState(false);

  const { groupLists = [], grades = [] } = usePage<{ groupLists: string[]; grades: Grade[] }>().props;

  const { data, setData, get } = useForm({
    group: query.group ?? 'doa harian',
    grade_id: query.grade_id ?? '',
    semester: query.semester ?? '',
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
    setData('group', '');
    setData('grade_id', '');
    setData('semester', '');
    router.get(
      '',
      {
        group: '',
        grade_id: '',
        semester: '',
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
          <SheetTitle>Filter assessment</SheetTitle>
          <SheetDescription>Filter data assessment</SheetDescription>
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
            <FormControl label="Group penilaian">
              <Select value={data.group} onValueChange={(value) => setData('group', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih group'} />
                </SelectTrigger>
                <SelectContent>
                  {groupLists.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Tingkat kelas">
              <Select value={data.grade_id.toString()} onValueChange={(value) => setData('grade_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih tingkat kelas'} />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade.id} value={grade.id.toString()}>
                      {grade.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Semester">
              <Select value={data.semester} onValueChange={(value) => setData('semester', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih semester'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'ganjil'}>Ganjil</SelectItem>
                  <SelectItem value={'genap'}>Genap</SelectItem>
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

export default AssessmentFilterSheet;
