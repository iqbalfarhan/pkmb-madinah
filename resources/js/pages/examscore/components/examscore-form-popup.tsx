import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { Examscore } from '@/types/examscore';
import { router, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  examscore?: Examscore;
  options?: {
    student_id: number;
    lesson_id: number;
    exam_id: number;
  };
};

const ExamscoreFormPopup: FC<Props> = ({ children, examscore, options }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, post, put } = useForm({
    student_id: options?.student_id,
    lesson_id: options?.lesson_id,
    exam_id: options?.exam_id,
    score: examscore?.score ?? '-',
    remark: examscore?.remark ?? '',
  });

  const handleSubmit = () => {
    if (examscore) {
      put(route('examscore.update', examscore.id), {
        onSuccess: () => {
          toast.success('Examscore updated');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      post(route('examscore.store'), {
        onSuccess: () => {
          toast.success('Examscore created');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  const handleDelete = () => {
    router.delete(route('examscore.destroy', examscore?.id), {
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
        <PopoverTrigger>
          <Button variant={'ghost'} size={'icon'}>
            {data.score}
          </Button>
        </PopoverTrigger>
      )}
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
            {examscore && (
              <Button type="button" size={'icon'} variant={'ghost'} onClick={handleDelete}>
                <Trash2 />
              </Button>
            )}
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ExamscoreFormPopup;
