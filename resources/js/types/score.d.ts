import { Student } from './student';

export type Score = {
  id: number;
  student_id: number;
  lesson_id: number;
  score: number;
  remark: string;
  student: Student;
  lesson: Lesson;
  created_at?: string;
  updated_at?: string;
};
