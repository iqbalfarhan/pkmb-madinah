import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Material } from '@/types/material';
import { usePage } from '@inertiajs/react';
import { Download, Edit } from 'lucide-react';
import { FC } from 'react';
import MaterialFormSheet from './components/material-form-sheet';
import MaterialUploadForm from './components/material-upload-form';

type Props = {
  material: Material;
};

const ShowMaterial: FC<Props> = ({ material }) => {
  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Detail Material"
      description="Detail material"
      actions={
        <>
          <MaterialFormSheet purpose="edit" material={material}>
            <Button>
              <Edit />
              Edit material
            </Button>
          </MaterialFormSheet>
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{material.title}</CardTitle>
          <CardDescription>{material.description}</CardDescription>
        </CardHeader>
      </Card>

      {permissions?.canUpload && (
        <div className="grid space-y-4">
          <HeadingSmall
            title="Materi belajar yang diupload"
            description="Materi belajar yang diupload oleh guru"
            actions={
              <>
                <MaterialUploadForm material={material}>
                  <Button>Upload material</Button>
                </MaterialUploadForm>
              </>
            }
          />
          <div className="grid-responsive grid gap-4">
            {material.media.map((m) => (
              <Card className="aspect-square">
                <CardContent className="flex flex-1 items-center justify-center">
                  <Button variant={'secondary'} asChild>
                    <a href={m.file_name}>
                      <Download />
                      Download
                    </a>
                  </Button>
                </CardContent>
                <CardFooter>
                  <CardDescription>{m.name}</CardDescription>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default ShowMaterial;
