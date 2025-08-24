import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      </CardHeader>
      <CardHeader>
        <CardDescription className="line-clamp-3">{material.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default MaterialItemCard;
