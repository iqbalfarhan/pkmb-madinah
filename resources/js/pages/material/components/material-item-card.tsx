import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Material } from '@/types/material';
import { router } from '@inertiajs/react';
import { FC } from 'react';

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
    <Card className="flex cursor-pointer flex-col justify-between" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{material.title}</CardTitle>
        <CardDescription className="line-clamp-2">{material.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Badge>{(material.media ?? []).length} file</Badge>
      </CardFooter>
    </Card>
  );
};

export default MaterialItemCard;
