import MarkdownReader from '@/components/markdown-reader';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { News } from '@/types/news';
import { FC } from 'react';
import SectionContainer from './layout/section-container';
import WelcomeLayout from './layout/welcome-layout';

type Props = {
  news: News;
};

const Baca: FC<Props> = ({ news }) => {
  return (
    <WelcomeLayout>
      <SectionContainer title={news.title} description={news.description} className="mx-auto max-w-3xl space-y-10">
        {(news.media ?? []).length > 0 && (
          <Carousel>
            <CarouselContent>
              {news.media.map((m) => (
                <CarouselItem key={m.id}>
                  <img src={m.original_url} className="rounded-lg" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
        <MarkdownReader content={news.content} />
      </SectionContainer>
    </WelcomeLayout>
  );
};

export default Baca;
