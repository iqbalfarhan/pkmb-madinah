import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Academicyear } from '@/types/academicyear';
import { Link } from '@inertiajs/react';
import { CheckCheck, Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
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

  return (
    <AppLayout
      title="Academicyears"
      description="Manage your academicyears"
      actions={
        <>
          <AcademicyearFormSheet purpose="create">
            <Button>
              <Plus />
              Create new academicyear
            </Button>
          </AcademicyearFormSheet>
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
                <TableCell>{academicyear.semester}</TableCell>
                <TableCell>{academicyear.active && <Badge>Active</Badge>}</TableCell>
                <TableCell>
                  <AcademicyearSetActiveDialog academicyear={academicyear}>
                    <Button variant={'ghost'} size={'icon'}>
                      <CheckCheck />
                    </Button>
                  </AcademicyearSetActiveDialog>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('academicyear.show', academicyear.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <AcademicyearFormSheet purpose="edit" academicyear={academicyear}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </AcademicyearFormSheet>
                  <AcademicyearDeleteDialog academicyear={academicyear}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </AcademicyearDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default AcademicyearList;
