import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dateDFY, strLimit } from '@/lib/utils';
import AbsentDeleteDialog from '@/pages/absent/components/absent-delete-dialog';
import AbsentFormSheet from '@/pages/absent/components/absent-form-sheet';
import { SharedData } from '@/types';
import { Absent } from '@/types/absent';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Folder, Plus, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ClassroomLayout from '../layout/classroom-layout';

type Props = {
  absents: Absent[];
};

const ClassroomAbsentsTab: FC<Props> = ({ absents }) => {
  const { permissions } = usePage<SharedData>().props;
  return (
    <ClassroomLayout>
      <HeadingSmall
        title="Daftar ketidakhadiran siswa"
        description="Daftar ketidakhadiran siswa di kelas ini"
        actions={
          <>
            {permissions?.canAdd && (
              <AbsentFormSheet purpose={'create'}>
                <Button>
                  <Plus />
                  Input ketidakhadiran
                </Button>
              </AbsentFormSheet>
            )}
          </>
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Alasan</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {absents.map((absent) => (
            <TableRow key={absent.id}>
              <TableCell>{dateDFY(absent.date)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={absent.student.avatar} />
                  </Avatar>
                  <span>{absent.student.name}</span>
                </div>
              </TableCell>
              <TableCell>{absent.reason}</TableCell>
              <TableCell>{strLimit(absent.description, 40)}</TableCell>
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
    </ClassroomLayout>
  );
};

export default ClassroomAbsentsTab;
