import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import StudentMediaTable from '@/pages/student/components/student-media-table';
import { Media, SharedData } from '@/types';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';
import { AlertCircle, Upload } from 'lucide-react';
import PpdbUploadMediaSheet from '../components/ppdb-upload-media-sheet';
import PpdbFormWrapper from '../layouts/ppdb-form-wrapper';

const PpdbDocumentForm = () => {
  const { media = [], student, permissions } = usePage<SharedData & { media: Media[]; student: Student }>().props;

  const requiredDocs = ['akta kelahiran', 'kartu keluarga', 'photo siswa'];
  const showAlert = !requiredDocs.every((doc) => student.media?.some((m) => m.collection_name === doc));

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
          <StudentMediaTable media={media} />
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
    </PpdbFormWrapper>
  );
};

export default PpdbDocumentForm;
