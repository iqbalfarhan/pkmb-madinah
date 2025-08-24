import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Ppdb } from '@/types/ppdb';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  ppdbIds: Ppdb['id'][];
};

const PpdbBulkEditSheet: FC<Props> = ({ children, ppdbIds }) => {
  const { data, put } = useForm({
    ppdb_ids: ppdbIds,
  });

  const handleSubmit = () => {
    put(route('ppdb.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Ppdb updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah ppdb</SheetTitle>
          <SheetDescription>Ubah data {data.ppdb_ids.length} ppdb</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan ppdb
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

export default PpdbBulkEditSheet;
