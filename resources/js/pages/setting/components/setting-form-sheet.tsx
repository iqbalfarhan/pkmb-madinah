import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Setting } from '@/types/setting';
import { useForm } from '@inertiajs/react';
import { AlertCircle, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  setting?: Setting;
  purpose: FormPurpose;
};

const SettingFormSheet: FC<Props> = ({ children, setting, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset, processing } = useForm({
    key: setting?.key ?? '',
    value: setting?.value ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('setting.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Setting created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('setting.update', setting?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Setting updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data setting</SheetTitle>
          <SheetDescription>Form untuk {purpose} data setting</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Setting name">
              <Input type="text" placeholder="Name" value={data.key} onChange={(e) => setData('key', e.target.value)} disabled />
            </FormControl>
            <FormControl label="Setting name">
              <Input type="text" placeholder="Value" value={data.value} onChange={(e) => setData('value', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Alert>
            <AlertCircle />
            <AlertTitle>Informasi</AlertTitle>
            <AlertDescription>{setting?.hint}</AlertDescription>
          </Alert>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} setting`} loading={processing} disabled={processing} />
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

export default SettingFormSheet;
