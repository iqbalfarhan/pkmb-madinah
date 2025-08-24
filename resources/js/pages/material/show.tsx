import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Material } from '@/types/material';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import MaterialFormSheet from './components/material-form-sheet';

type Props = {
  material: Material;
};

const ShowMaterial: FC<Props> = ({ material }) => {
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
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowMaterial;
