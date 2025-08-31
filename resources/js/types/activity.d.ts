import { Academicyear } from './academicyear';
import { Extracurricular } from './extracurricular';
import { Student } from './student';

export type Activity = {
  id: number;
  extracurricular_id: number;
  student_id: number;
  academic_year_id: number;
  extracurricular: Extracurricular;
  student: Student;
  academic_year: Academicyear;
  description: string;
  created_at?: string;
  updated_at?: string;
};
