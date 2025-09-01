import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Extracurricular } from '@/types/extracurricular';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ExtracurricularBulkDeleteDialog from './components/extracurricular-bulk-delete-dialog';
import ExtracurricularBulkEditSheet from './components/extracurricular-bulk-edit-sheet';
import ExtracurricularDeleteDialog from './components/extracurricular-delete-dialog';
import ExtracurricularFilterSheet from './components/extracurricular-filter-sheet';
import ExtracurricularFormSheet from './components/extracurricular-form-sheet';

type Props = {
  extracurriculars: Extracurricular[];
  query: { [key: string]: string };
};

const ExtracurricularList: FC<Props> = ({ extracurriculars, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Extracurriculars"
      description="Manage your extracurriculars"
      actions={
        <>
          {permissions?.canAdd && (
            <ExtracurricularFormSheet purpose="create">
              <Button>
                <Plus />
                Create new extracurricular
              </Button>
            </ExtracurricularFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search extracurriculars..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ExtracurricularFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ExtracurricularFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ExtracurricularBulkEditSheet extracurricularIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ExtracurricularBulkEditSheet>
            <ExtracurricularBulkDeleteDialog extracurricularIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ExtracurricularBulkDeleteDialog>
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
                    checked={ids.length === extracurriculars.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(extracurriculars.map((extracurricular) => extracurricular.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Nama Ekskul</TableHead>
            <TableHead>Guru Pembina</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {extracurriculars
            .filter((extracurricular) => JSON.stringify(extracurricular).toLowerCase().includes(cari.toLowerCase()))
            .map((extracurricular) => (
              <TableRow key={extracurricular.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(extracurricular.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, extracurricular.id]);
                          } else {
                            setIds(ids.filter((id) => id !== extracurricular.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{extracurricular.name}</TableCell>
                <TableCell>{extracurricular.teacher?.name}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('extracurricular.show', extracurricular.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <ExtracurricularFormSheet purpose="edit" extracurricular={extracurricular}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ExtracurricularFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <ExtracurricularDeleteDialog extracurricular={extracurricular}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ExtracurricularDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ExtracurricularList;
