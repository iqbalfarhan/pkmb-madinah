# Manual Book Guru - Sistem Informasi PKBM

## Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Login & Dashboard](#login--dashboard)
3. [Manajemen Kelas](#manajemen-kelas)
4. [Manajemen Mata Pelajaran](#manajemen-mata-pelajaran)
5. [Input Nilai & Penilaian](#input-nilai--penilaian)
6. [Manajemen Tugas](#manajemen-tugas)
7. [Absensi Siswa](#absensi-siswa)
8. [Laporan Akademik](#laporan-akademik)
9. [Komunikasi dengan Siswa](#komunikasi-dengan-siswa)
10. [Tips & Best Practices](#tips--best-practices)

---

## Pengenalan

Sebagai Guru, Anda memiliki akses untuk mengelola aspek akademik dalam sistem PKBM. Manual ini akan memandu Anda dalam menggunakan fitur-fitur yang tersedia untuk guru, termasuk manajemen kelas, input nilai, tugas, dan absensi siswa.

### Hak Akses Guru:

- ✅ Melihat daftar kelas yang diampu
- ✅ Melihat daftar mata pelajaran yang diajar
- ✅ Input dan mengelola nilai siswa
- ✅ Membuat dan mengelola tugas
- ✅ Input absensi siswa
- ✅ Melihat laporan akademik
- ✅ Komunikasi dengan siswa dan wali kelas

### Fitur yang Tidak Dapat Diakses:

- ❌ Manajemen user dan role
- ❌ Konfigurasi sistem
- ❌ Manajemen pembayaran
- ❌ Generate laporan keuangan

---

## Login & Dashboard

### 1. Akses Sistem

1. Buka browser dan akses URL sistem PKBM
2. Masukkan username/email dan password guru
3. Klik tombol "Masuk"

### 2. Dashboard Guru

Dashboard guru menampilkan:

- **Widget Profil**: Informasi guru yang sedang login
- **Widget Waktu**: Tanggal dan waktu real-time
- **Menu Kelas**: Daftar kelas yang diampu sebagai wali kelas
- **Menu Mata Pelajaran**: Daftar mata pelajaran yang diajar
- **Notifikasi**: Pemberitahuan tugas yang perlu dinilai

### 3. Navigasi Khusus Guru

- **Menu Wali Kelas**: Akses cepat ke kelas yang diampu
- **Menu Guru Mapel**: Akses ke mata pelajaran yang diajar
- **Sidebar Menu**: Navigasi ke fitur-fitur akademik

---

## Manajemen Kelas

### 1. Mengakses Kelas sebagai Wali Kelas

#### Melihat Daftar Kelas:

1. Pilih menu "Menu Wali Kelas" di sidebar
2. Pilih kelas yang akan dikelola
3. Dashboard kelas akan menampilkan:
   - **Informasi Kelas**: Nama kelas, tahun ajaran, jumlah siswa
   - **Daftar Siswa**: Siswa-siswa di kelas tersebut
   - **Statistik**: Ringkasan nilai dan absensi

#### Tab-tab dalam Kelas:

- **Overview**: Ringkasan kelas
- **Siswa**: Daftar siswa di kelas
- **Nilai**: Input dan lihat nilai siswa
- **Absensi**: Input dan lihat absensi
- **Tugas**: Tugas yang diberikan ke kelas

### 2. Mengelola Data Siswa di Kelas

#### Melihat Profil Siswa:

1. Pilih tab "Siswa"
2. Klik pada nama siswa
3. Lihat detail:
   - Data pribadi siswa
   - Data keluarga
   - Riwayat nilai
   - Riwayat absensi
   - Data ekstrakurikuler

#### Update Data Siswa (Jika Diperlukan):

1. Buka profil siswa
2. Klik "Edit" jika ada data yang perlu diperbarui
3. Ubah data yang diperlukan
4. Simpan perubahan

### 3. Statistik Kelas

#### Melihat Statistik:

- **Jumlah Siswa**: Total siswa di kelas
- **Rata-rata Nilai**: Rata-rata nilai kelas per mata pelajaran
- **Tingkat Kehadiran**: Persentase kehadiran siswa
- **Siswa Bermasalah**: Siswa dengan nilai rendah atau absensi tinggi

---

## Manajemen Mata Pelajaran

### 1. Mengakses Mata Pelajaran

#### Melihat Daftar Mata Pelajaran:

1. Pilih menu "Menu Guru Mapel" di sidebar
2. Pilih mata pelajaran yang akan dikelola
3. Dashboard mata pelajaran menampilkan:
   - **Informasi Mata Pelajaran**: Nama mata pelajaran
   - **Daftar Kelas**: Kelas yang mengikuti mata pelajaran
   - **Statistik**: Ringkasan nilai per kelas

#### Tab-tab dalam Mata Pelajaran:

- **Overview**: Ringkasan mata pelajaran
- **Kelas**: Daftar kelas yang mengikuti mata pelajaran
- **Nilai**: Input dan lihat nilai siswa
- **Tugas**: Tugas yang diberikan
- **Materi**: Materi pembelajaran

### 2. Mengelola Materi Pembelajaran

#### Menambah Materi:

1. Pilih tab "Materi"
2. Klik "Tambah Materi"
3. Isi data:
   - **Judul**: Judul materi
   - **Deskripsi**: Deskripsi materi
   - **Konten**: Isi materi (support rich text)
   - **File Lampiran**: Upload file pendukung
   - **Kelas**: Kelas yang akan mendapat materi
4. Simpan materi

#### Mengedit Materi:

1. Pilih materi dari daftar
2. Klik "Edit"
3. Ubah konten yang diperlukan
4. Simpan perubahan

---

## Input Nilai & Penilaian

### 1. Input Nilai Siswa

#### Melalui Kelas:

1. Pilih menu "Menu Wali Kelas" → Pilih Kelas
2. Pilih tab "Nilai"
3. Pilih mata pelajaran
4. Input nilai untuk setiap siswa:
   - **Tugas**: Nilai tugas (0-100)
   - **UTS**: Nilai Ujian Tengah Semester (0-100)
   - **UAS**: Nilai Ujian Akhir Semester (0-100)
   - **Kehadiran**: Nilai kehadiran (0-100)
5. Simpan nilai

#### Melalui Mata Pelajaran:

1. Pilih menu "Menu Guru Mapel" → Pilih Mata Pelajaran
2. Pilih tab "Nilai"
3. Pilih kelas
4. Input nilai untuk setiap siswa
5. Simpan nilai

### 2. Komponen Penilaian

#### Sistem Penilaian:

- **Tugas (30%)**: Nilai dari tugas-tugas yang diberikan
- **UTS (30%)**: Nilai Ujian Tengah Semester
- **UAS (30%)**: Nilai Ujian Akhir Semester
- **Kehadiran (10%)**: Nilai berdasarkan tingkat kehadiran

#### Cara Menghitung Nilai Akhir:

```
Nilai Akhir = (Tugas × 0.3) + (UTS × 0.3) + (UAS × 0.3) + (Kehadiran × 0.1)
```

### 3. Mengelola Nilai

#### Edit Nilai:

1. Pilih siswa yang nilainya akan diedit
2. Klik "Edit Nilai"
3. Ubah nilai yang diperlukan
4. Simpan perubahan

#### Bulk Input Nilai:

1. Pilih "Bulk Input" untuk input nilai multiple siswa
2. Pilih komponen penilaian
3. Input nilai untuk setiap siswa
4. Simpan semua nilai sekaligus

### 4. Kategori Nilai

#### Kriteria Penilaian:

- **A (90-100)**: Sangat Baik
- **B (80-89)**: Baik
- **C (70-79)**: Cukup
- **D (60-69)**: Kurang
- **E (0-59)**: Sangat Kurang

---

## Manajemen Tugas

### 1. Membuat Tugas

#### Melalui Kelas:

1. Pilih menu "Menu Wali Kelas" → Pilih Kelas
2. Pilih tab "Tugas"
3. Klik "Tambah Tugas"
4. Isi data:
   - **Judul**: Judul tugas
   - **Deskripsi**: Deskripsi detail tugas
   - **Mata Pelajaran**: Mata pelajaran terkait
   - **Deadline**: Batas waktu pengumpulan
   - **Bobot**: Bobot nilai tugas
   - **File Lampiran**: File pendukung tugas
5. Simpan tugas

#### Melalui Mata Pelajaran:

1. Pilih menu "Menu Guru Mapel" → Pilih Mata Pelajaran
2. Pilih tab "Tugas"
3. Pilih kelas yang akan mendapat tugas
4. Klik "Tambah Tugas"
5. Isi data tugas
6. Simpan tugas

### 2. Mengelola Tugas

#### Melihat Daftar Tugas:

- **Tugas Aktif**: Tugas yang masih dalam deadline
- **Tugas Selesai**: Tugas yang sudah melewati deadline
- **Tugas yang Dinilai**: Tugas yang sudah dinilai

#### Edit Tugas:

1. Pilih tugas dari daftar
2. Klik "Edit"
3. Ubah data yang diperlukan
4. Simpan perubahan

#### Hapus Tugas:

1. Pilih tugas dari daftar
2. Klik "Hapus"
3. Konfirmasi penghapusan

### 3. Penilaian Tugas

#### Melihat Pengumpulan Tugas:

1. Pilih tugas yang akan dinilai
2. Lihat daftar siswa yang mengumpulkan
3. Download file tugas siswa
4. Berikan nilai dan feedback

#### Input Nilai Tugas:

1. Pilih siswa yang tugasnya akan dinilai
2. Input nilai (0-100)
3. Berikan komentar/feedback
4. Simpan penilaian

---

## Absensi Siswa

### 1. Input Absensi Harian

#### Melalui Kelas:

1. Pilih menu "Menu Wali Kelas" → Pilih Kelas
2. Pilih tab "Absensi"
3. Pilih tanggal
4. Tandai status kehadiran setiap siswa:
   - **Hadir (H)**: Siswa hadir
   - **Izin (I)**: Siswa izin dengan keterangan
   - **Sakit (S)**: Siswa sakit dengan surat dokter
   - **Alpa (A)**: Siswa tidak hadir tanpa keterangan
5. Simpan absensi

### 2. Input Absensi Mata Pelajaran

#### Melalui Mata Pelajaran:

1. Pilih menu "Menu Guru Mapel" → Pilih Mata Pelajaran
2. Pilih tab "Absensi"
3. Pilih kelas dan tanggal
4. Input absensi untuk mata pelajaran tersebut
5. Simpan absensi

### 3. Mengelola Absensi

#### Edit Absensi:

1. Pilih tanggal yang akan diedit
2. Klik "Edit Absensi"
3. Ubah status kehadiran siswa
4. Simpan perubahan

#### Bulk Input Absensi:

1. Pilih "Bulk Input" untuk input absensi multiple tanggal
2. Pilih rentang tanggal
3. Input absensi untuk setiap tanggal
4. Simpan semua absensi

### 4. Statistik Absensi

#### Melihat Statistik:

- **Tingkat Kehadiran**: Persentase kehadiran per siswa
- **Siswa dengan Absensi Tinggi**: Siswa yang sering tidak hadir
- **Trend Absensi**: Grafik tingkat kehadiran per bulan

---

## Laporan Akademik

### 1. Laporan Nilai Kelas

#### Generate Laporan Nilai:

1. Pilih menu "Laporan" → "Nilai Kelas"
2. Pilih:
   - **Kelas**: Kelas yang akan dilaporkan
   - **Mata Pelajaran**: Mata pelajaran tertentu atau semua
   - **Semester**: Semester yang akan dilaporkan
3. Klik "Generate Laporan"
4. Download PDF atau Excel

### 2. Laporan Absensi

#### Generate Laporan Absensi:

1. Pilih menu "Laporan" → "Absensi"
2. Set filter:
   - **Periode**: Tanggal mulai dan selesai
   - **Kelas**: Kelas yang akan dilaporkan
   - **Siswa**: Siswa tertentu (opsional)
3. Generate laporan
4. Export ke Excel/PDF

### 3. Laporan Perkembangan Siswa

#### Laporan Individual:

1. Pilih menu "Laporan" → "Perkembangan Siswa"
2. Pilih siswa
3. Pilih periode
4. Generate laporan yang berisi:
   - Grafik perkembangan nilai
   - Statistik absensi
   - Rekomendasi perbaikan

### 4. Rapor Siswa

#### Generate Rapor:

1. Pilih menu "Laporan" → "Rapor"
2. Pilih:
   - **Siswa**: Siswa yang akan diraporkan
   - **Semester**: Semester yang akan diraporkan
3. Klik "Generate Rapor"
4. Download PDF rapor

---

## Komunikasi dengan Siswa

### 1. Notifikasi Tugas

#### Mengirim Notifikasi:

1. Saat membuat tugas baru
2. Sistem otomatis mengirim notifikasi ke siswa
3. Siswa akan mendapat email/pesan tentang tugas baru

### 2. Feedback Tugas

#### Memberikan Feedback:

1. Saat menilai tugas
2. Berikan komentar konstruktif
3. Siswa dapat melihat feedback di dashboard mereka

### 3. Komunikasi dengan Wali Kelas

#### Melaporkan Masalah:

1. Jika ada siswa yang bermasalah
2. Laporkan ke wali kelas melalui sistem
3. Wali kelas akan mendapat notifikasi

---

## Tips & Best Practices

### 1. Input Nilai

- **Input nilai secara berkala**: Jangan menumpuk input nilai
- **Gunakan bulk input**: Untuk efisiensi waktu
- **Validasi data**: Pastikan nilai yang diinput valid
- **Backup data**: Simpan data penting secara berkala

### 2. Manajemen Tugas

- **Beri deadline yang realistis**: Sesuaikan dengan kemampuan siswa
- **Berikan instruksi yang jelas**: Deskripsi tugas harus detail
- **Evaluasi tugas**: Berikan feedback yang konstruktif
- **Arsipkan tugas**: Simpan tugas untuk referensi

### 3. Absensi

- **Input absensi tepat waktu**: Jangan menunda input absensi
- **Verifikasi keterangan**: Pastikan keterangan absensi valid
- **Monitor trend**: Perhatikan pola absensi siswa
- **Komunikasi dengan orang tua**: Jika ada masalah absensi

### 4. Komunikasi

- **Responsif**: Balas pertanyaan siswa dengan cepat
- **Profesional**: Gunakan bahasa yang sopan dan profesional
- **Konstruktif**: Berikan feedback yang membangun
- **Dokumentasi**: Catat komunikasi penting

### 5. Keamanan

- **Logout setelah selesai**: Jangan biarkan akun terbuka
- **Gunakan password yang kuat**: Ganti password secara berkala
- **Jangan share kredensial**: Jaga kerahasiaan akun
- **Backup data**: Simpan data penting

---

## Troubleshooting

### Masalah Umum Guru:

#### 1. Tidak bisa input nilai

- Periksa apakah Anda memiliki akses ke kelas/mata pelajaran
- Pastikan data siswa sudah lengkap
- Clear cache browser

#### 2. Tugas tidak muncul di dashboard siswa

- Periksa apakah tugas sudah dipublish
- Pastikan siswa sudah terdaftar di kelas
- Check notifikasi sistem

#### 3. Absensi tidak tersimpan

- Periksa koneksi internet
- Pastikan tanggal yang dipilih valid
- Refresh halaman dan coba lagi

#### 4. Laporan tidak ter-generate

- Periksa data yang akan dilaporkan
- Pastikan filter yang dipilih valid
- Check permission untuk generate laporan

#### 5. File upload gagal

- Periksa ukuran file (max 2MB)
- Pastikan format file didukung
- Check koneksi internet

### Solusi Cepat:

```bash
# Clear cache browser
Ctrl + F5 (Windows/Linux)
Cmd + Shift + R (Mac)

# Logout dan login ulang
# Refresh halaman
# Check koneksi internet
```

---

## FAQ untuk Guru

### Q: Bagaimana cara mengubah password?

A:

1. Klik profil di pojok kanan atas
2. Pilih "Settings" → "Password"
3. Masukkan password lama dan password baru
4. Simpan perubahan

### Q: Bagaimana cara melihat semua kelas yang saya ajar?

A:

1. Pilih menu "Menu Wali Kelas" untuk kelas yang diampu
2. Pilih menu "Menu Guru Mapel" untuk mata pelajaran yang diajar

### Q: Bagaimana cara input nilai untuk semua siswa sekaligus?

A:

1. Pilih tab "Nilai"
2. Klik "Bulk Input"
3. Pilih komponen penilaian
4. Input nilai untuk setiap siswa
5. Simpan semua nilai

### Q: Bagaimana cara melihat statistik kelas?

A:

1. Pilih kelas dari "Menu Wali Kelas"
2. Lihat widget statistik di dashboard kelas
3. Atau pilih tab "Overview" untuk detail statistik

### Q: Bagaimana cara mengirim notifikasi ke siswa?

A:

- Sistem otomatis mengirim notifikasi saat:
  - Membuat tugas baru
  - Menilai tugas
  - Input nilai baru
  - Ada perubahan jadwal

### Q: Bagaimana cara backup data nilai?

A:

1. Pilih menu "Laporan" → "Nilai Kelas"
2. Generate laporan untuk semua kelas
3. Download dan simpan file laporan

---

**© 2024 Sistem Informasi PKBM - Manual Guru**
