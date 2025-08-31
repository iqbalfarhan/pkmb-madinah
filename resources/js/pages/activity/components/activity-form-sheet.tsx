import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Academicyear } from '@/types/academicyear';
import { Activity } from '@/types/activity';
import { Extracurricular } from '@/types/extracurricular';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  activity?: Activity;
  purpose: FormPurpose;
};

const ActivityFormSheet: FC<Props> = ({ children, activity, purpose }) => {
  const [open, setOpen] = useState(false);

  const {
    extracurriculars = [],
    students = [],
    academicYears = [],
  } = usePage<{
    extracurriculars: Extracurricular[];
    students: Student[];
    academicYears: Academicyear[];
  }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    student_id: activity?.student_id ?? '',
    extracurricular_id: activity?.extracurricular_id ?? '',
    academic_year_id: activity?.academic_year_id ?? '',
    description: activity?.description ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('activity.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Activity created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('activity.update', activity?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Activity updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data activity</SheetTitle>
          <SheetDescription>Form untuk {purpose} data activity</SheetDescription>
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
                  {students.map((student) => (
                    <SelectItem value={student.id.toString()}>{student.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Pilih ekskul">
              <Select value={data.extracurricular_id.toString()} onValueChange={(e) => setData('extracurricular_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih ekskul" />
                </SelectTrigger>
                <SelectContent>
                  {extracurriculars.map((extracurricular) => (
                    <SelectItem value={extracurricular.id.toString()}>{extracurricular.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Pilih tahunajaran">
              <Select value={data.academic_year_id.toString()} onValueChange={(e) => setData('academic_year_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih ekskul" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((academicYear) => (
                    <SelectItem value={academicYear.id.toString()}>{academicYear.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Kegiatan">
              <Textarea placeholder="Tulis kegiatan siswa" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} activity`} loading={processing} disabled={processing} />
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

export default ActivityFormSheet;
