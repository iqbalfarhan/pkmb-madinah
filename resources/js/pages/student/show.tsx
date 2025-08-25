import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';
import { Download, Edit, Settings, Trash2, Upload } from 'lucide-react';
import { FC } from 'react';
import FamilyCardContent from '../family/components/family-card-content';
import FamilyFormSheet from '../family/components/family-form-sheet';
import StudentContactFormSheet from './components/student-contact-form-sheet';
import StudentFormSheet from './components/student-form-sheet';
import StudentLinkCard from './components/student-link-card';

type Props = {
  student: Student;
};

const ShowStudent: FC<Props> = ({ student }) => {
  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout title="Detail Student" description="Detail student">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-4">
          <Card className="col-span-full">
            <div className="flex items-center justify-between">
              <CardHeader>
                <Avatar className="size-12">
                  <AvatarImage src={student.avatar} />
                </Avatar>
              </CardHeader>
              <CardHeader className="flex-1 pl-0">
                <CardTitle>{student.name}</CardTitle>
                <CardDescription>
                  Tingkat {student.grade?.name} - Kelas {student.classroom?.name}
                </CardDescription>
              </CardHeader>
              {permissions?.canUpdate && (
                <CardFooter>
                  <StudentFormSheet purpose="edit" student={student}>
                    <Button>
                      <Settings />
                      Edit student
                    </Button>
                  </StudentFormSheet>
                </CardFooter>
              )}
            </div>
          </Card>
        </div>
        <div className="row-span-2">
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
            {permissions?.canUpdate && (
              <CardFooter>
                <StudentContactFormSheet student={student}>
                  <Button variant={'secondary'}>
                    <Edit /> Edit kontak
                  </Button>
                </StudentContactFormSheet>
              </CardFooter>
            )}
          </Card>
        </div>
        <div>
          <StudentLinkCard href={route('student.rapor', student.id)} title="E-rapor" description="Rapor perkembangan, nilai, doa dan hafalan." />
        </div>
        <div>
          <StudentLinkCard href={route('student.absent', student.id)} title="Ketidakhadiran" description="Rekap ketidakhadiran tahun ajaran ini." />
        </div>
        <div>
          <StudentLinkCard
            href={route('student.nilai', student.id)}
            title="Nilai siswa"
            description="Rekap nilai siswa untuk semester dan kelas ini."
          />
        </div>
        <div className="col-span-3">
          <Card className="col-span-full h-full">
            <div className="flex justify-between">
              <CardHeader>
                <CardTitle>Orangtua</CardTitle>
                <CardDescription>Informasi data orangtua.</CardDescription>
              </CardHeader>
              {permissions?.canUpdate && (
                <CardFooter>
                  <FamilyFormSheet student={student} purpose={student.family ? 'edit' : 'create'} family={student.family}>
                    <Button variant={'secondary'}>
                      <Edit />
                      Edit
                    </Button>
                  </FamilyFormSheet>
                </CardFooter>
              )}
            </div>
            {student.family && <FamilyCardContent family={student.family} />}
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Kelahiran</CardTitle>
              <CardDescription>
                {student.kelahiran} - {student.umur}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-3 row-span-3">
          <Card className="col-span-full">
            <div className="flex justify-between">
              <CardHeader>
                <CardTitle>Dokumen pelengkap</CardTitle>
                <CardDescription>Rekap ketidakhadiran tahun ajaran ini.</CardDescription>
              </CardHeader>
              {permissions?.canUpdate && (
                <CardFooter>
                  <Button>
                    <Upload />
                    Upload dokumen
                  </Button>
                </CardFooter>
              )}
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
                  {['Kartu Keluarga', 'Akte Kelahiran', 'Kartu Indonesia Pintar'].map((doc) => (
                    <TableRow>
                      <TableCell>{doc}</TableCell>
                      <TableCell>file.pdf</TableCell>
                      <TableCell>
                        <Button variant={'ghost'} size={'icon'}>
                          <Download />
                        </Button>
                        {permissions?.canUpdate && (
                          <Button variant={'ghost'} size={'icon'}>
                            <Trash2 />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <StudentLinkCard
            href={route('student.extracurricular', student.id)}
            title="Ekstrakulikuler"
            description="Ekskul dan kegiatan yang diikuti siswa."
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowStudent;
