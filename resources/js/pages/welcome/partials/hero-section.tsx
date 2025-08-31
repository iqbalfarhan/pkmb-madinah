import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import SectionContainer from '../layout/section-container';

const HeroSection = () => {
  const { settings, activeAcademicYear } = usePage<SharedData>().props;

  return (
    <SectionContainer>
      <div className="mx-auto w-full space-y-8 py-16 text-center md:px-24">
        <h3 className="text-lg">Selamat datang di:</h3>
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-primary uppercase">WEBSITE PENERIMAAN PESERTA DIDIK BARU {settings?.SCHOOL_NAME}</h1>
        </div>
        <p className="px-4 text-lg">
          Situs ini dipersiapkan sebagai pusat informasi dan pengolahan data siswa peserta PPDB {settings?.SCHOOL_NAME} Tahun ajaran{' '}
          {activeAcademicYear?.label} secara online dan realtime. Sistem ini akan membantu anda dalam melakukan pendaftaran secara online.
        </p>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
