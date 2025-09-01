import SubmitButton from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { em } from '@/lib/utils';
import { Student } from '@/types/student';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ArrowRight, ChevronRight, FileWarning } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import PpdbFormWrapper from '../layouts/ppdb-form-wrapper';

const PpdbCompleteForm = () => {
  const [agree, setAgree] = useState<CheckedState>(false);

  const { student } = usePage<{ student: Student }>().props;
  const { setData, put, processing } = useForm({
    status: agree ? 'ppdb' : student.status,
  });

  const requiredDocs = ['akta kelahiran', 'kartu keluarga', 'photo siswa'];
  const documentComplete = requiredDocs.every((doc) => student.media?.some((m) => m.collection_name === doc));

  const hasAddress = !!student.address && student.address.trim() !== '';

  const hasParent = student.family !== undefined || student.family !== null;

  if (!documentComplete || !hasAddress || !hasParent) {
    return (
      <PpdbFormWrapper title="Dokumen belum lengkap" description="Belum bisa melanjutkan ke tahapan selanjutnya">
        <Alert variant={'destructive'}>
          <FileWarning />
          <AlertTitle>Data belum lengkap</AlertTitle>
          <AlertDescription>Dokumen pelengkap, Alamat dan informasi orangtua belum diisi semua</AlertDescription>
        </Alert>
      </PpdbFormWrapper>
    );
  }

  const handleNextStep = () => {
    put(route('ppdb.update', student.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Data berhasil diperbarui');
        router.get(route('ppdb.show', student.id));
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <PpdbFormWrapper title="Dokumen sudah lengkap" description="Sudah bisa melanjutkan ke tahapan selanjutnya">
      {student.status === 'draft' ? (
        <Card>
          <CardHeader>
            <CardTitle>Persyaratan sudah lengkap</CardTitle>
            <CardDescription>
              Dengan mencentang pilihan dibawah ini, anda bisa lanjut ke pengajuan berkas pendaftaran, dan menunggu pihak admin sekolah untuk
              verifikasi, merubah status pendaftaran dan pembuatan tagihan biaya pendaftaran siswa.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <Label className="flex items-center space-x-2">
              <Checkbox
                checked={agree}
                onCheckedChange={(e) => {
                  setData('status', e ? 'ppdb' : student.status);
                  setAgree(e);
                }}
              />
              <span className="text-sm">Saya menyatakan bahwa semua informasi yang diberikan adalah benar dan dapat dipertanggungjawabkan.</span>
            </Label>
          </CardContent>
          <CardFooter>
            <SubmitButton onClick={handleNextStep} icon={ChevronRight} loading={processing} disabled={!agree} label="Lanjutkan ke pendaftaran" />
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Verifikasi pendaftaran</CardTitle>
            <CardDescription>
              Saat ini data pendaftaran Anda sedang dalam proses verifikasi. Silakan tunggu informasi selanjutnya dari pihak sekolah.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="warning" asChild>
              <Link href={route('ppdb.show', student.id)}>
                Lihat progres pendaftaran <ArrowRight />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </PpdbFormWrapper>
  );
};

export default PpdbCompleteForm;
