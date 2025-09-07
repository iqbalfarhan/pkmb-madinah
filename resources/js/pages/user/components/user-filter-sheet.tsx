import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: { [key: string]: string };
};

const UserFilterSheet: FC<Props> = ({ children, query }) => {
  const [open, setOpen] = useState(false);
  const { roles = [] } = usePage<{ roles: string[] }>().props;

  const { data, setData, get } = useForm({
    role: query.role ?? '',
  });

  const applyFilter = () => {
    get(route('user.index'), {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onSuccess: () => {
        toast.success('Filter applied successfully');
        setOpen(false);
      },
    });
  };

  const resetFilter = () => {
    setData('role', '');
    router.get(
      route('user.index'),
      {
        role: '',
      },
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
      },
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter user</SheetTitle>
          <SheetDescription>Filter data user</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            method="get"
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilter();
            }}
          >
            <FormControl label="Role">
              <Select value={data.role} onValueChange={(e) => setData('role', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={applyFilter}>
            <Check /> Apply filter
          </Button>
          <Button variant={'outline'} onClick={resetFilter}>
            <X /> Reset filter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserFilterSheet;
