import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose, SharedData } from '@/types';
import { Academicyear } from '@/types/academicyear';
import { Classroom } from '@/types/classroom';
import { Report } from '@/types/report';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  report?: Report;
  purpose: FormPurpose;
};

const ReportFormSheet: FC<Props> = ({ children, report, purpose }) => {
  const [open, setOpen] = useState(false);

  const {
    students = [],
    academicYears = [],
    classrooms = [],
    reportTypes = [],
    activeAcademicYear,
  } = usePage<
    SharedData & {
      students: Student[];
      academicYears: Academicyear[];
      classrooms: Classroom[];
      reportTypes: string[];
    }
  >().props;

  const { data, setData, put, post, reset, processing } = useForm({
    student_id: report?.student_id ?? '',
    academic_year_id: report?.academic_year_id ?? activeAcademicYear?.id ?? '',
    classroom_id: report?.classroom_id ?? '',
    report_type: report?.report_type ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('report.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Report created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('report.update', report?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Report updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data report</SheetTitle>
          <SheetDescription>Form untuk {purpose} data report</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
            <FormControl label="Tahun ajaran">
              <Select value={data.academic_year_id.toString()} onValueChange={(e) => setData('academic_year_id', Number(e))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tahun ajaran" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((ay) => (
                    <SelectItem key={ay.id} value={ay.id.toString()}>
                      {ay.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Kelas">
              <Select value={data.classroom_id.toString()} onValueChange={(e) => setData('classroom_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Tipe laporan">
              <Select value={data.report_type} onValueChange={(e) => setData('report_type', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe laporan" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((rt) => (
                    <SelectItem key={rt} value={rt}>
                      {rt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} report`} loading={processing} disabled={processing} />
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

export default ReportFormSheet;
