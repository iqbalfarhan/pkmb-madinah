import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SharedData } from '@/types';
import { Academicyear } from '@/types/academicyear';
import { Classroom } from '@/types/classroom';
import { Student } from '@/types/student';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: { [key: string]: string };
};

const ReportFilterSheet: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const {
    reportTypes = [],
    students = [],
    classrooms = [],
    academicYears = [],
    activeAcademicYear,
  } = usePage<SharedData & { classrooms: Classroom[]; reportTypes: string[]; students: Student[]; academicYears: Academicyear[] }>().props;

  const { data, setData, get } = useForm({
    report_type: '' as string | undefined,
    classroom_id: '' as string | undefined,
    student_id: students.length === 1 ? students[0].id.toString() : ('' as string | undefined),
    academic_year_id: activeAcademicYear.id ?? ('' as string | undefined),
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
    setData('report_type', undefined);
    setData('classroom_id', undefined);
    setData('student_id', students.length === 1 ? students[0].id.toString() : undefined);
    setData('academic_year_id', activeAcademicYear.id);

    router.get(
      '',
      {
        report_type: '',
        student_id: '',
        classroom_id: '',
        academic_year_id: '',
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
          <SheetTitle>Filter report</SheetTitle>
          <SheetDescription>Filter data report</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            method="get"
            className="space-y-4 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilter();
            }}
          >
            <FormControl label="Pilih tahun akademik">
              <Select value={data.academic_year_id.toString()} onValueChange={(e) => setData('academic_year_id', Number(e))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih siswa" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Kelas">
              <Select value={data.classroom_id?.toString()} onValueChange={(e) => setData('classroom_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih siswa" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms
                    .filter((cl) => (data.academic_year_id ? Number(data.academic_year_id) === Number(cl.academic_year_id) : false))
                    .map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            {students.length > 1 && (
              <FormControl label="Pilih siswa">
                <Select value={data.student_id?.toString()} onValueChange={(e) => setData('student_id', e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih siswa" />
                  </SelectTrigger>
                  <SelectContent>
                    {students
                      .filter((student) => (data.classroom_id ? Number(data.classroom_id) === Number(student.classroom_id) : false))
                      .map((s) => (
                        <SelectItem key={s.id} value={s.id.toString()}>
                          {s.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
            )}
            <FormControl label="Jenis Report">
              <Select value={data.report_type} onValueChange={(value) => setData('report_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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

export default ReportFilterSheet;
