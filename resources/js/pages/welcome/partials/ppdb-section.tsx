import PpdbCardWidget from '@/pages/dashboard/widgets/ppdb-card-widget';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import SectionContainer from '../layout/section-container';

const PpdbSection = () => {
  const { settings } = usePage<SharedData>().props;

  if (settings?.PPDB_OPEN !== 'true') {
    return null;
  }

  return (
    <SectionContainer title="Daftar sekarang" description="Saat ini Sesi pendaftaran siswa sedang dibuka. ayo daftar sekarang">
      <PpdbCardWidget />
    </SectionContainer>
  );
};

export default PpdbSection;
