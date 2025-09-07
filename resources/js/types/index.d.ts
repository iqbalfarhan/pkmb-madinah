import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { Academicyear } from './academicyear';
import { Classroom } from './classroom';
import { Lesson } from './lesson';
import { Student } from './student';

export interface Auth {
  user: User;
  roles: string[];
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
  available?: boolean;
  items?: NavItem[];
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  activeAcademicYear: Academicyear;
  permissions?: Record<string, boolean>;
  settings?: Record<string, string>;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  gender: boolean;
  email: string;
  username: string;
  avatar?: string;
  role_lists?: string[];
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  students?: Student[];
  classrooms?: Classroom[];
  lessons?: Lesson[];
  [key: string]: unknown; // This allows for additional properties...
}

export type FormPurpose = 'create' | 'edit' | 'duplicate';

export type Media = {
  id: number;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
};

export type Surah = {
  id: number;
  surah: string;
  ayat: number;
  jenis: string;
  juz: number;
};
