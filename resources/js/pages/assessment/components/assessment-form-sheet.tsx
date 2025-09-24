import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Assessment } from '@/types/assessment';
import { Grade } from '@/types/grade';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  assessment?: Assessment;
  purpose: FormPurpose;
};

const AssessmentFormSheet: FC<Props> = ({ children, assessment, purpose }) => {
  const [open, setOpen] = useState(false);

  const { groupLists = [], grades = [] } = usePage<{ groupLists: string[]; grades: Grade[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    group: assessment?.group ?? '',
    name: assessment?.name ?? '',
    grade_id: assessment?.grade_id ?? '',
    semester: assessment?.semester ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('assessment.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Assessment created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('assessment.update', assessment?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Assessment updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data assessment</SheetTitle>
          <SheetDescription>Form untuk {purpose} data assessment</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
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
            <FormControl label="Nama assessment">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
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
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} assessment`} loading={processing} disabled={processing} />
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

export default AssessmentFormSheet;
