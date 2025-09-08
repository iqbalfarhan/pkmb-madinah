import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Setting } from '@/types/setting';
import { FC } from 'react';

type Props = {
  setting: Setting;
};

const ShowSetting: FC<Props> = ({ setting }) => {
  return (
    <AppLayout title="Detail Setting" description="Detail setting">
      <Card>
        <CardHeader>
          <CardTitle>{setting.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowSetting;
