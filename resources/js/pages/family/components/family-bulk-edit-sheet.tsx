import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Family } from '@/types/family';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  familyIds: Family['id'][];
};

const FamilyBulkEditSheet: FC<Props> = ({ children, familyIds }) => {
  const { data, put } = useForm({
    family_ids: familyIds,
  });

  const handleSubmit = () => {
    put(route('family.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Family updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah family</SheetTitle>
          <SheetDescription>Ubah data {data.family_ids.length} family</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan family
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

export default FamilyBulkEditSheet;
