import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import { PenilaianDoaHadist } from '@/types/report';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren & {
  penilaian: PenilaianDoaHadist;
  onSave?: (penilaian: PenilaianDoaHadist) => void;
};

const ReportPencapaianFormSheet: FC<Props> = ({ children, onSave, penilaian }) => {
  const [open, setOpen] = useState(false);
  const { perkembanganStatusList = [] } = usePage<{ perkembanganStatusList: string[] }>().props;
  const mobile = useIsMobile();
  const { data, setData } = useForm({
    judul: penilaian.judul ?? '',
    keterangan: penilaian.keterangan ?? '',
    pencapaian: penilaian.pencapaian ?? '',
  });

  const handleSave = () => {
    onSave?.(data);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={mobile ? 'bottom' : 'right'}>
        <SheetHeader>
          <SheetTitle>Form input pencapaian</SheetTitle>
          <SheetDescription>Isi dengan judul pencapaia, status dan keterangan</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4">
          <FormControl label="Nama pencapaian">
            <Input value={data.judul} onChange={(e) => setData('judul', e.target.value)} />
          </FormControl>
          <FormControl label="Nama pencapaian">
            <Select value={data.pencapaian.toString()} onValueChange={(value) => setData('pencapaian', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih pencapaian" />
              </SelectTrigger>
              <SelectContent>
                {perkembanganStatusList.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Keterangan">
            <Textarea value={data.keterangan} onChange={(e) => setData('keterangan', e.target.value)} />
          </FormControl>
        </div>
        <SheetFooter>
          <Button onClick={handleSave}>
            <Check />
            Simpan
          </Button>
          <SheetClose asChild>
            <Button variant={'secondary'}>
              <X />
              Batal
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ReportPencapaianFormSheet;
