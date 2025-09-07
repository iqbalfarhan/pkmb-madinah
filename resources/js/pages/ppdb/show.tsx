import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { dateDFY, numberPad } from '@/lib/utils';
import { SharedData } from '@/types';
import { Student } from '@/types/student';
import { router, usePage } from '@inertiajs/react';
import { ArrowRight, Wallet } from 'lucide-react';
import { FC } from 'react';
import FamilyCardContent from '../family/components/family-card-content';
import StudentMediaTable from '../student/components/student-media-table';
import StudentStatusBadge from '../student/components/student-status-badge';

type Props = {
  ppdb: Student;
};

const ShowPpdb: FC<Props> = ({ ppdb }) => {
  const { permissions } = usePage<SharedData>().props;

  const handleApprove = () => {
    router.put(
      route('ppdb.update', ppdb.id),
      {},
      {
        preserveScroll: true,
        onSuccess: () => {
          router.visit(route('student.bill', ppdb.id));
        },
      },
    );
  };

  return (
    <AppLayout
      title="Detail Ppdb"
      description="Detail ppdb"
      actions={
        <>
          <Button variant={'secondary'} disabled>
            Kode pendaftaran: {`#${numberPad(ppdb.id)}`}
          </Button>
        </>
      }
    >
      <Alert variant={'warning'}>
        <AlertTitle>Menunggu persetujuan admin</AlertTitle>
        <AlertDescription>Saat ini status siswa masih menunggu verifikasi dari pihak sekolah</AlertDescription>
      </Alert>
      <div className="grid grid-cols-2 gap-6">
        <Card className="col-span-2">
          <div className="flex justify-between">
            <CardHeader>
              <Avatar className="size-10">
                <AvatarImage src={ppdb.avatar ?? undefined} />
              </Avatar>
            </CardHeader>
            <CardHeader className="flex-1 pl-0">
              <CardTitle>{ppdb.name}</CardTitle>
              <CardDescription>#{numberPad(ppdb.id)}</CardDescription>
            </CardHeader>
            <CardFooter>{/* <StudentStatusBadge status={ppdb.status} /> */}</CardFooter>
          </div>
          <Separator />
          <div className="grid grid-cols-4 gap-6">
            <CardHeader>
              <CardDescription>Nama siswa</CardDescription>
              <CardTitle>{ppdb.name}</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardDescription>NISN</CardDescription>
              <CardTitle>{ppdb.nisn}</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardDescription>NIS</CardDescription>
              <CardTitle>{ppdb.nis}</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardDescription>Pendaftaran</CardDescription>
              <CardTitle>Jenjang {ppdb.grade?.name}</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardDescription>Tanggal pendaftaran</CardDescription>
              <CardTitle>{dateDFY(ppdb.created_at)}</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardDescription>Status pendaftaran</CardDescription>
              <StudentStatusBadge status={ppdb.status} />
            </CardHeader>
            <CardHeader>
              <CardDescription>Asal sekolah</CardDescription>
              <CardTitle>{ppdb.prevschool?.name}</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardDescription>Jenis kelamin</CardDescription>
              <CardTitle>{ppdb.gender ? 'Laki-laki' : 'Perempuan'}</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardDescription>Kelahiran</CardDescription>
              <CardTitle>{ppdb.kelahiran}</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardDescription>Nomor telepon</CardDescription>
              <CardTitle>{ppdb.phone}</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardDescription>Alamat email</CardDescription>
              <CardTitle>{ppdb.email}</CardTitle>
            </CardHeader>
            <CardHeader className="col-span-4">
              <CardDescription>Alamat tempat tinggal</CardDescription>
              <CardTitle>{ppdb.address}</CardTitle>
            </CardHeader>
          </div>
        </Card>
        {ppdb.family && (
          <Card>
            <CardHeader>
              <CardTitle>Data Keluarga</CardTitle>
              <CardDescription>Informasi tentang anggota keluarga siswa</CardDescription>
            </CardHeader>
            <Separator />
            <FamilyCardContent family={ppdb.family} />
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Dokumen Pendukung</CardTitle>
            <CardDescription>Dokumen yang diunggah oleh siswa</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <StudentMediaTable media={ppdb.media ?? []} />
          </CardContent>
        </Card>
      </div>
      {permissions?.canApprove && (
        <>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Buat tagihan</CardTitle>
              <CardDescription>Buat tagihan untuk siswa baru</CardDescription>
            </CardHeader>
            <Separator />
            <CardFooter>
              <Button onClick={handleApprove}>
                <Wallet />
                Buat tagihan pembayaran
                <ArrowRight />
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </AppLayout>
  );
};

export default ShowPpdb;
