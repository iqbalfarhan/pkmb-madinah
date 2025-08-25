import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Family } from '@/types/family';
import { FC } from 'react';

type Props = {
  family: Family;
};

const FamilyCardContent: FC<Props> = ({ family }) => {
  return (
    <CardContent>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ayah</CardTitle>
            <CardDescription>
              {family.father_name} {family.father_ocupation} {family.father_address} {family.father_phone} {family.father_sallary}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ibu</CardTitle>
            <CardDescription>
              {family.mother_name} {family.mother_ocupation} {family.mother_address} {family.mother_phone} {family.mother_sallary}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </CardContent>
  );
};

export default FamilyCardContent;
