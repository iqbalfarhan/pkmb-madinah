import { Academicyear } from './academicyear';
import { Student } from './student';

export type Absent = {
  id: number;
  date: string;
  student_id: number;
  student?: Student;
  academic_year_id: number;
  academic_year: Academicyear;
  reason: string;
  description: string;
  created_at?: string;
  updated_at?: string;
};
