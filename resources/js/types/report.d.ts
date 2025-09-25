import { Academicyear } from './academicyear';
import { Classroom } from './classroom';
import { Student } from './student';

export type ReportType = 'nilai' | 'perkembangan' | 'tahsin' | 'tahfidz' | 'doa-hadist';

export type Report = {
  id: number;
  classroom_id: number;
  name: string;
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

export type ReportDataMeta = {
  tahunajaran: string;
  semester: string;
  nama: string;
  kelas: string;
  usia: string;
  nisn: string;
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

export type ReportPerkembanganData = ReportDataMeta & {
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

export type ReportTahfidzData = ReportDataMeta & {
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

export type ReportNilaiData = ReportDataMeta & {
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

export type ReportTahsinData = ReportDataMeta & {
  jilid: string;
  hal: string;
  nilai_kkm: string;
  nilai_rapor: string;
  nilai_rentang: string;
  titik_kuat: string;
  titik_lemah: string;
  koordinator: string;
  komentar_guru: string;
  pembimbing: string;
};

// batas rapor tahsin

export type PenilaianDoaHadist = {
  judul: string;
  pencapaian: string;
  keterangan: string;
};

export type ReportDoaHadistData = ReportDataMeta & {
  koordinator: string;
  pembimbing: string;
  doa: PenilaianDoaHadist[];
  hadist: PenilaianDoaHadist[];
};

// batas rapor doa hadist
