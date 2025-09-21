import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Material } from '@/types/material';
import { router } from '@inertiajs/react';
import { Edit, Upload } from 'lucide-react';
import { FC } from 'react';
import MaterialFormSheet from './material-form-sheet';
import MaterialUploadForm from './material-upload-form';

type Props = {
  material: Material;
  href?: string;
};

const MaterialItemCard: FC<Props> = ({ material, href }) => {
  const handleClick = () => {
    if (href) router.visit(href);
    return router.visit(route('material.show', material.id));
  };

  return (
    <Card className="flex h-fit cursor-pointer flex-col justify-between">
      <CardHeader onClick={handleClick}>
        <CardTitle className="leading-normal">{material.title}</CardTitle>
        <CardDescription className="line-clamp-2">{material.description}</CardDescription>
      </CardHeader>
      <Separator />
      <CardFooter className="justify-between">
        <Badge variant={'outline'}>{(material.media ?? []).length} file</Badge>
        <div className="flex-1" />
        <MaterialFormSheet purpose="edit" material={material}>
          <Button size={'icon'} variant={'secondary'}>
            <Edit />
          </Button>
        </MaterialFormSheet>
        <MaterialUploadForm material={material}>
          <Button size={'icon'} variant={'secondary'}>
            <Upload />
          </Button>
        </MaterialUploadForm>
      </CardFooter>
    </Card>
  );
};

export default MaterialItemCard;
