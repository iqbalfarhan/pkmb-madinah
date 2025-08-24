import { User } from '.';

export type News = {
  id: number;
  title: string;
  slug: string;
  content: string;
  user_id: number;
  user: User;
  created_at: string;
  updated_at?: string;
};
