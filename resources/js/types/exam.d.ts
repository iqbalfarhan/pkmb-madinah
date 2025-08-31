import { Academicyear } from './academicyear';
import { Classroom } from './classroom';
import { Lesson } from './lesson';

export type Exam = {
  id: number;
  lesson_id: number;
  lesson: Lesson;
  name: string;
  description: string;
  academic_year_id: number;
  academic_year: Academicyear;
  classroom_id: number;
  classroom: Classroom;
  created_at?: string;
  updated_at?: string;
};
