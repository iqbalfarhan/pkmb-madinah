import FormControl from '@/components/form-control';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { capitalizeWords } from '@/lib/utils';
import MediaDeleteDialog from '@/pages/media/components/media-delete-dialog';
import { Media, SharedData } from '@/types';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';
import { AlertCircle, Check, Trash2, UploadCloud } from 'lucide-react';
import { FC } from 'react';
import PpdbUploadMediaSheet from '../components/ppdb-upload-media-sheet';
import PpdbFormWrapper from '../layouts/ppdb-form-wrapper';

type Props = {
  onSuccess: () => void;
};

const PpdbDocumentForm: FC<Props> = ({ onSuccess }) => {
  const { media = [], student, permissions } = usePage<SharedData & { media: Media[]; student: Student }>().props;

  const requiredDocs = ['akta kelahiran', 'kartu keluarga', 'photo siswa'];
  const showAlert = !requiredDocs.every((doc) => student.media?.some((m) => m.collection_name === doc));

  const mediaData = [
    { collectionName: 'kartu keluarga', mediaFile: media.find((m) => m.collection_name === 'kartu keluarga') },
    { collectionName: 'akta kelahiran', mediaFile: media.find((m) => m.collection_name === 'akta kelahiran') },
    { collectionName: 'photo siswa', mediaFile: media.find((m) => m.collection_name === 'photo siswa') },
  ];

  return (
    <PpdbFormWrapper
      title="Dokumen pendukung"
      description="Dokumen yang harus diupload: Kartu keluarga, Akta kelahiran siswa"
      info={
        <>
          {showAlert && (
            <Alert variant={'destructive'}>
              <AlertCircle />
              <AlertTitle>Dokumen belum lengkap</AlertTitle>
              <AlertDescription>Dokumen yang harus diupload: Kartu keluarga, Akta kelahiran dam photo siswa.</AlertDescription>
            </Alert>
          )}
        </>
      }
    >
      <Card>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {['kartu keluarga', 'akta kelahiran', 'photo siswa'].map((item) => {
              const mediaFile = mediaData.find((i) => i.collectionName === item)?.mediaFile;

              return (
                <FormControl asDiv label={capitalizeWords('Upload ' + item)} key={item}>
                  {mediaFile ? (
                    <div className="group relative w-full">
                      <img src={mediaFile.preview_url} className="aspect-video w-full rounded-lg object-cover" />
                      <MediaDeleteDialog media={mediaFile}>
                        <Button variant={'destructive'} size={'icon'} className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100">
                          <Trash2 />
                        </Button>
                      </MediaDeleteDialog>
                    </div>
                  ) : (
                    <PpdbUploadMediaSheet student={student} collection={item}>
                      <Card className="flex aspect-video items-center justify-center border-2 border-dashed opacity-50">
                        <UploadCloud />
                        Upload {item}
                      </Card>
                    </PpdbUploadMediaSheet>
                  )}
                </FormControl>
              );
            })}
          </div>
        </CardContent>
        {permissions?.canUpdate && (
          <CardFooter>
            <Button onClick={onSuccess} disabled={showAlert}>
              <Check />
              Selanjutnya
            </Button>
          </CardFooter>
        )}
      </Card>
    </PpdbFormWrapper>
  );
};

export default PpdbDocumentForm;
