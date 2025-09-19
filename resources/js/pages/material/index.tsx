import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Material } from '@/types/material';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import MaterialBulkDeleteDialog from './components/material-bulk-delete-dialog';
import MaterialBulkEditSheet from './components/material-bulk-edit-sheet';
import MaterialDeleteDialog from './components/material-delete-dialog';
import MaterialFilterSheet from './components/material-filter-sheet';
import MaterialFormSheet from './components/material-form-sheet';

type Props = {
  materials: Material[];
  query: { [key: string]: string };
};

const MaterialList: FC<Props> = ({ materials, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Materials"
      description="Manage your materials"
      actions={
        <>
          {permissions?.canAdd && (
            <MaterialFormSheet purpose="create">
              <Button>
                <Plus />
                Create new material
              </Button>
            </MaterialFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search materials..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <MaterialFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </MaterialFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <MaterialBulkEditSheet materialIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </MaterialBulkEditSheet>
            <MaterialBulkDeleteDialog materialIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </MaterialBulkDeleteDialog>
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
                    checked={ids.length === materials.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(materials.map((material) => material.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Pelajaran</TableHead>
            <TableHead>Judul materi belajar</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials
            .filter((material) => JSON.stringify(material).toLowerCase().includes(cari.toLowerCase()))
            .map((material) => (
              <TableRow key={material.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(material.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, material.id]);
                          } else {
                            setIds(ids.filter((id) => id !== material.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{material.lesson.classroom.name}</TableCell>
                <TableCell>{material.lesson.name}</TableCell>
                <TableCell>{material.title}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('material.show', material.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <MaterialFormSheet purpose="edit" material={material}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </MaterialFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <MaterialDeleteDialog material={material}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </MaterialDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default MaterialList;
