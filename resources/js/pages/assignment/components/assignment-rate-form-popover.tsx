import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PopoverContent } from '@/components/ui/popover';
import { em } from '@/lib/utils';
import { Assignment } from '@/types/assignment';
import { useForm } from '@inertiajs/react';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  assignment: Assignment;
};

const AssignmentRateFormPopover: FC<Props> = ({ children, assignment }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put } = useForm({
    rate: assignment.rate,
  });

  const handleSubmit = () => {
    put(route('assignment.update', assignment.id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Updated successfully'),
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
            {data.rate}%
          </Button>
        </PopoverTrigger>
      )}
      <PopoverContent className="w-fit">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Input className="w-20 text-center" value={data.rate} onChange={(e) => setData('rate', Number(e.target.value))} />
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default AssignmentRateFormPopover;
