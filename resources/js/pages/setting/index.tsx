import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Setting } from '@/types/setting';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Folder, Plus, Trash2 } from 'lucide-react';
import { FC } from 'react';
import SettingDeleteDialog from './components/setting-delete-dialog';
import SettingFormSheet from './components/setting-form-sheet';

type Props = {
  settings: Setting[];
};

const SettingList: FC<Props> = ({ settings }) => {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Setting name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settings.map((setting) => (
            <TableRow key={setting.id}>
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
