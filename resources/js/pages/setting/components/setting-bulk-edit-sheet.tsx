import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Setting } from '@/types/setting';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  settingIds: Setting['id'][];
};

const SettingBulkEditSheet: FC<Props> = ({ children, settingIds }) => {
  const { data, put } = useForm({
    setting_ids: settingIds,
  });

  const handleSubmit = () => {
    put(route('setting.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Setting updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah setting</SheetTitle>
          <SheetDescription>Ubah data {data.setting_ids.length} setting</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan setting
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

export default SettingBulkEditSheet;
