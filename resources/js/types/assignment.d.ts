import { Lesson } from './lesson';

export type Assignment = {
  id: number;
  lesson_id: number;
  name: string;
  description: string;
  rate: number;
  lesson: Lesson;
  created_at?: string;
  updated_at?: string;
};
