import { News } from '@/types/news';
import { FC } from 'react';
import NewsItemCard from '../news/components/news-item-card';
import SectionContainer from './layout/section-container';
import WelcomeLayout from './layout/welcome-layout';

type Props = {
  news: News[];
};

const Berita: FC<Props> = ({ news }) => {
  return (
    <WelcomeLayout>
      <SectionContainer title="Berita kegiatan terbaru" description="Kegiatan sekolah">
        <div className="grid grid-cols-3 gap-6">
          {news.map((berita) => (
            <NewsItemCard news={berita} key={berita.id} />
          ))}
        </div>
      </SectionContainer>
    </WelcomeLayout>
  );
};

export default Berita;
