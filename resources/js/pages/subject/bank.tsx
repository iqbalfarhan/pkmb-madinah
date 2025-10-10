import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Subject } from '@/types/subject';
import { Upload } from 'lucide-react';
import { FC, useState } from 'react';
import SubjectBankItem from './components/subject-bank-item';
import SubjectUploadForm from './components/subject-upload-form';

type Props = {
  subjects: Subject[]; // tambahin props lo di sini
};

const SubjectBank: FC<Props> = ({ subjects = [] }) => {
  const [cari, setCari] = useState('');

  return (
    <AppLayout title="Bank materi belajar" description="kumpulan materi pelajaran untuk semua mata pelajaran">
      <div className="flex gap-2">
        <Input placeholder="Search subjects..." value={cari} onChange={(e) => setCari(e.target.value)} />
      </div>
      {subjects
        .filter((subject) => JSON.stringify(subject).toLowerCase().includes(cari.toLowerCase()))
        .map((s) => (
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
              {s.media
                ?.filter((m) => JSON.stringify(m).toLowerCase().includes(cari.toLowerCase()))
                ?.map((m) => (
                  <SubjectBankItem media={m} />
                ))}
            </div>
          </div>
        ))}
    </AppLayout>
  );
};

export default SubjectBank;
