import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SharedData } from '@/types';
import { Academicyear } from '@/types/academicyear';
import { Extracurricular } from '@/types/extracurricular';
import { Student } from '@/types/student';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: { [key: string]: string };
};

const ActivityFilterSheet: FC<Props> = ({ children, query }) => {
  const [open, setOpen] = useState(false);

  const {
    activeAcademicYear,
    academicYears = [],
    extracurriculars = [],
    students = [],
  } = usePage<SharedData & { academicYears: Academicyear[]; extracurriculars: Extracurricular[]; students: Student[] }>().props;

  const { data, setData, get } = useForm({
    academic_year_id: query.academic_year_id ?? activeAcademicYear?.id ?? '',
    extracurricular_id: query.extracurricular_id ?? '',
    student_id: query.student_id ?? '',
  });

  const applyFilter = () => {
    get(route('activity.index'), {
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
    setData('academic_year_id', '');
    setData('extracurricular_id', '');
    setData('student_id', '');

    router.get(
      route('activity.index'),
      {},
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
          <SheetTitle>Filter activity</SheetTitle>
          <SheetDescription>Filter data activity</SheetDescription>
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
                  <SelectValue placeholder="Pilih tahun ajaran" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((academicyear) => (
                    <SelectItem key={academicyear.id} value={academicyear.id.toString()}>
                      {academicyear.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Nama Ekstrakurikuler">
              <Select value={data.extracurricular_id.toString()} onValueChange={(value) => setData('extracurricular_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Ekstrakulikuler" />
                </SelectTrigger>
                <SelectContent>
                  {extracurriculars.map((exkul) => (
                    <SelectItem key={exkul.id} value={exkul.id.toString()}>
                      {exkul.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Nama Peserta didik">
              <Select value={data.student_id.toString()} onValueChange={(value) => setData('student_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Ekstrakulikuler" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
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

export default ActivityFilterSheet;
