import { Media } from '.';
import { Lesson } from './lesson';

export type Material = {
  id: number;
  lesson_id: number;
  lesson: Lesson;
  title: string;
  description: string;
  url: string;
  media: Media[];
  created_at?: string;
  updated_at?: string;
};
