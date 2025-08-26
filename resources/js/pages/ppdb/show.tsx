import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFY, numberPad } from '@/lib/utils';
import { SharedData } from '@/types';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';
import { Check, Download } from 'lucide-react';
import { FC } from 'react';
import FamilyCardContent from '../family/components/family-card-content';
import StudentStatusBadge from '../student/components/student-status-badge';

type Props = {
  ppdb: Student;
};

const ShowPpdb: FC<Props> = ({ ppdb }) => {
  const { permissions } = usePage<SharedData>().props;
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
      <Card>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jenis dokumen</TableHead>
                <TableHead>Nama file</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ppdb.media?.map((m) => (
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {permissions?.canApprove && (
        <div>
          <Button>
            <Check />
            Terima pendaftaran dan buat tagihan
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default ShowPpdb;
