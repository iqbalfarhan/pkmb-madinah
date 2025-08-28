import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFY, strLimit } from '@/lib/utils';
import { SharedData } from '@/types';
import { Absent } from '@/types/absent';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import AbsentBulkDeleteDialog from './components/absent-bulk-delete-dialog';
import AbsentBulkEditSheet from './components/absent-bulk-edit-sheet';
import AbsentDeleteDialog from './components/absent-delete-dialog';
import AbsentFilterSheet from './components/absent-filter-sheet';
import AbsentFormSheet from './components/absent-form-sheet';

type Props = {
  absents: Absent[];
  query: { [key: string]: string };
};

const AbsentList: FC<Props> = ({ absents, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Absents"
      description="Manage your absents"
      actions={
        <>
          {permissions?.canAdd && (
            <AbsentFormSheet purpose="create">
              <Button>
                <Plus />
                Create new absent
              </Button>
            </AbsentFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search absents..." value={cari} onChange={(e) => setCari(e.target.value)} />
        {permissions?.canFilter && (
          <AbsentFilterSheet query={query}>
            <Button>
              <Filter />
              Filter data
              {Object.values(query).filter((val) => val && val !== '').length > 0 && (
                <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
              )}
            </Button>
          </AbsentFilterSheet>
        )}
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <AbsentBulkEditSheet absentIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </AbsentBulkEditSheet>
            <AbsentBulkDeleteDialog absentIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </AbsentBulkDeleteDialog>
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
                    checked={ids.length === absents.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(absents.map((absent) => absent.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Academic year</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Student name</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {absents
            .filter((absent) => JSON.stringify(absent).toLowerCase().includes(cari.toLowerCase()))
            .map((absent) => (
              <TableRow key={absent.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(absent.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, absent.id]);
                          } else {
                            setIds(ids.filter((id) => id !== absent.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{absent.academic_year.label}</TableCell>
                <TableCell>{dateDFY(absent.date)}</TableCell>
                <TableCell>{absent.student.name}</TableCell>
                <TableCell>{absent.reason}</TableCell>
                <TableCell>{strLimit(absent.description)}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('absent.show', absent.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <AbsentFormSheet purpose="edit" absent={absent}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </AbsentFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <AbsentDeleteDialog absent={absent}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </AbsentDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default AbsentList;
