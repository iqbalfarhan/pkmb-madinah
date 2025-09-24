import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Assessment } from '@/types/assessment';
import { Grade } from '@/types/grade';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  assessmentIds: Assessment['id'][];
  onSuccess?: () => void;
};

const AssessmentBulkEditSheet: FC<Props> = ({ children, assessmentIds, onSuccess }) => {
  const { data, setData, put } = useForm({
    assessment_ids: [] as number[],
    grade_id: '',
    // group: '',
    semester: '',
  });

  useEffect(() => {
    setData('assessment_ids', assessmentIds);
  }, [assessmentIds, setData]);

  const { grades = [] } = usePage<{ groupLists: string[]; grades: Grade[] }>().props;

  const handleSubmit = () => {
    put(route('assessment.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Assessment updated successfully');
        onSuccess?.();
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah assessment</SheetTitle>
          <SheetDescription>Ubah data {data.assessment_ids.length} assessment</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-4">
          {/* <FormControl label="Group penilaian">
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
          </FormControl> */}
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
        </div>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan assessment
          </Button>
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

export default AssessmentBulkEditSheet;
