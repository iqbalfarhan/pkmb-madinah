import PpdbCardWidget from '@/pages/dashboard/widgets/ppdb-card-widget';
import SectionContainer from '../layout/section-container';

const PpdbSection = () => {
  return (
    <SectionContainer title="Daftar sekarang" description="Saat ini Sesi pendaftaran siswa sedang dibuka. ayo daftar sekarang">
      <PpdbCardWidget />
    </SectionContainer>
  );
};

export default PpdbSection;
