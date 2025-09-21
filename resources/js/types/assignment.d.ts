import { Lesson } from './lesson';
import { Score } from './score';

export type Assignment = {
  id: number;
  lesson_id: number;
  name: string;
  description: string;
  rate: number;
  uploadable: boolean;
  lesson: Lesson;
  scores: Score[];
  created_at: string;
  updated_at?: string;
};
