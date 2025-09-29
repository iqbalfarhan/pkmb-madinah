import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ActivityDeleteDialog from '@/pages/activity/components/activity-delete-dialog';
import ActivityFormSheet from '@/pages/activity/components/activity-form-sheet';
import { SharedData } from '@/types';
import { Activity } from '@/types/activity';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ClassroomLayout from '../layout/classroom-layout';

type Props = {
  activities: Activity[];
};

const ActivityList: FC<Props> = ({ activities }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <ClassroomLayout>
      <HeadingSmall
        title="Kegiatan ekskul siswa"
        description="Manage your activities"
        actions={
          <>
            <div>
              <Input placeholder="Search activities..." value={cari} onChange={(e) => setCari(e.target.value)} />
            </div>
            {permissions?.canActivityAdd && (
              <ActivityFormSheet purpose="create">
                <Button>
                  <Plus />
                  Create new activity
                </Button>
              </ActivityFormSheet>
            )}
          </>
        }
      />
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
                <TableCell>{activity.student.name}</TableCell>
                <TableCell>{activity.extracurricular.name}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell>
                  {permissions?.canActivityShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('activity.show', activity.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canActivityUpdate && (
                    <ActivityFormSheet purpose="edit" activity={activity}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ActivityFormSheet>
                  )}
                  {permissions?.canActivityDelete && (
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
    </ClassroomLayout>
  );
};

export default ActivityList;
