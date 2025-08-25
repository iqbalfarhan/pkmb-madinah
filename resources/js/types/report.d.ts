import { Academicyear } from './academicyear';
import { Classroom } from './classroom';
import { Student } from './student';

export type Report = {
  id: number;
  classroom_id: number;
  academic_year_id: number;
  student_id: number;
  report_type: string;
  data: string;
  academic_year: Academicyear;
  student: Student;
  classroom: Classroom;
  created_at?: string;
  updated_at?: string;
};
