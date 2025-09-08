import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from '@/types/activity';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ActivityDeleteDialog from './activity-delete-dialog';
import ActivityFormSheet from './activity-form-sheet';

type Props = {
  activity: Activity;
};

const ActivityItemCard: FC<Props> = ({ activity }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{activity.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {activity.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('activity.show', activity.id)}>
            <Folder />
          </Link>
        </Button>
        <ActivityFormSheet purpose="edit" activity={activity}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ActivityFormSheet>
        <ActivityDeleteDialog activity={activity}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ActivityDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ActivityItemCard;
