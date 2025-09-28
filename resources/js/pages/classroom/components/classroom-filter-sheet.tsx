import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SharedData } from '@/types';
import { Academicyear } from '@/types/academicyear';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: { [key: string]: string };
};

const ClassroomFilterSheet: FC<Props> = ({ children, query }) => {
  const [open, setOpen] = useState(false);

  const { activeAcademicYear, academicyears = [] } = usePage<SharedData & { academicyears: Academicyear[] }>().props;

  const { data, setData, get } = useForm({
    academic_year_id: query.academic_year_id ?? activeAcademicYear.id ?? '',
  });

  const applyFilter = () => {
    get(route('classroom.index'), {
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
    setData('academic_year_id', '');
    router.get(
      route('classroom.index'),
      {
        academic_year_id: '',
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
          <SheetTitle>Filter classroom</SheetTitle>
          <SheetDescription>Filter data classroom</SheetDescription>
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
            <FormControl label="Nama Classroom">
              <Select value={data.academic_year_id.toString()} onValueChange={(value) => setData('academic_year_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tahun ajaran" />
                </SelectTrigger>
                <SelectContent>
                  {academicyears.map((academicyear) => (
                    <SelectItem key={academicyear.id} value={academicyear.id.toString()}>
                      {academicyear.label}
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

export default ClassroomFilterSheet;
