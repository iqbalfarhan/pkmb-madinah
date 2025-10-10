import AddressSelectorDialog from '@/components/address-selector-dialog';
import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { em } from '@/lib/utils';
import { SharedData } from '@/types';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { FC } from 'react';
import { toast } from 'sonner';
import PpdbFormWrapper from '../layouts/ppdb-form-wrapper';

type Props = {
  onSuccess: () => void;
};

const PpdbContactForm: FC<Props> = ({ onSuccess }) => {
  const { student, permissions } = usePage<SharedData & { student: Student }>().props;

  const { data, setData, put } = useForm({
    phone: student.phone ?? '',
    home_phone: student.home_phone ?? '',
    email: student.email ?? '',
    address: student.address ?? {
      jalan: '',
      dusun: '',
      rt: '',
      rw: '',
      kelurahan: '',
      kodepos: '',
      kecamatan: '',
      kota: '',
      provinsi: '',
    },
  });

  const handleSubmit = () => {
    put(route('ppdb.update', student.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Data siswa berhasil disimpan');
        onSuccess();
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <PpdbFormWrapper title="Kontak siswa" description="Nomor telepon, email dan Alamat tempat tinggal siswa">
      <Card>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <FormControl label="Nomor telepon rumah" className="col-span-full">
              <Input
                type="tel"
                placeholder="Masukkan nomor telepon"
                value={data.home_phone}
                onChange={(e) => setData('home_phone', e.target.value)}
              />
            </FormControl>
            <FormControl label="Nomor telepon pribadi">
              <Input type="tel" placeholder="Masukkan nomor telepon" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat email">
              <Input type="email" placeholder="Masukkan alamat email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat tempat tinggal" className="col-span-full" required>
              <AddressSelectorDialog value={data.address} onValueChange={(value) => setData('address', value)} />
            </FormControl>
          </div>
        </CardContent>
        {permissions?.canUpdate && (
          <>
            <Separator />
            <CardFooter>
              <SubmitButton label="Simpan data kontak" onClick={handleSubmit} />
            </CardFooter>
          </>
        )}
      </Card>
    </PpdbFormWrapper>
  );
};

export default PpdbContactForm;
