import DDump from '@/components/d-dump';
import { Classroom } from '@/types/classroom';
import { FC } from 'react';
import ClassroomLayout from './layout/classroom-layout';

type Props = {
  classroom: Classroom;
};

const ShowClassroom: FC<Props> = ({ classroom }) => {
  return (
    <ClassroomLayout>
      <DDump content={classroom} />
    </ClassroomLayout>
  );
};

export default ShowClassroom;
