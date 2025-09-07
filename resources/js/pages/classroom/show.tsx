import { Absent } from '@/types/absent';
import { Classroom } from '@/types/classroom';
import { FC } from 'react';
import AbsentPieChart from '../absent/components/absent-pie-chart';
import ClassroomLayout from './layout/classroom-layout';
import ClassroomLessonsWidget from './widgets/classroom-lessons-widget';
import ClassroomStudentWidget from './widgets/classroom-student-widget';

type Props = {
  classroom: Classroom;
};

const ShowClassroom: FC<Props> = ({ classroom }) => {
  return (
    <ClassroomLayout>
      <div className="grid-responsive grid gap-4">
        <AbsentPieChart absents={classroom.students?.flatMap((e) => e.absents) as Absent[]} />
        <div>
          <ClassroomStudentWidget students={classroom.students} />
        </div>
        <div>
          <ClassroomLessonsWidget lessons={classroom.lessons} />
        </div>
      </div>
    </ClassroomLayout>
  );
};

export default ShowClassroom;
