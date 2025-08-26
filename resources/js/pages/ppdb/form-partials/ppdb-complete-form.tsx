import HeadingSmall from '@/components/heading-small';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { em } from '@/lib/utils';
import { Student } from '@/types/student';
import { Link, useForm, usePage } from '@inertiajs/react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const PpdbCompleteForm = () => {
  const [agree, setAgree] = useState<CheckedState>(false);

  const { student } = usePage<{ student: Student }>().props;
  const { setData, put, processing } = useForm({
    status: agree ? 'ppdb' : student.status,
  });

  const handleNextStep = () => {
    put(route('ppdb.update', student.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Data berhasil diperbarui');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/3">
        <HeadingSmall title="Proses selanjutnya" description="Silakan lengkapi semua data yang diperlukan sebelum melanjutkan." />
      </div>
      <div className="w-2/3 space-y-6">
        {student.status === 'draft' ? (
          <Card>
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
      </div>
    </div>
  );
};

export default PpdbCompleteForm;
