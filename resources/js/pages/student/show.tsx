import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Student } from '@/types/student';
import { Link } from '@inertiajs/react';
import { Download, Edit, Settings, Trash2, Upload } from 'lucide-react';
import { FC } from 'react';

type Props = {
  student: Student;
};

const ShowStudent: FC<Props> = ({ student }) => {
  return (
    <AppLayout title="Detail Student" description="Detail student">
      <div className="grid grid-cols-4 gap-6">
        <Card className="col-span-full">
          <div className="flex items-center justify-between">
            <CardHeader>
              <CardTitle>{student.name}</CardTitle>
              <CardDescription>
                Tingkat {student.grade?.name} - Kelas {student.classroom?.name}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>
                <Settings />
                Edit student
              </Button>
            </CardFooter>
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kontak siswa</CardTitle>
              <CardDescription>Kontak yand bisa dihubungi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <CardDescription>Nomor telepon</CardDescription>
                <span className="text-sm">{student.phone}</span>
              </div>
              <div>
                <CardDescription>Alamat email</CardDescription>
                <span className="text-sm">{student.email}</span>
              </div>
              <div>
                <CardDescription>Alamat rumah</CardDescription>
                <span className="text-sm">{student.address}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Kelahiran</CardTitle>
              <CardDescription>
                {student.kelahiran} - {student.umur}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-3 grid h-fit grid-cols-3 gap-6">
          <Link href={route('student.show', student.id)}>
            <Card>
              <CardHeader>
                <CardTitle>E-rapor</CardTitle>
                <CardDescription>Rapor perkembangan, nilai, doa dan hafalan.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href={route('student.show', student.id)}>
            <Card>
              <CardHeader>
                <CardTitle>Ketidakhadiran</CardTitle>
                <CardDescription>Rekap ketidakhadiran tahun ajaran ini.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href={route('student.show', student.id)}>
            <Card>
              <CardHeader>
                <CardTitle>Ekstrakulikuler</CardTitle>
                <CardDescription>Ekskul dan kegiatan yang diikuti siswa.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Card className="col-span-full">
            <div className="flex justify-between">
              <CardHeader>
                <CardTitle>Orangtua</CardTitle>
                <CardDescription>Rekap ketidakhadiran tahun ajaran ini.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant={'secondary'}>
                  <Edit />
                  Edit
                </Button>
              </CardFooter>
            </div>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ayah</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, tempora!</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Ibu</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, porro.</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-full">
            <div className="flex justify-between">
              <CardHeader>
                <CardTitle>Dokumen pelengkap</CardTitle>
                <CardDescription>Rekap ketidakhadiran tahun ajaran ini.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>
                  <Upload />
                  Upload dokumen
                </Button>
              </CardFooter>
            </div>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dokumen</TableHead>
                    <TableHead>Nama file</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Kartu keluarga</TableCell>
                    <TableCell>file.pdf</TableCell>
                    <TableCell>
                      <Button variant={'ghost'} size={'icon'}>
                        <Download />
                      </Button>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Akta kelahiran</TableCell>
                    <TableCell>Akta kelahiran siswa.pdf</TableCell>
                    <TableCell>
                      <Button variant={'ghost'} size={'icon'}>
                        <Download />
                      </Button>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowStudent;
