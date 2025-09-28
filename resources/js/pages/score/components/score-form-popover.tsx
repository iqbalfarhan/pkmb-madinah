import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { SharedData } from '@/types';
import { Score } from '@/types/score';
import { router, useForm, usePage } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  score?: Score;
  options?: {
    student_id: number;
    lesson_id: number;
    assignment_id: number;
  };
};

const ScoreFormPopup: FC<Props> = ({ children, score, options }) => {
  const [open, setOpen] = useState(false);

  const { permissions } = usePage<SharedData>().props;

  const { data, setData, post, put } = useForm({
    student_id: options?.student_id,
    lesson_id: options?.lesson_id,
    assignment_id: options?.assignment_id,
    score: score?.score ?? '-',
    remark: score?.remark ?? '',
  });

  const handleSubmit = () => {
    if (score) {
      put(route('score.update', score.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Score updated');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      post(route('score.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Score created');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  const handleDelete = () => {
    router.delete(route('score.destroy', score?.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('berhasil dihapus');
        setData('score', '-');
        setOpen(false);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {children ? (
        <PopoverTrigger asChild>{children}</PopoverTrigger>
      ) : (
        <PopoverTrigger asChild>
          <Button variant={'ghost'} size={'icon'}>
            {data.score}
          </Button>
        </PopoverTrigger>
      )}
      {permissions?.canUpdate && (
        <PopoverContent>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nilai siswa">
              <Input value={data.score} onChange={(e) => setData('score', e.target.value)} />
            </FormControl>
            <FormControl label="Komentar guru">
              <Textarea placeholder="tulis komentar guru disini" value={data.remark} onChange={(e) => setData('remark', e.target.value)} />
            </FormControl>

            <div className="flex w-full justify-between">
              <SubmitButton />
              {score && (
                <Button type="button" size={'icon'} variant={'ghost'} onClick={handleDelete}>
                  <Trash2 />
                </Button>
              )}
            </div>
          </form>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default ScoreFormPopup;
