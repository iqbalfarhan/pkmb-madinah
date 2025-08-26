import HeadingSmall from '@/components/heading-small';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MediaDeleteDialog from '@/pages/media/components/media-delete-dialog';
import { Media, SharedData } from '@/types';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';
import { AlertCircle, Download, Trash2, Upload } from 'lucide-react';
import PpdbUploadMediaSheet from '../components/ppdb-upload-media-sheet';

const PpdbDocumentForm = () => {
  const { media = [], student, permissions } = usePage<SharedData & { media: Media[]; student: Student }>().props;

  const showAlert =
    !media.some((m) => m.collection_name === 'akta kelahiran') ||
    !media.some((m) => m.collection_name === 'kartu keluarga') ||
    !media.some((m) => m.collection_name === 'photo siswa');

  return (
    <div className="flex gap-6">
      <div className="w-1/3 space-y-6">
        <HeadingSmall title="Dokumen pendukung" description="Dokumen yang harus diupload: Kartu keluarga, Akta kelahiran siswa" />
        {showAlert && (
          <Alert variant={'destructive'}>
            <AlertCircle />
            <AlertTitle>Dokumen belum lengkap</AlertTitle>
            <AlertDescription>Dokumen yang harus diupload: Kartu keluarga, Akta kelahiran dam photo siswa.</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="w-2/3 space-y-6">
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jenis dokumen</TableHead>
                  <TableHead>Nama file</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {media.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={m.preview_url} alt={m.name} />
                        </Avatar>
                        {m.collection_name}
                      </div>
                    </TableCell>
                    <TableCell>{m.file_name}</TableCell>
                    <TableCell>
                      <Button variant={'ghost'} size={'icon'}>
                        <Download />
                      </Button>
                      {permissions?.canUpdate && (
                        <MediaDeleteDialog media={m}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Trash2 />
                          </Button>
                        </MediaDeleteDialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          {permissions?.canUpdate && (
            <CardFooter>
              <PpdbUploadMediaSheet student={student}>
                <Button>
                  <Upload />
                  <span>Upload dokumen</span>
                </Button>
              </PpdbUploadMediaSheet>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PpdbDocumentForm;
