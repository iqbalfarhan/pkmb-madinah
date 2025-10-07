import DatePicker from '@/components/date-picker';
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
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  student?: Student;
  purpose: FormPurpose;
};

const StudentFormSheet: FC<Props> = ({ children, student, purpose }) => {
  const [open, setOpen] = useState(false);
  const [showGrades, setShowGrades] = useState(false);

  const { classrooms = [], users = [], grades = [] } = usePage<{ classrooms: Classroom[]; users: User[]; grades: Grade[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    nisn: student?.nisn ?? '',
    nis: student?.nis ?? '',
    name: student?.name ?? '',
    user_id: student?.user_id ?? '',
    grade_id: student?.grade_id ?? '',
    gender: student?.gender ? '1' : '0',
    pob: student?.pob ?? '',
    dob: student?.dob ?? '',
    classroom_id: student?.classroom_id ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('student.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Student created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('student.update', student?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Student updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  console.table(student);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data student</SheetTitle>
          <SheetDescription>Form untuk {purpose} data student</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-4 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama student">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <div className="grid grid-cols-2 gap-4">
              <FormControl label="NISN">
                <Input type="text" placeholder="NISN" value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} />
              </FormControl>
              <FormControl label="NIS">
                <Input type="text" placeholder="NIS" value={data.nis} onChange={(e) => setData('nis', e.target.value)} />
              </FormControl>
            </div>
            <FormControl label="Jenis kelamin">
              <Select value={data.gender.toString()} onValueChange={(e) => setData('gender', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'1'}>Laki-laki</SelectItem>
                  <SelectItem value={'0'}>Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <div className="grid grid-cols-2 gap-4">
              <FormControl label="Tempat lahir">
                <Input type="text" placeholder="Name" value={data.pob} onChange={(e) => setData('pob', e.target.value)} />
              </FormControl>
              <FormControl label="Tempat lahir">
                <DatePicker
                  value={data.dob ? dayjs(data.dob).toDate() : undefined}
                  onValueChange={(e) => setData('dob', dayjs(e).format('YYYY-MM-DD'))}
                />
              </FormControl>
            </div>
            {showGrades && (
              <FormControl label="Tingkat kelas">
                <Select value={data.grade_id.toString()} onValueChange={(value) => setData('grade_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tingkat siswa" />
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
            )}
            <FormControl
              asDiv
              label="Pilih kelas"
              action={
                <>
                  <span className="cursor-pointer text-xs" onClick={() => setShowGrades(!showGrades)}>
                    Edit tingkat siswa
                  </span>
                </>
              }
            >
              <Select value={data.classroom_id.toString()} onValueChange={(e) => setData('classroom_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms
                    .filter((classroom) => (data?.grade_id ? classroom.grade_id.toString() === data?.grade_id.toString() : true))
                    .map((classroom) => (
                      <SelectItem value={classroom.id.toString()}>{classroom.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Akun orangtua">
              <Select value={data.user_id.toString()} onValueChange={(e) => setData('user_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem value={user.id.toString()}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} student`} loading={processing} disabled={processing} />
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

export default StudentFormSheet;
