import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Media } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import MediaDeleteDialog from './media-delete-dialog';
import MediaFormSheet from './media-form-sheet';

type Props = {
  media: Media;
};

const MediaItemCard: FC<Props> = ({ media }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{media.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {media.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('media.show', media.id)}>
            <Folder />
          </Link>
        </Button>
        <MediaFormSheet purpose="edit" media={media}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </MediaFormSheet>
        <MediaDeleteDialog media={media}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </MediaDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default MediaItemCard;
