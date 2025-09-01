import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { strLimit } from '@/lib/utils';
import MediaDeleteDialog from '@/pages/media/components/media-delete-dialog';
import { Media, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Download, Trash2 } from 'lucide-react';
import { FC } from 'react';

type Props = {
  media: Media[];
};

const StudentMediaTable: FC<Props> = ({ media }) => {
  const { permissions } = usePage<SharedData>().props;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Jenis dokumen</TableHead>
          <TableHead>Nama file</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {media.map((m) => (
          <TableRow key={m.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={m.preview_url} alt={m.name} />
                </Avatar>
                {m.collection_name}
              </div>
            </TableCell>
            <TableCell>{strLimit(m.file_name, 30)}</TableCell>
            <TableCell>
              <Button variant={'ghost'} size={'icon'}>
                <a href={m.original_url}>
                  <Download />
                </a>
              </Button>
              {permissions?.canUpdate && (
                <MediaDeleteDialog media={m}>
                  <Button variant={'ghost'} size={'icon'}>
                    <Trash2 />
                  </Button>
                </MediaDeleteDialog>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentMediaTable;
