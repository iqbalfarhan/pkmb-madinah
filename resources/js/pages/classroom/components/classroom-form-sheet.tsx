import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose, User } from '@/types';
import { Classroom } from '@/types/classroom';
import { Grade } from '@/types/grade';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  classroom?: Classroom;
  purpose: FormPurpose;
};

const ClassroomFormSheet: FC<Props> = ({ children, classroom, purpose }) => {
  const [open, setOpen] = useState(false);

  const { users, grades } = usePage<{
    users: User[];
    grades: Grade[];
  }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    name: classroom?.name ?? '',
    user_id: classroom?.user_id ?? '',
    grade_id: classroom?.grade_id ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('classroom.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Classroom created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('classroom.update', classroom?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Classroom updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data classroom</SheetTitle>
          <SheetDescription>Form untuk {purpose} data classroom</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama classroom">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Walikelas">
              <Select value={data.user_id.toString()} onValueChange={(e) => setData('user_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Walikelas" />
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
            <FormControl label="Tingkat kelas">
              <Select value={data.grade_id.toString()} onValueChange={(e) => setData('grade_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Walikelas" />
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
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} classroom`} loading={processing} disabled={processing} />
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

export default ClassroomFormSheet;
