import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Classroom } from '@/types/classroom';
import { Lesson } from '@/types/lesson';
import { Material } from '@/types/material';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  material?: Material;
  purpose: FormPurpose;
};

const MaterialFormSheet: FC<Props> = ({ children, material, purpose }) => {
  const [open, setOpen] = useState(false);

  const {
    lesson,
    lessons = [],
    classrooms = [],
  } = usePage<{
    lesson?: Lesson;
    lessons: Lesson[];
    classrooms: Classroom[];
  }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    classroom_id: material?.lesson?.classroom_id ?? classrooms[0]?.id ?? '',
    lesson_id: material?.lesson_id ?? lesson?.id ?? lessons[0]?.id ?? '',
    title: material?.title ?? '',
    description: material?.description ?? '',
    url: material?.url ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('material.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Material created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('material.update', material?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Material updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data material</SheetTitle>
          <SheetDescription>Form untuk {purpose} data material</SheetDescription>
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
                <Select value={data.classroom_id.toString()} onValueChange={(value) => setData('classroom_id', Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {classrooms.map((kelas) => (
                      <SelectItem key={kelas.id} value={kelas.id.toString()}>
                        {kelas.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            )}
            {lessons.length > 1 && (
              <FormControl label="Pelajaran">
                <Select value={data.lesson_id.toString()} onValueChange={(value) => setData('lesson_id', Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessons
                      .filter((lesson) => lesson.classroom_id.toString() === data.classroom_id.toString())
                      .map((lesson) => (
                        <SelectItem key={lesson.id} value={lesson.id.toString()}>
                          {lesson.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
            )}
            <FormControl label="Judul material">
              <Input type="text" placeholder="Name" value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </FormControl>
            <FormControl label="Deskripsi">
              <Textarea placeholder="Deskripsi" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
            <FormControl label="URL google slide">
              <Input type="url" placeholder="url" value={data.url} onChange={(e) => setData('url', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} material`} loading={processing} disabled={processing} />
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

export default MaterialFormSheet;
