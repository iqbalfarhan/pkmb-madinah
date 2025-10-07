import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { numberPad } from '@/lib/utils';
import { Student } from '@/types/student';
import { router } from '@inertiajs/react';
import { FC, useState } from 'react';
import PpdbCompleteForm from './form-partials/ppdb-complete-form';
import PpdbContactForm from './form-partials/ppdb-contact-form';
import PpdbDocumentForm from './form-partials/ppdb-dokument-form';
import PpdbFamilyForm from './form-partials/ppdb-family-form';
import PpdbInformationForm from './form-partials/ppdb-information-form';
import PpdbSchoolForm from './form-partials/ppdb-school-form';

type Props = {
  student: Student;
  query: Record<string, string>;
};

const EditPpdbStudent: FC<Props> = ({ student, query }) => {
  const [tab] = useState(query.tab ?? 'information');

  const moveTo = (v: string) => {
    router.get(
      '',
      { tab: v },
      {
        preserveScroll: true,
        // preserveState: true,
      },
    );
  };

  return (
    <AppLayout
      title="Pendaftaran Siswa Baru"
      description="Form untuk menambah siswa baru"
      actions={
        <>
          <Button variant={'secondary'} disabled>
            Pendaftaran: {`#${numberPad(student.id)}`}
          </Button>
        </>
      }
    >
      <Tabs className="space-y-6" value={tab} onValueChange={moveTo}>
        <div>
          <TabsList>
            <TabsTrigger value="information">Data Siswa</TabsTrigger>
            <TabsTrigger value="contact">Kontak Siswa</TabsTrigger>
            <TabsTrigger value="family">Orang tua</TabsTrigger>
            <TabsTrigger value="prevschool">Sekolah</TabsTrigger>
            <TabsTrigger value="document">Dokumen</TabsTrigger>
            <TabsTrigger value="complete">Selesai</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="information">
          <PpdbInformationForm onSuccess={() => moveTo('contact')} />
        </TabsContent>
        <TabsContent value="contact">
          <PpdbContactForm onSuccess={() => moveTo('family')} />
        </TabsContent>
        <TabsContent value="family">
          <PpdbFamilyForm onSuccess={() => moveTo('prevschool')} />
        </TabsContent>
        <TabsContent value="prevschool">
          <PpdbSchoolForm onSuccess={() => moveTo('document')} />
        </TabsContent>
        <TabsContent value="document">
          <PpdbDocumentForm onSuccess={() => moveTo('complete')} />
        </TabsContent>
        <TabsContent value="complete">
          <PpdbCompleteForm />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default EditPpdbStudent;
