import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Setting } from '@/types/setting';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import SettingBulkDeleteDialog from './components/setting-bulk-delete-dialog';
import SettingBulkEditSheet from './components/setting-bulk-edit-sheet';
import SettingDeleteDialog from './components/setting-delete-dialog';
import SettingFilterSheet from './components/setting-filter-sheet';
import SettingFormSheet from './components/setting-form-sheet';

type Props = {
  settings: Setting[];
  query: { [key: string]: string };
};

const SettingList: FC<Props> = ({ settings, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Settings"
      description="Manage your settings"
      actions={
        <>
          {permissions?.canAdd && (
            <SettingFormSheet purpose="create">
              <Button>
                <Plus />
                Create new setting
              </Button>
            </SettingFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search settings..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <SettingFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </SettingFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <SettingBulkEditSheet settingIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </SettingBulkEditSheet>
            <SettingBulkDeleteDialog settingIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </SettingBulkDeleteDialog>
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
                    checked={ids.length === settings.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(settings.map((setting) => setting.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Setting name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settings
            .filter((setting) => JSON.stringify(setting).toLowerCase().includes(cari.toLowerCase()))
            .map((setting) => (
              <TableRow key={setting.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(setting.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, setting.id]);
                          } else {
                            setIds(ids.filter((id) => id !== setting.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{setting.key}</TableCell>
                <TableCell>{setting.value}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('setting.show', setting.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <SettingFormSheet purpose="edit" setting={setting}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </SettingFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <SettingDeleteDialog setting={setting}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </SettingDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default SettingList;
