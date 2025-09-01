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
import { Link, usePage } from '@inertiajs/react';
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
}) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Ppdbs"
      description="Manage your ppdbs"
      actions={
        <>
          {permissions?.canAdd && (
            <Button asChild>
              <Link href={route('ppdb.create')}>
                <Plus />
                Pendaftaran siswa baru
              </Link>
            </Button>
          )}
        </>
      }
    >
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
        <Card>
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
        <Card>
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
      </div>
      <div className="flex gap-2">
        <Input placeholder="Search ppdbs..." value={cari} onChange={(e) => setCari(e.target.value)} />
        {ids.length > 0 && (
          <>
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
          </>
        )}
      </div>
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
                <TableCell>{ppdb.grade?.name}</TableCell>
                <TableCell>{ppdb.prevschool?.name}</TableCell>
                <TableCell>{dayjs(ppdb.created_at).format('DD MMMM YYYY HH:mm:ss')}</TableCell>
                <TableCell>
                  <StudentStatusBadge status={ppdb.status} />
                </TableCell>
                <TableCell>
                  {permissions?.canUpdate && (
                    <PpdbAcceptRegistrationSheet ppdb={ppdb}>
                      <Button variant={'ghost'} size={'icon'}>
                        <CheckCheck />
                      </Button>
                    </PpdbAcceptRegistrationSheet>
                  )}
                  {permissions?.canUpdate && (
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Link href={route('student.bill', ppdb.id)}>
                        <Wallet />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('ppdb.show', ppdb.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
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
