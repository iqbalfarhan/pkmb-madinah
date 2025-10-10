import { Media, User } from '.';
import { Absent } from './absent';
import { Activity } from './activity';
import { Classroom } from './classroom';
import { Family } from './family';
import { Grade } from './grade';
import { Prevschool } from './prevschool';

type AddressPart = string | number | null | undefined;

export type Address = {
  jalan: string;
  dusun: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kodepos: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
};

export type Agama = 'islam' | 'kristen' | 'katolik' | 'hindu' | 'budha';

export type Student = {
  id: number;
  nisn: string;
  nis: string;
  name: string;
  gender: boolean;
  status: string;
  address: Address;
  alamat: string;
  grade_id: number;
  classroom_id: number;
  phone: string;
  home_phone: string;
  email: string;
  agama: Agama;
  pob: string;
  dob: string;
  user_id: number;
  grade?: Grade;
  classroom?: Classroom;
  user?: User;
  kelahiran: string;
  umur: number;
  avatar: string;
  family?: Family;
  prevschool?: Prevschool;
  absents?: Absent[];
  activities?: Activity[];
  media?: Media[];
  created_at: string;
  updated_at?: string;
};
