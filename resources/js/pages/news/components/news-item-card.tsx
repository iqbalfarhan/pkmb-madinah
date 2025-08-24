import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { News } from '@/types/news';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import NewsDeleteDialog from './news-delete-dialog';
import NewsFormSheet from './news-form-sheet';

type Props = {
  news: News;
};

const NewsItemCard: FC<Props> = ({ news }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{news.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {news.id}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('news.show', news.id)}>
            <Folder />
          </Link>
        </Button>
        <NewsFormSheet purpose="edit" news={news}>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </NewsFormSheet>
        <NewsDeleteDialog news={news}>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </NewsDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default NewsItemCard;
