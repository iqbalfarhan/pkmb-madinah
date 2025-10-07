import BackButton from '@/components/back-button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Activity } from '@/types/activity';
import { Extracurricular } from '@/types/extracurricular';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Folder, Plus, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ActivityDeleteDialog from '../activity/components/activity-delete-dialog';
import ActivityFormSheet from '../activity/components/activity-form-sheet';

type Props = {
  extracurricular: Extracurricular;
  activities: Activity[];
};

const ShowExtracurricular: FC<Props> = ({ extracurricular, activities = [] }) => {
  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title={`Ekskul ${extracurricular.name}`}
      description="Peserta dan kegiatan ekskul"
      actions={
        <>
          <BackButton />
          {permissions?.canAdd && (
            <ActivityFormSheet purpose="create">
              <Button>
                <Plus />
                Tambah kegiatan peserta
              </Button>
            </ActivityFormSheet>
          )}
        </>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tahun ajaran</TableHead>
            <TableHead>Student name</TableHead>
            <TableHead>Extracurricular</TableHead>
            <TableHead>Activities</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.academic_year.year}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={activity.student.avatar} />
                  </Avatar>
                  <span>{activity.student.name}</span>
                </div>
              </TableCell>
              <TableCell>{extracurricular.name}</TableCell>
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

export default ShowExtracurricular;
