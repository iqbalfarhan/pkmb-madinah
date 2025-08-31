import WelcomeLayout from './layout/welcome-layout';
import HeroSection from './partials/hero-section';
import NewsSection from './partials/news-section';
import PpdbSection from './partials/ppdb-section';

const index = () => {
  return (
    <WelcomeLayout>
      <HeroSection />
      <PpdbSection />
      <NewsSection />
    </WelcomeLayout>
  );
};

export default index;
