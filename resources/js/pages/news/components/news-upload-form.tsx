import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { em } from '@/lib/utils';
import { SharedData } from '@/types';
import { News } from '@/types/news';
import { useForm, usePage } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  news: News;
};

const NewsUploadForm: FC<Props> = ({ news, children }) => {
  const [open, setOpen] = useState(false);
  const { permissions } = usePage<SharedData>().props;

  const { setData, post, processing } = useForm({
    file: undefined as File | undefined,
  });

  if (!permissions?.canUpdate) return null;

  const handleSubmit = () => {
    post(route('news.upload-media', news.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil upload');
        setData('file', undefined);
        setOpen(false);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload file materi</DialogTitle>
          <DialogDescription>Pilih file untuk diupload</DialogDescription>
        </DialogHeader>
        <FormControl label="Pilih file news">
          <Input type="file" accept="image/*" onChange={(e) => setData('file', e.target.files?.[0])} />
        </FormControl>
        <DialogFooter>
          <SubmitButton onClick={handleSubmit} loading={processing} icon={Upload} label="Upload news" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewsUploadForm;
