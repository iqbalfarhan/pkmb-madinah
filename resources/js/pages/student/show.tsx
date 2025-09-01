import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Absent } from '@/types/absent';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';
import { Building, Calendar, Edit, Key, KeyRound, Palette, Settings, Upload, Wallet } from 'lucide-react';
import { FC } from 'react';
import AbsentPieChart from '../absent/components/absent-pie-chart';
import FamilyCardContent from '../family/components/family-card-content';
import FamilyFormSheet from '../family/components/family-form-sheet';
import PpdbUploadMediaSheet from '../ppdb/components/ppdb-upload-media-sheet';
import StudentContactFormSheet from './components/student-contact-form-sheet';
import StudentFormSheet from './components/student-form-sheet';
import StudentLinkCard from './components/student-link-card';
import StudentMediaTable from './components/student-media-table';

type Props = {
  student: Student;
};

const ShowStudent: FC<Props> = ({ student }) => {
  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout title="Detail Student" description="Detail student">
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-4">
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
        <StudentLinkCard
          href={route('student.bill', student.id)}
          title="Tagihan siswa"
          description={`Semua list tagihan pembayaran siswa`}
          icon={Wallet}
        />
        <StudentLinkCard href={route('student.rapor', student.id)} title="E-rapor" description="Rapor perkembangan, nilai, doa dan hafalan." />
        <AbsentPieChart absents={student.absents as Absent[]} href={route('student.absent', student.id)} className="row-span-2" />
        <StudentLinkCard
          href={route('student.nilai', student.id)}
          title="Nilai siswa"
          description="Rekap nilai siswa untuk semester dan kelas ini."
        />
        {student.classroom ? (
          <StudentLinkCard
            href={route('classroom.show', student.classroom_id)}
            title={`${student.classroom.name}`}
            description={`${student.classroom.name}. walikelas : ${student.classroom.teacher?.name}`}
            icon={KeyRound}
          />
        ) : (
          <StudentLinkCard title={'Belum ada kelas'} description={'Siswa belum mendapatkan kelas'} icon={KeyRound} />
        )}

        <StudentLinkCard
          href={route('student.extracurricular', student.id)}
          title="Ekstrakulikuler"
          description="Ekskul dan kegiatan yang diikuti siswa."
          icon={Palette}
        />
        <StudentLinkCard
          href={route('user.show', student.user?.id)}
          title="Akun login"
          description={`Akun login orangtua: ${student.user?.email}`}
          icon={Key}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-full">
          <HeadingSmall title="Informasi lainnya" description="informasi pendaftaran dan berkas siswa" />
        </div>
        <StudentLinkCard title={'Kelahiran'} description={`${student.kelahiran} - ${student.umur}`} icon={Calendar} />
        <Card className="col-span-3 row-span-2">
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
        <StudentLinkCard
          title="Asal sekolah"
          description={
            student.prevschool ? `${student.prevschool?.name ?? ''} ${student.prevschool?.address ?? ''}` : 'tidak ada data yang tersimpan'
          }
          icon={Building}
        />
        <Card className="col-span-3 row-span-3">
          <div className="flex justify-between">
            <CardHeader>
              <CardTitle>Dokumen pelengkap</CardTitle>
              <CardDescription>Rekap ketidakhadiran tahun ajaran ini.</CardDescription>
            </CardHeader>
            {permissions?.canUpdate && (
              <CardFooter>
                <PpdbUploadMediaSheet student={student}>
                  <Button>
                    <Upload />
                    Upload dokumen
                  </Button>
                </PpdbUploadMediaSheet>
              </CardFooter>
            )}
          </div>
          <CardContent>
            <StudentMediaTable media={student.media ?? []} />
          </CardContent>
        </Card>

        <Card className="row-span-2">
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
    </AppLayout>
  );
};

export default ShowStudent;
