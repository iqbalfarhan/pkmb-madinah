import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Setting } from '@/types/setting';
import { Link } from '@inertiajs/react';
import SettingFormSheet from './setting-form-sheet';
import SettingDeleteDialog from './setting-delete-dialog';

type Props = {
  setting: Setting;
};

const SettingItemCard: FC<Props> = ({ setting }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ setting.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { setting.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('setting.show', setting.id)}>
            <Folder />
          </Link>
        </Button>
        <SettingFormSheet purpose="edit" setting={ setting }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </SettingFormSheet>
        <SettingDeleteDialog setting={ setting }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </SettingDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default SettingItemCard;
