import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Score } from '@/types/score';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  scoreIds: Score['id'][];
};

const ScoreBulkEditSheet: FC<Props> = ({ children, scoreIds }) => {
  const { data, put } = useForm({
    score_ids: scoreIds,
  });

  const handleSubmit = () => {
    put(route('score.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Score updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah score</SheetTitle>
          <SheetDescription>Ubah data {data.score_ids.length} score</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan score
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

export default ScoreBulkEditSheet;
