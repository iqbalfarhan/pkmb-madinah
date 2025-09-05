import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { surahList } from '@/lib/enums';
import { capitalizeWords, groupBy } from '@/lib/utils';
import { FormPurpose, Surah } from '@/types';
import { PenilaianTahfidz } from '@/types/report';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren & {
  data: PenilaianTahfidz;
  onSubmit: (data: PenilaianTahfidz) => void;
  purpose: FormPurpose;
};

const ReportTahfidzFormSheet: FC<Props> = ({ children, data, onSubmit, purpose }) => {
  const [open, setOpen] = useState(false);
  const {
    data: formData,
    setData,
    processing,
  } = useForm({
    juz: data.juz ?? '',
    surah: data.surah ?? '',
    pencapaian: data.pencapaian ?? '',
    keterangan: data.keterangan ?? '',
  });

  const handleSubmit = () => {
    onSubmit(formData);
    setOpen(false);
  };

  const filtered = surahList.filter((surah) => [28, 29, 30].includes(surah.juz));
  const groupedSurahList = groupBy(filtered, 'juz');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data report</SheetTitle>
          <SheetDescription>Form untuk {purpose} data report</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Pilih surah">
              <Select
                value={formData.surah}
                onValueChange={(value) => {
                  const selected = filtered.find((s) => s.surah === value);
                  setData('surah', value);
                  setData('juz', selected?.juz.toString() ?? '');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih nama surah" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groupedSurahList).map(([juz, surahs]) => (
                    <SelectGroup>
                      <SelectLabel>Juz {juz}</SelectLabel>
                      {surahs.map((s: Surah) => (
                        <SelectItem key={s.surah} value={s.surah} className="pl-4">
                          {s.surah}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Pencapaian">
              <Select value={formData.pencapaian} onValueChange={(value) => setData('pencapaian', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pencapaian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="belum berkembang">Belum Berkembang</SelectItem>
                  <SelectItem value="berkembang">Berkembang</SelectItem>
                  <SelectItem value="sangat berkembang">Sangat Berkembang</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Keterangan ayat">
              <Textarea value={formData.keterangan} onChange={(e) => setData('keterangan', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} report`} loading={processing} disabled={processing} />
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

export default ReportTahfidzFormSheet;
