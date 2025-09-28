import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Setting } from '@/types/setting';
import { Student } from '@/types/student';
import { Link, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { BookCheck, CheckCheck, Edit, Folder, PencilRuler, Plus, Settings, Trash2, Wallet } from 'lucide-react';
import { FC, useState } from 'react';
import StudentStatusBadge from '../student/components/student-status-badge';
import PpdbAcceptRegistrationSheet from './components/ppdb-accept-registration-sheet';
import PpdbBulkDeleteDialog from './components/ppdb-bulk-delete-dialog';
import PpdbBulkEditSheet from './components/ppdb-bulk-edit-sheet';
import PpdbDeleteDialog from './components/ppdb-delete-dialog';
import PpdbFormSheet from './components/ppdb-form-sheet';
import PpdbSettingSheet from './components/ppdb-setting-sheet';

type Props = {
  ppdbs: Student[];
  ppdbSetting: Setting;
  counts?: {
    draft: number;
    ppdb: number;
  };
  query: { [key: string]: string };
};

const PpdbList: FC<Props> = ({
  ppdbs,
  ppdbSetting,
  counts = {
    draft: 0,
    ppdb: 0,
  },
  query,
}) => {
  const [status] = useState(query.status ?? 'ppdb');
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout title="Pendaftaran siswa baru" description="Pengaturan siswa baru">
      <div className="grid-responsive grid gap-4">
        <PpdbSettingSheet purpose="edit" setting={ppdbSetting}>
          <Card className={ppdbSetting.value === 'true' ? 'border border-success bg-success/10 text-success shadow-2xl shadow-success' : ''}>
            <CardHeader className="flex flex-row space-y-5 space-x-4">
              <div className="size-5">
                <Settings />
              </div>
              <div className="space-y-1.5">
                <CardTitle className="line-clamp-1">Pengaturan PPDB</CardTitle>
                <CardDescription className="line-clamp-2">
                  Saat ini status ppdb {ppdbSetting.value == 'true' ? 'dibuka' : 'ditutup'}. klik untuk membuka pengaturan
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </PpdbSettingSheet>
        <Card onClick={() => router.get('', { status: 'ppdb' })}>
          <CardHeader className="flex flex-row space-y-5 space-x-4">
            <div className="size-5">
              <BookCheck />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="line-clamp-1">Siap diverifikasi</CardTitle>
              <CardDescription className="line-clamp-2">{counts.ppdb} siswa sedang menunggu verifikasi dari pihak sekolah.</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card onClick={() => router.get('', { status: 'draft' })}>
          <CardHeader className="flex flex-row space-y-5 space-x-4">
            <div className="size-5">
              <PencilRuler />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="line-clamp-1">Proses pendfataran</CardTitle>
              <CardDescription className="line-clamp-2">{counts.draft} siswa dalam proses pengisian data siswa baru.</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card onClick={() => router.visit(route('ppdb.create'))}>
          <CardHeader className="flex flex-row space-y-5 space-x-4">
            <div className="size-5">
              <Plus />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="line-clamp-1">Pendaftaran baru</CardTitle>
              <CardDescription className="line-clamp-2">{counts.draft} siswa dalam proses pengisian data siswa baru.</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
      {status === 'ppdb' ? (
        <HeadingSmall
          title="Siap diverfikasi"
          description="List calon siswa yang siap untuk diverifikasi"
          actions={
            <>
              <Input placeholder="Search ppdbs..." value={cari} onChange={(e) => setCari(e.target.value)} />
            </>
          }
        />
      ) : (
        <HeadingSmall
          title="Proses pendaftaran"
          description="List calon siswa dalam proses pengisian data pendaftaran"
          actions={
            <>
              <Input placeholder="Search ppdbs..." value={cari} onChange={(e) => setCari(e.target.value)} />
            </>
          }
        />
      )}
      {ids.length > 0 && (
        <div className="flex gap-2">
          <Button variant={'ghost'} disabled>
            {ids.length} item selected
          </Button>
          <PpdbBulkEditSheet ppdbIds={ids}>
            <Button>
              <Edit /> Edit selected
            </Button>
          </PpdbBulkEditSheet>
          <PpdbBulkDeleteDialog ppdbIds={ids}>
            <Button variant={'destructive'}>
              <Trash2 /> Delete selected
            </Button>
          </PpdbBulkDeleteDialog>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === ppdbs.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(ppdbs.map((ppdb) => ppdb.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>NISN</TableHead>
            <TableHead>Nama calon pesdik</TableHead>
            <TableHead>Jenjang</TableHead>
            <TableHead>Asal sekolah</TableHead>
            <TableHead>Tanggal pendaftaran</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ppdbs
            .filter((ppdb) => JSON.stringify(ppdb).toLowerCase().includes(cari.toLowerCase()))
            .map((ppdb) => (
              <TableRow key={ppdb.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(ppdb.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, ppdb.id]);
                          } else {
                            setIds(ids.filter((id) => id !== ppdb.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ppdb.nisn}</TableCell>
                <TableCell>{ppdb.name}</TableCell>
                <TableCell>{ppdb.grade?.group}</TableCell>
                <TableCell>{ppdb.prevschool?.name}</TableCell>
                <TableCell>{dayjs(ppdb.created_at).format('DD MMMM YYYY HH:mm:ss')}</TableCell>
                <TableCell>
                  <StudentStatusBadge status={ppdb.status} />
                </TableCell>
                <TableCell>
                  {permissions?.canUpdate && status == 'ppdb' && (
                    <PpdbAcceptRegistrationSheet ppdb={ppdb}>
                      <Button variant={'ghost'} size={'icon'}>
                        <CheckCheck />
                      </Button>
                    </PpdbAcceptRegistrationSheet>
                  )}
                  {permissions?.canUpdate && status == 'ppdb' && (
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Link href={route('student.bill', ppdb.id)}>
                        <Wallet />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canShow && status == 'ppdb' && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('ppdb.show', ppdb.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && status == 'ppdb' && (
                    <PpdbFormSheet purpose="edit" ppdb={ppdb}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </PpdbFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <PpdbDeleteDialog ppdb={ppdb}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </PpdbDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default PpdbList;
