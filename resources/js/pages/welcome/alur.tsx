import WelcomeLayout from './layout/welcome-layout';
import AlurSection from './partials/alur-section';
import PpdbSection from './partials/ppdb-section';
import SyaratSection from './partials/syarat-section';

const Alur = () => {
  return (
    <WelcomeLayout>
      <AlurSection />
      <SyaratSection />
      <PpdbSection />
    </WelcomeLayout>
  );
};

export default Alur;
