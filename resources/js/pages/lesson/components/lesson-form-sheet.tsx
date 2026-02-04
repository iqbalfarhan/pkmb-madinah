import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose, User } from '@/types';
import { Classroom } from '@/types/classroom';
import { Lesson } from '@/types/lesson';
import { Subject } from '@/types/subject';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  lesson?: Lesson;
  purpose: FormPurpose;
};

const LessonFormSheet: FC<Props> = ({ children, lesson, purpose }) => {
  const [open, setOpen] = useState(false);

  const {
    users = [],
    subjects = [],
    classrooms = [],
  } = usePage<{
    users: User[];
    subjects: Subject[];
    classrooms: Classroom[];
  }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    user_id: lesson?.user_id ?? '',
    subject_id: lesson?.subject_id ?? '',
    classroom_id: lesson?.classroom_id ?? classrooms[0]?.id ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('lesson.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Lesson created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('lesson.update', lesson?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Lesson updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data lesson</SheetTitle>
          <SheetDescription>Form untuk {purpose} data lesson</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {classrooms.length > 1 && (
              <FormControl label="Kelas">
                <Select value={data.classroom_id.toString()} onValueChange={(e) => setData('classroom_id', Number(e))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih guru" />
                  </SelectTrigger>
                  <SelectContent>
                    {classrooms.map((classroom) => (
                      <SelectItem key={classroom.id} value={classroom.id.toString()}>
                        {classroom.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            )}
            <FormControl label="Mata pelajaran">
              <Select value={data.subject_id.toString()} onValueChange={(e) => setData('subject_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih guru" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Pengajar">
              <Select value={data.user_id.toString()} onValueChange={(e) => setData('user_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih guru" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} lesson`} loading={processing} disabled={processing} />
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

export default LessonFormSheet;
