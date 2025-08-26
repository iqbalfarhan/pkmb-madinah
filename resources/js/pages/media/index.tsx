import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Media, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import MediaBulkDeleteDialog from './components/media-bulk-delete-dialog';
import MediaBulkEditSheet from './components/media-bulk-edit-sheet';
import MediaDeleteDialog from './components/media-delete-dialog';
import MediaFilterSheet from './components/media-filter-sheet';
import MediaFormSheet from './components/media-form-sheet';

type Props = {
  media: Media[];
  query: { [key: string]: string };
};

const MediaList: FC<Props> = ({ media, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Medias"
      description="Manage your media"
      actions={
        <>
          {permissions?.canAdd && (
            <MediaFormSheet purpose="create">
              <Button>
                <Plus />
                Create new media
              </Button>
            </MediaFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search media..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <MediaFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </MediaFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <MediaBulkEditSheet mediaIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </MediaBulkEditSheet>
            <MediaBulkDeleteDialog mediaIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </MediaBulkDeleteDialog>
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
                    checked={ids.length === media.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(media.map((media) => media.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {media
            .filter((media) => JSON.stringify(media).toLowerCase().includes(cari.toLowerCase()))
            .map((media) => (
              <TableRow key={media.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(media.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, media.id]);
                          } else {
                            setIds(ids.filter((id) => id !== media.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{media.name}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('media.show', media.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <MediaFormSheet purpose="edit" media={media}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </MediaFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <MediaDeleteDialog media={media}>
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
    </AppLayout>
  );
};

export default MediaList;
