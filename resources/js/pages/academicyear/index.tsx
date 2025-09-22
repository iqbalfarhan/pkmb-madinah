import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { em } from '@/lib/utils';
import { SharedData } from '@/types';
import { Academicyear } from '@/types/academicyear';
import { Link, router, usePage } from '@inertiajs/react';
import { CheckCheck, Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import AcademicyearBulkDeleteDialog from './components/academicyear-bulk-delete-dialog';
import AcademicyearBulkEditSheet from './components/academicyear-bulk-edit-sheet';
import AcademicyearDeleteDialog from './components/academicyear-delete-dialog';
import AcademicyearFilterSheet from './components/academicyear-filter-sheet';
import AcademicyearFormSheet from './components/academicyear-form-sheet';
import AcademicyearSetActiveDialog from './components/academicyear-set-active-dialog';

type Props = {
  academicyears: Academicyear[];
  query: { [key: string]: string };
};

const AcademicyearList: FC<Props> = ({ academicyears, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  const handleChangeSemester = (academicyear: Academicyear, semester: string) => {
    router.put(
      route('academicyear.update', academicyear.id),
      {
        semester: semester,
      },
      {
        onSuccess: () => toast.success('updated'),
        onError: (e) => toast.error(em(e)),
      },
    );
  };

  return (
    <AppLayout
      title="Academicyears"
      description="Manage your academicyears"
      actions={
        <>
          {permissions?.canAdd && (
            <AcademicyearFormSheet purpose="create">
              <Button>
                <Plus />
                Create new academicyear
              </Button>
            </AcademicyearFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search academicyears..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <AcademicyearFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </AcademicyearFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <AcademicyearBulkEditSheet academicyearIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </AcademicyearBulkEditSheet>
            <AcademicyearBulkDeleteDialog academicyearIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </AcademicyearBulkDeleteDialog>
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
                    checked={ids.length === academicyears.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(academicyears.map((academicyear) => academicyear.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Tahun ajaran</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {academicyears
            .filter((academicyear) => JSON.stringify(academicyear).toLowerCase().includes(cari.toLowerCase()))
            .map((academicyear) => (
              <TableRow key={academicyear.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(academicyear.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, academicyear.id]);
                          } else {
                            setIds(ids.filter((id) => id !== academicyear.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{academicyear.year}</TableCell>
                <TableCell>
                  <Button
                    disabled={!academicyear.active}
                    size={'sm'}
                    variant={academicyear.semester === 'ganjil' ? 'default' : 'secondary'}
                    onClick={() => handleChangeSemester(academicyear, 'ganjil')}
                  >
                    Ganjil
                  </Button>
                  <Button
                    disabled={!academicyear.active}
                    size={'sm'}
                    variant={academicyear.semester === 'genap' ? 'default' : 'secondary'}
                    onClick={() => handleChangeSemester(academicyear, 'genap')}
                  >
                    Genap
                  </Button>
                </TableCell>
                <TableCell>{academicyear.active && <Badge>Active</Badge>}</TableCell>
                <TableCell>
                  {permissions?.canUpdate && (
                    <AcademicyearSetActiveDialog academicyear={academicyear}>
                      <Button variant={'ghost'} size={'icon'}>
                        <CheckCheck />
                      </Button>
                    </AcademicyearSetActiveDialog>
                  )}
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('academicyear.show', academicyear.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {/* {permissions?.canUpdate && (
                    <AcademicyearFormSheet purpose="edit" academicyear={academicyear}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </AcademicyearFormSheet>
                  )} */}
                  {permissions?.canDelete && (
                    <AcademicyearDeleteDialog academicyear={academicyear}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </AcademicyearDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default AcademicyearList;
