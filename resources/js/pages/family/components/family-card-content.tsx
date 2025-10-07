import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Family } from '@/types/family';
import { FC } from 'react';

type Props = {
  family: Family;
};

const FamilyCardContent: FC<Props> = ({ family }) => {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CardHeader>
        <CardTitle>Ayah</CardTitle>
        <CardDescription>
          {family.father_name} {family.father_ocupation} {family.father_address} {family.father_phone} {family.father_sallary}
        </CardDescription>
      </CardHeader>
      <CardHeader>
        <CardTitle>Ibu</CardTitle>
        <CardDescription>
          {family.mother_name} {family.mother_ocupation} {family.mother_address} {family.mother_phone} {family.mother_sallary}
        </CardDescription>
      </CardHeader>
    </div>
  );
};

export default FamilyCardContent;
