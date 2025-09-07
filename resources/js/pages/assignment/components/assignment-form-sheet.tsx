import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Assignment } from '@/types/assignment';
import { Lesson } from '@/types/lesson';
import { useForm, usePage } from '@inertiajs/react';
import { AlertCircle, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  assignment?: Assignment;
  purpose: FormPurpose;
};

const AssignmentFormSheet: FC<Props> = ({ children, assignment, purpose }) => {
  const [open, setOpen] = useState(false);

  const { lessons = [] } = usePage<{ lessons: Lesson[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    lesson_id: assignment?.lesson_id ?? lessons[0].id ?? '',
    name: assignment?.name ?? '',
    description: assignment?.description ?? '',
    rate: assignment?.rate ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('assignment.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Assignment created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('assignment.update', assignment?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Assignment updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data assignment</SheetTitle>
          <SheetDescription>Form untuk {purpose} data assignment</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {lessons.length > 1 && (
              <FormControl label="Pelajaran">
                <Select value={data.lesson_id.toString()} onValueChange={(value) => setData('lesson_id', Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessons.map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id.toString()}>
                        {lesson.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            )}
            <FormControl label="Judul tugas">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Deskripsi">
              <Textarea placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
            <FormControl label="Bobot nilai (dalam persen)">
              <Input type="number" step={0.01} placeholder="Rate" value={data.rate} onChange={(e) => setData('rate', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Alert>
            <AlertCircle />
            <AlertTitle>Bobot tugas</AlertTitle>
            <AlertDescription>
              Bobot tugas akan ditotalkan. Nilai yang diberikan ke siswa akan kalikan dengan bobot tugas sehingga dapat mencapai nilai 100%
            </AlertDescription>
          </Alert>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} assignment`} loading={processing} disabled={processing} />
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

export default AssignmentFormSheet;
