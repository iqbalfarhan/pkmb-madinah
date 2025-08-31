import { Media, User } from '.';

export type News = {
  id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  user_id: number;
  user: User;
  thumbnail: string;
  media: Media[];
  created_at: string;
  updated_at?: string;
};
