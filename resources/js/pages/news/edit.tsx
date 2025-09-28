import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { copyMarkdownImage, em, handlePasteScreenshot } from '@/lib/utils';
import { Media } from '@/types';
import { News } from '@/types/news';
import { Link, router, useForm } from '@inertiajs/react';
import { Folder, Info, Trash2, Upload } from 'lucide-react';
import { FC, useEffect } from 'react';
import { toast } from 'sonner';
import NewsUploadForm from './components/news-upload-form';

type Props = {
  news: News;
};

const EditNews: FC<Props> = ({ news }) => {
  const { data, setData, put, processing } = useForm({
    title: news.title ?? '',
    content: news.content ?? '',
  });

  const handleUpdate = () => {
    put(route('news.update', news.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('News created successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  useEffect(() => {
    const cleanup = handlePasteScreenshot((file) => {
      router.post(
        route('news.upload-media', news.id),
        {
          file,
        },
        {
          preserveScroll: true,
          onSuccess: () => toast.success('upload completed'),
          onError: (e) => toast.error(em(e)),
        },
      );
    });

    return cleanup;
  }, [news.id]);

  const handleDeleteMedia = (m: Media) => {
    router.delete(route('document.destroy', m.id));
  };

  return (
    <AppLayout
      title="Edit News"
      description="Edit news content"
      actions={
        <>
          <BackButton />
          <Button asChild>
            <Link href={route('news.show', news.id)}>
              <Folder />
              Detail berita
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-6">
            <FormControl label="Judul berita">
              <Input value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </FormControl>
            <FormControl label="Konten berita" hint="Tulis dalam format markdown">
              <Textarea value={data.content} onChange={(e) => setData('content', e.target.value)} className="min-h-80" />
            </FormControl>
          </CardContent>
          <CardFooter>
            <SubmitButton onClick={handleUpdate} loading={processing} label="Simpan perubahan berita" />
          </CardFooter>
        </Card>
        <div className="space-y-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Upload news media</CardTitle>
              <CardDescription>Upload image file maximum size 2Mb</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-1.5">
                {(news.media ?? []).length > 0 && (
                  <>
                    {news.media.map((m) => (
                      <div className="group relative">
                        <Avatar className="size-full rounded-lg" onClick={() => copyMarkdownImage(m.name, m.original_url)}>
                          <AvatarImage src={m.preview_url} className="object-cover" />
                        </Avatar>
                        <Button
                          size={'icon'}
                          variant={'destructive'}
                          className="absolute right-1 bottom-1 hidden group-hover:flex"
                          onClick={() => handleDeleteMedia(m)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <NewsUploadForm news={news}>
                <Button>
                  <Upload /> Upload gambar
                </Button>
              </NewsUploadForm>
            </CardFooter>
          </Card>

          <Alert>
            <Info />
            <AlertTitle>Upload media</AlertTitle>
            <AlertDescription>Paste gambar ke halaman ini untuk upload article berita</AlertDescription>
          </Alert>

          <Alert>
            <Info />
            <AlertTitle>Menambahkan gambar ke content berita</AlertTitle>
            <AlertDescription>Klik gambar media, kemudian paste pada content berita</AlertDescription>
          </Alert>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditNews;
