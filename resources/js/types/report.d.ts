import { Academicyear } from './academicyear';
import { Classroom } from './classroom';
import { Student } from './student';

export type ReportType = 'nilai' | 'perkembangan' | 'tahsin' | 'tahfidz';

export type Report = {
  id: number;
  classroom_id: number;
  academic_year_id: number;
  student_id: number;
  report_type: ReportType;
  data: unknown;
  academic_year: Academicyear;
  student: Student;
  classroom: Classroom;
  created_at?: string;
  updated_at?: string;
};

export type PointMark = 'A' | 'B' | 'C';

export type Penilaian = {
  name: string;
  goal: string;
  points: {
    name: string;
    description: string;
    mark: PointMark;
  }[];
};

export type ReportPerkembanganData = {
  tahunajaran: string;
  semester: string;
  nama: string;
  kelas: string;
  usia: string;
  nisn: string;
  curricular_domain: Penilaian[];
  sikap: Record<string, number | null>;
  ekskul: {
    nama: string;
    kegiatan: string;
  }[];
  ketidakhadiran: Record<string, number>;
  komentar_guru: string;
  komentar_wali: string;
  komentar_siswa: string;
  walikelas: string;
};

// batas rapor perkembangan

export type ReportTahfidzData = {
  tahunajaran: string;
  semester: string;
  nama: string;
  kelas: string;
  usia: string;
  nisn: string;
  catatan: string;
  nilai: PenilaianTahfidz[];
  tanggal: string;
  pembimbing: string;
  koordinator: string;
};

export type PenilaianTahfidz = {
  juz: string;
  surah: string;
  pencapaian: string;
  keterangan: string;
};

// batas rapor tahfidz

export type ReportNilaiData = {
  tahunajaran: string;
  semester: string;
  nama: string;
  kelas: string;
  usia: string;
  nisn: string;
  rapor_kenaikan_kelas: boolean;
  naik_kelas: boolean | null;
  ke_kelas: string;
  keputusan: string;
  nilai: {
    name: string;
    type: string; // inti | muatan lokal
    nilai_tugas: number;
    evaluasi: number;
    rata_rata: number;
  }[];
  tanggal: string;
  walikelas: string;
};

// batas rapor nilai

export type ReportTahsinData = {
  name: string;
};

// batas rapor doa
