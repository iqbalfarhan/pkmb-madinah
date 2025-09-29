import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Activity } from '@/types/activity';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ActivityBulkDeleteDialog from './components/activity-bulk-delete-dialog';
import ActivityBulkEditSheet from './components/activity-bulk-edit-sheet';
import ActivityDeleteDialog from './components/activity-delete-dialog';
import ActivityFilterSheet from './components/activity-filter-sheet';
import ActivityFormSheet from './components/activity-form-sheet';

type Props = {
  activities: Activity[];
  query: { [key: string]: string };
};

const ActivityList: FC<Props> = ({ activities, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Activitys"
      description="Manage your activities"
      actions={
        <>
          {permissions?.canAdd && (
            <ActivityFormSheet purpose="create">
              <Button>
                <Plus />
                Create new activity
              </Button>
            </ActivityFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input type="search" placeholder="Search activities..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ActivityFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ActivityFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ActivityBulkEditSheet activityIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ActivityBulkEditSheet>
            <ActivityBulkDeleteDialog activityIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ActivityBulkDeleteDialog>
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
                    checked={ids.length === activities.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(activities.map((activity) => activity.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Tahun ajaran</TableHead>
            <TableHead>Student name</TableHead>
            <TableHead>Extracurricular</TableHead>
            <TableHead>Activities</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities
            .filter((activity) => JSON.stringify(activity).toLowerCase().includes(cari.toLowerCase()))
            .map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(activity.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, activity.id]);
                          } else {
                            setIds(ids.filter((id) => id !== activity.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{activity.academic_year.year}</TableCell>
                <TableCell onClick={() => setCari(activity.student.name)}>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={activity.student.avatar} />
                    </Avatar>
                    <span>{activity.student.name}</span>
                  </div>
                </TableCell>
                <TableCell onClick={() => setCari(activity.extracurricular.name)}>{activity.extracurricular.name}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('activity.show', activity.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <ActivityFormSheet purpose="edit" activity={activity}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ActivityFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <ActivityDeleteDialog activity={activity}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ActivityDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ActivityList;
