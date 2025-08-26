import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose, Media } from '@/types';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  media?: Media;
  purpose: FormPurpose;
};

const MediaFormSheet: FC<Props> = ({ children, media, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset, processing } = useForm({
    name: media?.name ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('media.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Media created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('media.update', media?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Media updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data media</SheetTitle>
          <SheetDescription>Form untuk {purpose} data media</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama media">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} media`} loading={processing} disabled={processing} />
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

export default MediaFormSheet;
