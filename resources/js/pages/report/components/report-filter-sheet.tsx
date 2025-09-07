import DDump from '@/components/d-dump';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SharedData } from '@/types';
import { Academicyear } from '@/types/academicyear';
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
    academicYears = [],
    activeAcademicYear,
  } = usePage<SharedData & { reportTypes: string[]; students: Student[]; academicYears: Academicyear[] }>().props;

  const { data, setData, get } = useForm({
    report_type: '',
    student_id: students.length === 1 ? students[0].id.toString() : '',
    academic_year_id: activeAcademicYear.id ?? '',
  });

  const applyFilter = () => {
    get(route(''), {
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
    setData('report_type', '');
    setData('student_id', students.length === 1 ? students[0].id.toString() : '');
    setData('academic_year_id', activeAcademicYear.id);
    router.get(
      route(''),
      {
        report_type: '',
        student_id: '',
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
          <DDump content={data} />
          <form
            method="get"
            className="space-y-6 px-4"
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
            {students.length > 1 && (
              <FormControl label="Pilih siswa">
                <Select value={data.student_id.toString()} onValueChange={(e) => setData('student_id', e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih siswa" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((s) => (
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
