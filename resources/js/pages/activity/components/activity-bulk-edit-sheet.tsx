import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Activity } from '@/types/activity';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  activityIds: Activity['id'][];
};

const ActivityBulkEditSheet: FC<Props> = ({ children, activityIds }) => {
  const { data, put } = useForm({
    activity_ids: activityIds,
  });

  const handleSubmit = () => {
    put(route('activity.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Activity updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah activity</SheetTitle>
          <SheetDescription>Ubah data {data.activity_ids.length} activity</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan activity
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

export default ActivityBulkEditSheet;
