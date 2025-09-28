import WelcomeLayout from './layout/welcome-layout';
import AlurSection from './partials/alur-section';
import HeroSection from './partials/hero-section';
import NewsSection from './partials/news-section';
import PpdbSection from './partials/ppdb-section';
import SyaratSection from './partials/syarat-section';

const index = () => {
  return (
    <WelcomeLayout>
      <HeroSection />
      <PpdbSection />
      <NewsSection />
      <AlurSection />
      <SyaratSection />
    </WelcomeLayout>
  );
};

export default index;
