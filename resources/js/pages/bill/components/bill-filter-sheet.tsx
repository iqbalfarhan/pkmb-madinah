import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Student } from '@/types/student';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: { [key: string]: string };
};

const BillFilterSheet: FC<Props> = ({ children, query }) => {
  const [open, setOpen] = useState(false);

  const { statusLists = [], students = [] } = usePage<{
    statusLists: string[];
    students: Student[];
  }>().props;

  const { data, setData, get } = useForm({
    student_id: query.student_id ?? '',
    status: query.status ?? '',
  });

  const applyFilter = () => {
    get(route('bill.index'), {
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
    setData('student_id', '');
    setData('status', '');
    router.get(
      route('bill.index'),
      {
        student_id: '',
        status: '',
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
          <SheetTitle>Filter bill</SheetTitle>
          <SheetDescription>Filter data bill</SheetDescription>
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
            <FormControl label="Nama siswa">
              <Select value={data.student_id} onValueChange={(value) => setData('student_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Staus pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Status pembayaran">
              <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Staus pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  {statusLists.map((sl) => (
                    <SelectItem key={sl} value={sl}>
                      {sl}
                    </SelectItem>
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

export default BillFilterSheet;
