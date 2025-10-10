import { Media } from '.';

export type Subject = {
  id: number;
  group: string;
  name: string;
  media?: Media[];
  created_at?: string;
  updated_at?: string;
};
