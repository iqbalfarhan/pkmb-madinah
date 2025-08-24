import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Ppdb } from '@/types/ppdb';
import { FC } from 'react';

type Props = {
  ppdb: Ppdb;
};

const ShowPpdb: FC<Props> = ({ ppdb }) => {
  return (
    <AppLayout title="Detail Ppdb" description="Detail ppdb">
      <Card>
        <CardHeader>
          <CardTitle>{ ppdb.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowPpdb;
