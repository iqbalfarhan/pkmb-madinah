import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { numberPad } from '@/lib/utils';
import { Student } from '@/types/student';
import { FC } from 'react';
import PpdbCompleteForm from './form-partials/ppdb-complete-form';
import PpdbContactForm from './form-partials/ppdb-contact-form';
import PpdbDocumentForm from './form-partials/ppdb-dokument-form';
import PpdbFamilyForm from './form-partials/ppdb-family-form';
import PpdbInformationForm from './form-partials/ppdb-information-form';
import PpdbSchoolForm from './form-partials/ppdb-school-form';

type Props = {
  student: Student;
};

const EditPpdbStudent: FC<Props> = ({ student }) => {
  return (
    <AppLayout
      title="Pendaftaran Siswa Baru"
      description="Form untuk menambah siswa baru"
      actions={
        <>
          <Button variant={'secondary'} disabled>
            Kode pendaftaran: {`#${numberPad(student.id)}`}
          </Button>
        </>
      }
    >
      <PpdbInformationForm />
      <PpdbContactForm />
      <PpdbFamilyForm />
      <PpdbSchoolForm />
      <PpdbDocumentForm />
      <Separator />
      <PpdbCompleteForm />
    </AppLayout>
  );
};

export default EditPpdbStudent;
