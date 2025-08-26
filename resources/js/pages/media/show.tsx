import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Media } from '@/types';
import { FC } from 'react';

type Props = {
  media: Media;
};

const ShowMedia: FC<Props> = ({ media }) => {
  return (
    <AppLayout title="Detail Media" description="Detail media">
      <Card>
        <CardHeader>
          <CardTitle>{media.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowMedia;
