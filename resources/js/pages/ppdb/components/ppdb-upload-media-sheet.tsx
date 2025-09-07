import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Student } from '@/types/student';
import { useForm } from '@inertiajs/react';
import { Info, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  student: Student;
};

const PpdbUploadMediaSheet: FC<Props> = ({ student, children }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, post, processing } = useForm({
    collection_name: '',
    file: undefined as File | undefined,
  });

  const handleUploadMedia = () => {
    post(route('student.upload-media', student.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Media uploaded successfully');
        setData('file', undefined);
        setOpen(false);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Media</SheetTitle>
          <SheetDescription>Upload media to student</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleUploadMedia();
            }}
          >
            <FormControl label="Pilih jenis file">
              <Select value={data.collection_name} onValueChange={(val) => setData('collection_name', val)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis file" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kartu keluarga">Kartu Keluarga</SelectItem>
                  <SelectItem value="akta kelahiran">Akta Kelahiran</SelectItem>
                  <SelectItem value="photo siswa">Photo siswa</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Pilih file">
              <Input type="file" onChange={(e) => setData('file', e.target.files?.[0])} accept="image/*" />
              {data.file && <img src={URL.createObjectURL(data.file)} />}
            </FormControl>

            <div className="grid grid-cols-3 gap-1">
              {student.media?.map((media) => (
                <img key={media.id} src={media.preview_url} alt={media.name} className="aspect-square w-full object-cover" />
              ))}
            </div>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Alert>
            <Info />
            <AlertTitle>Ketentuan upload file</AlertTitle>
            <AlertDescription>
              File yang dapat diupload adalah file dengan ekstensi PDF dan file gambar (JPG, PNG, JPEG) dengan ukurang tidak lebih dari 2Mb.
            </AlertDescription>
          </Alert>
          <SubmitButton onClick={handleUploadMedia} label={'Upload media'} loading={processing} disabled={processing} />
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

export default PpdbUploadMediaSheet;
