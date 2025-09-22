import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import TagsInput from '@/components/tags-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Grade } from '@/types/grade';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  grade?: Grade;
  purpose: FormPurpose;
};

const GradeFormSheet: FC<Props> = ({ children, grade, purpose }) => {
  const [open, setOpen] = useState(false);
  const { defaultGroups } = usePage<{ defaultGroups: string[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    group: grade?.group ?? '',
    name: grade?.name ?? '',
    characters: grade?.characters ?? [],
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('grade.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Grade created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('grade.update', grade?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Grade updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data grade</SheetTitle>
          <SheetDescription>Form untuk {purpose} data grade</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Pilih group">
              <Select value={data.group} onValueChange={(e) => setData('group', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih group" />
                </SelectTrigger>
                <SelectContent>
                  {defaultGroups.map((group) => (
                    <SelectItem value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Nama grade">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl asDiv label="Pengembangan karakter" hint="Tulis karakter dan tekan enter">
              <TagsInput value={data.characters} onValueChange={(value) => setData('characters', value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} grade`} loading={processing} disabled={processing} />
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

export default GradeFormSheet;
