import { Student } from './student';

export type Score = {
  id: number;
  student_id: number;
  lesson_id: number;
  assignment_id: number;
  score: number;
  remark: string;
  student: Student;
  lesson: Lesson;
  assignment: Assignment;
  media: Media[];
  rated_score: number;
  created_at: string;
  updated_at?: string;
};
