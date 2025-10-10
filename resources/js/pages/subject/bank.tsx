import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Subject } from '@/types/subject';
import { Upload } from 'lucide-react';
import { FC } from 'react';

type Props = {
  subjects: Subject[]; // tambahin props lo di sini
};

const SubjectBank: FC<Props> = ({ subjects = [] }) => {
  return (
    <AppLayout>
      {subjects.map((s) => (
        <div>
          <HeadingSmall
            title={s.name}
            description={`${s.media?.length ?? 0} materi yang diupload`}
            actions={
              <>
                <Button>
                  <Upload /> Upload
                </Button>
              </>
            }
          />
          <div className="grid">
            {s.media?.map((m) => (
              <div>{m.original_url}</div>
            ))}
          </div>
        </div>
      ))}
    </AppLayout>
  );
};

export default SubjectBank;
