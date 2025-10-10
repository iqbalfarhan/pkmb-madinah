import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Media, SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Download, ExternalLink, Trash2 } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';

type Props = {
  media: Media; // tambahin props lo di sini
};

const SubjectBankItem: FC<Props> = ({ media }) => {
  const { permissions } = usePage<SharedData>().props;

  const handleDelete = () => {
    router.delete(route('document.destroy', media.id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Delete article success'),
    });
  };

  return (
    <Card>
      <CardHeader className="flex-1">
        <CardTitle className="leading-normal">{media.file_name}</CardTitle>
        <CardDescription className="line-clamp-1">{media.mime_type}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex">
          {permissions?.canShow && (
            <>
              <Button variant={'ghost'} asChild>
                <a href={route('document.show', media.id)} target="">
                  <Download />
                </a>
              </Button>
              <Button variant={'ghost'} asChild>
                <a href={media.original_url} target="">
                  <ExternalLink />
                </a>
              </Button>
            </>
          )}
        </div>
        {permissions?.canDelete && (
          <Button variant={'ghost'} onClick={handleDelete}>
            <Trash2 />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubjectBankItem;
