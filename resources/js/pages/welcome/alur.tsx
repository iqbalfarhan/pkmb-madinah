import PpdbCardWidget from '../dashboard/widgets/ppdb-card-widget';
import SectionContainer from './layout/section-container';
import WelcomeLayout from './layout/welcome-layout';
import AlurSection from './partials/alur-section';
import SyaratSection from './partials/syarat-section';

const Alur = () => {
  return (
    <WelcomeLayout>
      <AlurSection />
      <SyaratSection />
      <SectionContainer>
        <PpdbCardWidget />
      </SectionContainer>
    </WelcomeLayout>
  );
};

export default Alur;
