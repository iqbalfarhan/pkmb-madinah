import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { News } from '@/types/news';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { FC } from 'react';

type Props = {
  news: News;
  href?: string;
};

const NewsItemCard: FC<Props> = ({ news, href }) => {
  return (
    <Card onClick={() => router.visit(href ?? route('baca', news.slug))}>
      <CardContent className="space-y-1.5 text-center">
        <CardTitle className="leading-normal">{news.title}</CardTitle>
        <CardDescription className="uppercase">
          {dayjs(news.created_at).format('YYYY.MMM.DD')} - {news.user.name}
        </CardDescription>
      </CardContent>
      <CardContent>
        <Avatar className="aspect-square size-full rounded-lg">
          <AvatarImage src={news.thumbnail} className="object-cover opacity-50" />
        </Avatar>
      </CardContent>
    </Card>
  );
};

export default NewsItemCard;
