import { Lesson } from './lesson';
import { Score } from './score';

export type AssignmentType = 'jurnal' | 'prakarya';

export type Assignment = {
  id: number;
  lesson_id: number;
  name: string;
  description: string;
  rate: number;
  uploadable: boolean;
  type: AssignmentType;
  lesson: Lesson;
  scores: Score[];
  created_at: string;
  updated_at?: string;
};
