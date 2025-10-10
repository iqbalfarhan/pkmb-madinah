import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Subject } from '@/types/subject';
import { Upload } from 'lucide-react';
import { FC } from 'react';
import SubjectBankItem from './components/subject-bank-item';
import SubjectUploadForm from './components/subject-upload-form';

type Props = {
  subjects: Subject[]; // tambahin props lo di sini
};

const SubjectBank: FC<Props> = ({ subjects = [] }) => {
  return (
    <AppLayout title="Bank materi belajar" description="kumpulan materi pelajaran untuk semua mata pelajaran">
      {subjects.map((s) => (
        <div className="space-y-4">
          <HeadingSmall
            title={s.name}
            description={`${s.media?.length ?? 0} materi yang diupload`}
            actions={
              <SubjectUploadForm subject={s}>
                <Button>
                  <Upload /> Upload
                </Button>
              </SubjectUploadForm>
            }
          />
          <div className="grid-responsive grid gap-4">
            {s.media?.map((m) => (
              <SubjectBankItem media={m} />
            ))}
          </div>
        </div>
      ))}
    </AppLayout>
  );
};

export default SubjectBank;
