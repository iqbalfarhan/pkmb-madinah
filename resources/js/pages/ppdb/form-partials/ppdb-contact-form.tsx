import AddressSelectorDialog from '@/components/address-selector-dialog';
import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { em } from '@/lib/utils';
import { SharedData } from '@/types';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

const PpdbContactForm = () => {
  const { student, permissions } = usePage<SharedData & { student: Student }>().props;

  const { data, setData, put } = useForm({
    phone: student.phone ?? '',
    email: student.email ?? '',
    address: student.address ?? '',
  });

  const handleSubmit = () => {
    put(route('ppdb.update', student.id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Alamat berhasil disimpan!'),
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <>
      <div className="flex gap-6">
        <div className="w-1/3">
          <HeadingSmall title="Kontak siswa" description="Nomor telepon, email dan Alamat tempat tinggal siswa" />
        </div>
        <div className="w-2/3 space-y-6">
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <FormControl label="Nomor telepon">
                  <Input placeholder="Masukkan nomor telepon" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                </FormControl>
                <FormControl label="Alamat email">
                  <Input type="email" placeholder="Masukkan alamat email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                </FormControl>
                <FormControl label="Alamat tempat tinggal" className="col-span-full">
                  <AddressSelectorDialog value={data.address} onValueChange={(value) => setData('address', value)} />
                </FormControl>
              </div>
            </CardContent>
            {permissions?.canUpdate && (
              <>
                <Separator />
                <CardFooter>
                  <SubmitButton onClick={handleSubmit} />
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default PpdbContactForm;
