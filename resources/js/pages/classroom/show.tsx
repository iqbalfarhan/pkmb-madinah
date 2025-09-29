import { Absent } from '@/types/absent';
import { Classroom } from '@/types/classroom';
import { FC } from 'react';
import AbsentPieChart from '../absent/components/absent-pie-chart';
import ClassroomLayout from './layout/classroom-layout';
import ClassroomAssignmentWidget from './widgets/classroom-assignment-widget';
import ClassroomEditWdiget from './widgets/classroom-edit-widget';
import ClassroomLessonsWidget from './widgets/classroom-lessons-widget';
import ClassroomStudentWidget from './widgets/classroom-student-widget';

type Props = {
  classroom: Classroom;
};

const ShowClassroom: FC<Props> = ({ classroom }) => {
  return (
    <ClassroomLayout>
      <div className="masonry space-y-6">
        <AbsentPieChart className="break-inside-avoid" absents={classroom.students?.flatMap((e) => e.absents) as Absent[]} />
        <ClassroomStudentWidget className="break-inside-avoid" students={classroom.students} />
        <ClassroomLessonsWidget className="break-inside-avoid" lessons={classroom.lessons} />
        <ClassroomAssignmentWidget className="break-inside-avoid" assignments={classroom.assignments} />
        <ClassroomEditWdiget className="break-inside-avoid" />
      </div>
    </ClassroomLayout>
  );
};

export default ShowClassroom;
