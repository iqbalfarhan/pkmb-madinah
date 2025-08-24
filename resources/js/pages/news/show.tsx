import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { News } from '@/types/news';
import { FC } from 'react';

type Props = {
  news: News;
};

const ShowNews: FC<Props> = ({ news }) => {
  return (
    <AppLayout title="Detail News" description="Detail news">
      <Card>
        <CardHeader>
          <CardTitle>{news.title}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowNews;
