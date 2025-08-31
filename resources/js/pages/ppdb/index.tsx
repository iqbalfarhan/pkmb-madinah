import { Badge } from '@/components/ui/badge';
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
import { CheckCheck, Edit, Filter, Folder, Plus, Trash2, Wallet } from 'lucide-react';
import { FC, useState } from 'react';
import StudentStatusBadge from '../student/components/student-status-badge';
import PpdbAcceptRegistrationSheet from './components/ppdb-accept-registration-sheet';
import PpdbBulkDeleteDialog from './components/ppdb-bulk-delete-dialog';
import PpdbBulkEditSheet from './components/ppdb-bulk-edit-sheet';
import PpdbDeleteDialog from './components/ppdb-delete-dialog';
import PpdbFilterSheet from './components/ppdb-filter-sheet';
import PpdbFormSheet from './components/ppdb-form-sheet';
import PpdbSettingSheet from './components/ppdb-setting-sheet';

type Props = {
  ppdbs: Student[];
  ppdbSetting: Setting;
  query: { [key: string]: string };
};

const PpdbList: FC<Props> = ({ ppdbs, query, ppdbSetting }) => {
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
          <PpdbSettingSheet purpose="edit" setting={ppdbSetting}>
            <Button>Pengaturan PPDB</Button>
          </PpdbSettingSheet>
        </>
      }
    >
      <div className="grid grid-cols-3 gap-6">
        <Card className="text-success">
          <CardHeader>
            <CardTitle>Saat ini status ppdb dibuka</CardTitle>
            <CardDescription>Klik untuk mengubah status ppdb</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>cd</CardTitle>
            <CardDescription>dd</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Search ppdbs..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <PpdbFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </PpdbFilterSheet>
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
