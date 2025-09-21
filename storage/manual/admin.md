# Manual Book Admin - Sistem Informasi PKBM

## Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Login & Dashboard](#login--dashboard)
3. [Manajemen User & Role](#manajemen-user--role)
4. [Manajemen Data Master](#manajemen-data-master)
5. [Sistem PPDB](#sistem-ppdb)
6. [Manajemen Pembayaran](#manajemen-pembayaran)
7. [Manajemen Akademik](#manajemen-akademik)
8. [Laporan & Dokumentasi](#laporan--dokumentasi)
9. [Berita & Informasi](#berita--informasi)
10. [Pengaturan Sistem](#pengaturan-sistem)
11. [Troubleshooting](#troubleshooting)

---

## Pengenalan

Sebagai Admin, Anda memiliki akses penuh ke semua fitur dalam sistem PKBM. Manual ini akan memandu Anda dalam mengelola seluruh aspek operasional PKBM, mulai dari manajemen user, data master, hingga laporan keuangan dan akademik.

### Hak Akses Admin:

- ✅ Manajemen semua user dan role
- ✅ Konfigurasi data master
- ✅ Pengaturan sistem PPDB
- ✅ Manajemen pembayaran dan tagihan
- ✅ Konfigurasi akademik
- ✅ Generate semua jenis laporan
- ✅ Manajemen berita dan informasi
- ✅ Pengaturan sistem

---

## Login & Dashboard

### 1. Akses Sistem

1. Buka browser dan akses URL sistem PKBM
2. Masukkan username/email dan password admin
3. Klik tombol "Masuk"

### 2. Dashboard Admin

Dashboard admin menampilkan:

- **Widget Profil**: Informasi admin yang sedang login
- **Widget Waktu**: Tanggal dan waktu real-time
- **Widget Tagihan**: Ringkasan status tagihan semua siswa
- **Widget Pembayaran**: Jumlah pembayaran yang belum diverifikasi
- **Widget PPDB**: Statistik pendaftaran siswa baru
- **Grid Siswa Draft**: Daftar siswa dengan status draft yang perlu ditindaklanjuti

### 3. Navigasi

- Gunakan **sidebar menu** untuk navigasi antar fitur
- **Breadcrumb** menunjukkan posisi Anda saat ini
- **Search bar** untuk pencarian cepat data

---

## Manajemen User & Role

### 1. Mengelola User

#### Menambah User Baru:

1. Pilih menu "Data Master" → "User"
2. Klik tombol "Tambah User"
3. Isi form:
   - **Nama**: Nama lengkap user
   - **Email**: Email yang valid
   - **Username**: Username unik
   - **Phone**: Nomor telepon
   - **Gender**: Jenis kelamin
   - **Password**: Password sementara
4. Klik "Simpan"

#### Mengedit User:

1. Pilih user dari daftar
2. Klik tombol "Edit"
3. Ubah data yang diperlukan
4. Klik "Update"

#### Menghapus User:

1. Pilih user dari daftar
2. Klik tombol "Hapus"
3. Konfirmasi penghapusan

### 2. Mengelola Role & Permission

#### Menambah Role Baru:

1. Pilih menu "Data Master" → "Role"
2. Klik "Tambah Role"
3. Isi nama role dan deskripsi
4. Assign permissions yang sesuai
5. Simpan role

#### Mengassign Role ke User:

1. Edit user yang akan diassign role
2. Pilih role dari dropdown
3. Simpan perubahan

### 3. Permission System

Sistem menggunakan permission-based access control:

- **Super Admin**: Akses penuh
- **Admin**: Manajemen data dan laporan
- **Guru**: Input nilai dan tugas
- **Wali Kelas**: Manajemen siswa di kelas
- **Siswa**: Melihat data pribadi
- **Orang Tua**: Melihat data anak

---

## Manajemen Data Master

### 1. Manajemen Siswa

#### Menambah Siswa Baru:

1. Pilih menu "Data Master" → "Siswa"
2. Klik "Tambah Siswa"
3. Isi data pribadi:
   - **NISN**: Nomor Induk Siswa Nasional
   - **NIS**: Nomor Induk Siswa
   - **Nama**: Nama lengkap siswa
   - **Gender**: Jenis kelamin
   - **Alamat**: Alamat lengkap
   - **Phone**: Nomor telepon
   - **Email**: Email siswa
   - **Tempat Lahir**: Tempat lahir
   - **Tanggal Lahir**: Tanggal lahir
   - **Grade**: Tingkat pendidikan
   - **Classroom**: Kelas
   - **User**: Akun user terkait
4. Upload foto profil (opsional)
5. Klik "Simpan"

#### Mengelola Status Siswa:

- **Draft**: Data belum lengkap
- **PPDB**: Sedang dalam proses pendaftaran
- **Aktif**: Siswa aktif belajar
- **Dikeluarkan**: Siswa dikeluarkan
- **Lulus**: Siswa telah lulus
- **Pindah**: Siswa pindah sekolah

#### Bulk Operations:

- **Bulk Edit**: Edit multiple siswa sekaligus
- **Bulk Delete**: Hapus multiple siswa
- **Export Data**: Export data siswa ke Excel/CSV

### 2. Manajemen Kelas

#### Menambah Kelas:

1. Pilih menu "Data Master" → "Kelas"
2. Klik "Tambah Kelas"
3. Isi data:
   - **Nama**: Nama kelas (contoh: "X IPA 1")
   - **Academic Year**: Tahun ajaran
   - **User**: Wali kelas
   - **Grade**: Tingkat pendidikan
4. Simpan data

#### Mengelola Wali Kelas:

1. Edit kelas yang akan diubah wali kelasnya
2. Pilih guru dari dropdown "User"
3. Simpan perubahan

### 3. Manajemen Mata Pelajaran

#### Menambah Mata Pelajaran:

1. Pilih menu "Data Master" → "Mata Pelajaran"
2. Klik "Tambah Mata Pelajaran"
3. Isi nama mata pelajaran
4. Simpan data

### 4. Manajemen Guru

#### Menambah Guru:

1. Pilih menu "Data Master" → "Guru"
2. Klik "Tambah Guru"
3. Isi data pribadi guru
4. Assign mata pelajaran yang diampu
5. Simpan data

### 5. Manajemen Grade/Tingkat

#### Menambah Grade:

1. Pilih menu "Data Master" → "Grade"
2. Klik "Tambah Grade"
3. Isi nama grade (contoh: "Kelas 10", "Kelas 11")
4. Simpan data

---

## Sistem PPDB

### 1. Pengaturan PPDB

#### Konfigurasi Periode:

1. Pilih menu "Pengaturan PPDB"
2. Klik "Pengaturan PPDB"
3. Set:
   - **Periode Pendaftaran**: Tanggal mulai dan selesai
   - **Status PPDB**: Aktif/Nonaktif
   - **Persyaratan**: Dokumen yang diperlukan
   - **Biaya Pendaftaran**: Jumlah biaya pendaftaran
4. Simpan pengaturan

#### Mengelola Form Pendaftaran:

1. Akses menu "PPDB" → "Form Pendaftaran"
2. Konfigurasi field yang akan ditampilkan
3. Set field wajib dan opsional
4. Preview form pendaftaran

### 2. Proses Validasi Pendaftaran

#### Melihat Pendaftaran Baru:

1. Pilih menu "PPDB" → "Daftar Pendaftar"
2. Lihat daftar calon siswa yang mendaftar
3. Klik pada nama untuk melihat detail

#### Validasi Data:

1. Buka detail pendaftar
2. Periksa kelengkapan dokumen
3. Verifikasi data pribadi dan keluarga
4. Update status:
   - **Diterima**: Calon siswa diterima
   - **Ditolak**: Calon siswa ditolak
   - **Pending**: Menunggu dokumen tambahan

#### Generate Akun Siswa:

1. Untuk pendaftar yang diterima
2. Klik "Generate Akun"
3. Sistem akan membuat akun user untuk siswa
4. Kirim kredensial login ke email siswa

---

## Manajemen Pembayaran

### 1. Jenis Pembayaran

#### Menambah Jenis Pembayaran:

1. Pilih menu "Tagihan & Pembayaran" → "Jenis Pembayaran"
2. Klik "Tambah Jenis Pembayaran"
3. Isi data:
   - **Nama**: Nama jenis pembayaran (contoh: "SPP", "Uang Gedung")
   - **Default Amount**: Jumlah default
   - **Billing Cycle**: Siklus pembayaran (bulanan, semesteran, tahunan)
4. Simpan data

#### Mengedit Jenis Pembayaran:

1. Pilih jenis pembayaran dari daftar
2. Klik "Edit"
3. Ubah data yang diperlukan
4. Simpan perubahan

### 2. Tagihan Siswa

#### Generate Tagihan Manual:

1. Pilih menu "Tagihan & Pembayaran" → "Tagihan Siswa"
2. Klik "Generate Tagihan"
3. Pilih:
   - **Siswa**: Siswa yang akan ditagih
   - **Jenis Pembayaran**: Jenis tagihan
   - **Jumlah**: Jumlah tagihan
   - **Tanggal Jatuh Tempo**: Batas waktu pembayaran
   - **Deskripsi**: Keterangan tagihan
4. Klik "Generate"

#### Generate Tagihan Bulk:

1. Pilih menu "Tagihan & Pembayaran" → "Tagihan Siswa"
2. Klik "Generate Bulk"
3. Pilih:
   - **Kelas**: Kelas yang akan ditagih
   - **Jenis Pembayaran**: Jenis tagihan
   - **Jumlah**: Jumlah tagihan
   - **Tanggal Jatuh Tempo**: Batas waktu pembayaran
4. Klik "Generate All"

#### Mengelola Status Tagihan:

- **Unpaid**: Belum dibayar
- **Partial**: Dibayar sebagian
- **Paid**: Sudah dibayar penuh

### 3. Validasi Pembayaran

#### Melihat Pembayaran Baru:

1. Pilih menu "Tagihan & Pembayaran" → "Validasi Pembayaran"
2. Lihat daftar pembayaran yang belum diverifikasi
3. Klik pada pembayaran untuk melihat detail

#### Verifikasi Pembayaran:

1. Buka detail pembayaran
2. Periksa bukti pembayaran
3. Verifikasi jumlah pembayaran
4. Klik "Verifikasi" jika sesuai
5. Atau "Tolak" jika tidak sesuai

#### Mengelola Status Pembayaran:

- **Unverified**: Belum diverifikasi
- **Verified**: Sudah diverifikasi
- **Rejected**: Ditolak

---

## Manajemen Akademik

### 1. Tahun Ajaran

#### Menambah Tahun Ajaran:

1. Pilih menu "Tahun Ajaran"
2. Klik "Tambah Tahun Ajaran"
3. Isi:
   - **Label**: Nama tahun ajaran (contoh: "2024/2025")
   - **Start Date**: Tanggal mulai
   - **End Date**: Tanggal selesai
4. Simpan data

#### Mengaktifkan Tahun Ajaran:

1. Pilih tahun ajaran yang akan diaktifkan
2. Klik "Set Active"
3. Konfirmasi aktivasi

### 2. Manajemen Kelas

#### Mengatur Kelas per Tahun Ajaran:

1. Pilih menu "Data Master" → "Kelas"
2. Filter berdasarkan tahun ajaran aktif
3. Kelas akan otomatis ter-assign ke tahun ajaran aktif

### 3. Manajemen Tugas & Penilaian

#### Mengelola Tugas:

1. Pilih menu "Tugas" atau akses melalui kelas
2. Klik "Tambah Tugas"
3. Isi data:
   - **Judul**: Judul tugas
   - **Deskripsi**: Deskripsi tugas
   - **Deadline**: Batas waktu pengumpulan
   - **Kelas**: Kelas yang mendapat tugas
   - **Mata Pelajaran**: Mata pelajaran terkait
4. Simpan tugas

#### Input Nilai:

1. Pilih menu "Nilai" atau akses melalui kelas
2. Pilih siswa dan mata pelajaran
3. Input nilai sesuai komponen:
   - **Tugas**: Nilai tugas
   - **UTS**: Nilai Ujian Tengah Semester
   - **UAS**: Nilai Ujian Akhir Semester
   - **Kehadiran**: Nilai kehadiran
4. Simpan nilai

### 4. Manajemen Absensi

#### Input Absensi:

1. Pilih menu "Absensi" atau akses melalui kelas
2. Pilih tanggal dan kelas
3. Tandai status kehadiran siswa:
   - **Hadir**: Siswa hadir
   - **Izin**: Siswa izin
   - **Sakit**: Siswa sakit
   - **Alpa**: Siswa tidak hadir tanpa keterangan
4. Simpan absensi

---

## Laporan & Dokumentasi

### 1. Laporan Siswa

#### Rapor Siswa:

1. Pilih menu "Laporan" → "Rapor"
2. Pilih:
   - **Siswa**: Siswa yang akan diraporkan
   - **Semester**: Semester yang akan diraporkan
   - **Tahun Ajaran**: Tahun ajaran
3. Klik "Generate Rapor"
4. Download PDF rapor

#### Laporan Absensi:

1. Pilih menu "Laporan" → "Absensi"
2. Set filter:
   - **Periode**: Tanggal mulai dan selesai
   - **Kelas**: Kelas yang akan dilaporkan
   - **Siswa**: Siswa tertentu (opsional)
3. Generate laporan
4. Export ke Excel/PDF

### 2. Laporan Keuangan

#### Laporan Pembayaran:

1. Pilih menu "Laporan" → "Pembayaran"
2. Set filter:
   - **Periode**: Tanggal mulai dan selesai
   - **Jenis Pembayaran**: Jenis pembayaran
   - **Status**: Status pembayaran
3. Generate laporan
4. Export ke Excel/PDF

#### Laporan Tagihan:

1. Pilih menu "Laporan" → "Tagihan"
2. Set filter:
   - **Periode**: Tanggal mulai dan selesai
   - **Status**: Status tagihan
   - **Kelas**: Kelas tertentu
3. Generate laporan
4. Export ke Excel/PDF

### 3. Laporan PPDB

#### Statistik Pendaftaran:

1. Pilih menu "Laporan" → "PPDB"
2. Lihat statistik:
   - Jumlah pendaftar
   - Jumlah yang diterima
   - Jumlah yang ditolak
   - Persentase penerimaan
3. Export data ke Excel

---

## Berita & Informasi

### 1. Manajemen Berita

#### Menambah Berita:

1. Pilih menu "Berita Sekolah"
2. Klik "Tambah Berita"
3. Isi data:
   - **Judul**: Judul berita
   - **Konten**: Isi berita (support rich text)
   - **Kategori**: Kategori berita
   - **Status**: Draft/Published
   - **Featured Image**: Gambar utama
4. Simpan berita

#### Mengedit Berita:

1. Pilih berita dari daftar
2. Klik "Edit"
3. Ubah konten yang diperlukan
4. Simpan perubahan

#### Mengelola Kategori Berita:

1. Pilih menu "Berita Sekolah" → "Kategori"
2. Tambah/edit kategori berita
3. Kategori membantu pengelompokan berita

### 2. Media Management

#### Upload Media:

1. Pilih menu "Media"
2. Klik "Upload Media"
3. Pilih file gambar/dokumen
4. Set metadata (judul, deskripsi)
5. Upload file

#### Mengelola Media:

- **Preview**: Lihat preview media
- **Edit**: Edit metadata media
- **Delete**: Hapus media
- **Download**: Download file media

---

## Pengaturan Sistem

### 1. Pengaturan Umum

#### Konfigurasi Aplikasi:

1. Pilih menu "Pengaturan"
2. Konfigurasi:
   - **Nama Sekolah**: Nama PKBM
   - **Alamat**: Alamat lengkap
   - **Telepon**: Nomor telepon
   - **Email**: Email resmi
   - **Logo**: Logo sekolah
3. Simpan pengaturan

### 2. Pengaturan Email

#### Konfigurasi SMTP:

1. Pilih menu "Pengaturan" → "Email"
2. Konfigurasi:
   - **Mail Driver**: SMTP
   - **Host**: smtp.gmail.com
   - **Port**: 587
   - **Username**: Email pengirim
   - **Password**: Password aplikasi
   - **Encryption**: TLS
3. Test koneksi email
4. Simpan konfigurasi

### 3. Backup & Restore

#### Backup Database:

1. Pilih menu "Pengaturan" → "Backup"
2. Klik "Backup Database"
3. Download file backup
4. Simpan di lokasi aman

#### Restore Database:

1. Pilih menu "Pengaturan" → "Restore"
2. Upload file backup
3. Konfirmasi restore
4. Tunggu proses selesai

---

## Troubleshooting

### Masalah Umum Admin:

#### 1. Tidak bisa login

- Periksa username/email dan password
- Pastikan akun tidak terkunci
- Reset password jika diperlukan

#### 2. Error saat generate laporan

- Periksa data yang akan dilaporkan
- Pastikan filter yang dipilih valid
- Clear cache browser

#### 3. Upload file gagal

- Periksa ukuran file (max 2MB)
- Pastikan format file didukung
- Check permission folder storage

#### 4. Email tidak terkirim

- Periksa konfigurasi SMTP
- Test koneksi email
- Periksa log email

#### 5. Data tidak tersimpan

- Periksa koneksi database
- Pastikan form diisi lengkap
- Check validation rules

### Log Files untuk Admin:

- **Laravel Log**: `storage/logs/laravel.log`
- **Error Log**: `storage/logs/error.log`
- **Access Log**: `storage/logs/access.log`

### Command Line untuk Admin:

```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Backup database
php artisan backup:run

# Generate report
php artisan report:generate

# Reset password user
php artisan user:reset-password
```

---

## Tips & Best Practices

### 1. Keamanan

- Gunakan password yang kuat
- Logout setelah selesai bekerja
- Jangan share kredensial login
- Backup data secara berkala

### 2. Manajemen Data

- Validasi data sebelum menyimpan
- Gunakan bulk operations untuk efisiensi
- Archive data lama secara berkala
- Monitor penggunaan storage

### 3. Komunikasi

- Gunakan sistem notifikasi internal
- Update berita secara berkala
- Responsif terhadap pertanyaan user
- Dokumentasikan prosedur penting

### 4. Monitoring

- Monitor aktivitas user
- Check log error secara berkala
- Monitor performa sistem
- Update sistem secara berkala

---

**© 2024 Sistem Informasi PKBM - Manual Admin**
