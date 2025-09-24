import { Assessment } from './assessment';

export type Grade = {
  id: number;
  group: string;
  name: string;
  assessments: Assessment[];
  characters: string[];
  created_at?: string;
  updated_at?: string;
};
