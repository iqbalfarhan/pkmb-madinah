# Manual Book - Sistem Informasi PKBM (Pusat Kegiatan Belajar Masyarakat)

## Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Persyaratan Sistem](#persyaratan-sistem)
3. [Instalasi](#instalasi)
4. [Konfigurasi](#konfigurasi)
5. [Struktur Aplikasi](#struktur-aplikasi)
6. [Fitur Utama](#fitur-utama)
7. [Panduan Penggunaan](#panduan-penggunaan)
8. [Manajemen User & Role](#manajemen-user--role)
9. [Troubleshooting](#troubleshooting)
10. [FAQ](#faq)

---

## Pengenalan

Sistem Informasi PKBM adalah aplikasi web yang dirancang khusus untuk mengelola Pusat Kegiatan Belajar Masyarakat (PKBM). Aplikasi ini dibangun menggunakan Laravel 12 dengan React dan TypeScript, menyediakan antarmuka yang modern dan responsif untuk mengelola berbagai aspek operasional PKBM.

### Fitur Utama:

- **Manajemen Siswa**: Pendaftaran, data pribadi, dan status siswa
- **Sistem PPDB**: Penerimaan Peserta Didik Baru online
- **Manajemen Pembayaran**: Tagihan dan validasi pembayaran
- **Akademik**: Kelas, mata pelajaran, tugas, dan penilaian
- **Laporan**: Rapor dan laporan akademik
- **Berita & Informasi**: Manajemen konten website

---

## Persyaratan Sistem

### Server Requirements:

- **PHP**: 8.2 atau lebih tinggi
- **Composer**: 2.0 atau lebih tinggi
- **Node.js**: 18.0 atau lebih tinggi
- **NPM/PNPM**: Versi terbaru
- **Database**: MySQL 8.0+ / PostgreSQL 13+ / SQLite 3.8+

### Browser Support:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd pkbm
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
# atau
pnpm install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Database Setup

```bash
# Create database (MySQL/PostgreSQL)
# Edit .env file dengan konfigurasi database

# Run migrations
php artisan migrate

# Seed database dengan data awal
php artisan db:seed
```

### 5. Build Assets

```bash
# Development
npm run dev

# Production
npm run build
```

### 6. Start Application

```bash
# Development server
php artisan serve

# Atau menggunakan composer script
composer run dev
```

---

## Konfigurasi

### Environment Variables (.env)

```env
APP_NAME="Sistem PKBM"
APP_ENV=local
APP_KEY=base64:your-app-key
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pkbm_db
DB_USERNAME=root
DB_PASSWORD=

# Media Library
MEDIA_DISK=public
```

### File Storage

```bash
# Create storage link
php artisan storage:link

# Set permissions
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

---

## Struktur Aplikasi

### Backend (Laravel)

```
app/
├── Http/Controllers/     # Controller untuk handling requests
├── Models/              # Eloquent models
├── Http/Middleware/     # Custom middleware
├── Http/Requests/       # Form request validation
└── Providers/           # Service providers

database/
├── migrations/          # Database migrations
├── seeders/            # Database seeders
└── factories/          # Model factories
```

### Frontend (React + TypeScript)

```
resources/js/
├── components/         # Reusable components
├── pages/             # Page components
├── layouts/           # Layout components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── lib/               # Utility functions
```

---

## Fitur Utama

### 1. Dashboard

- **Widget Profil User**: Informasi user yang sedang login
- **Widget Waktu**: Tanggal dan waktu real-time
- **Widget Tagihan**: Status tagihan siswa (jika memiliki permission)
- **Widget Pembayaran**: Pembayaran yang belum diverifikasi
- **Widget PPDB**: Informasi pendaftaran siswa baru
- **Grid Siswa Draft**: Daftar siswa dengan status draft

### 2. Manajemen Siswa

- **Data Pribadi**: NISN, NIS, nama, jenis kelamin, alamat, dll
- **Data Keluarga**: Informasi orang tua dan keluarga
- **Data Akademik**: Kelas, mata pelajaran, nilai
- **Status Siswa**: Draft, PPDB, Aktif, Dikeluarkan, Lulus, Pindah
- **Upload Foto**: Foto profil siswa

### 3. Sistem PPDB (Penerimaan Peserta Didik Baru)

- **Form Pendaftaran Online**: Form pendaftaran yang dapat diakses publik
- **Validasi Data**: Validasi kelengkapan dokumen
- **Status Pendaftaran**: Tracking status pendaftaran
- **Pengaturan PPDB**: Konfigurasi periode dan persyaratan

### 4. Manajemen Pembayaran

- **Jenis Pembayaran**: Konfigurasi jenis pembayaran (SPP, uang gedung, dll)
- **Tagihan Siswa**: Generate tagihan otomatis
- **Validasi Pembayaran**: Konfirmasi dan validasi pembayaran
- **Status Pembayaran**: Unpaid, Partial, Paid
- **Laporan Keuangan**: Ringkasan pembayaran

### 5. Manajemen Akademik

- **Tahun Ajaran**: Pengaturan periode akademik
- **Kelas**: Manajemen kelas dan wali kelas
- **Mata Pelajaran**: Daftar mata pelajaran
- **Guru**: Manajemen data guru dan mata pelajaran
- **Tugas**: Assignment dan penilaian
- **Nilai**: Input dan manajemen nilai siswa

### 6. Laporan & Dokumentasi

- **Rapor Siswa**: Generate rapor dalam format PDF
- **Laporan Absensi**: Laporan kehadiran siswa
- **Laporan Pembayaran**: Ringkasan pembayaran
- **Export Data**: Export data dalam berbagai format

### 7. Berita & Informasi

- **Manajemen Berita**: CRUD berita sekolah
- **Kategori Berita**: Pengelompokan berita
- **Upload Media**: Gambar dan dokumen pendukung
- **Publikasi**: Berita dapat dipublikasikan ke website

---

## Panduan Penggunaan

### 1. Login & Dashboard

1. Akses aplikasi melalui browser
2. Login dengan username/email dan password
3. Dashboard akan menampilkan informasi sesuai role user
4. Navigasi menggunakan sidebar menu

### 2. Manajemen Siswa

#### Menambah Siswa Baru:

1. Pilih menu "Data Master" → "Siswa"
2. Klik tombol "Tambah Siswa"
3. Isi form data pribadi siswa
4. Upload foto profil (opsional)
5. Simpan data

#### Mengelola Status Siswa:

1. Pilih siswa dari daftar
2. Klik "Edit" pada siswa yang dipilih
3. Ubah status sesuai kebutuhan:

- **Draft**: Data belum lengkap
- **PPDB**: Sedang dalam proses pendaftaran
- **Aktif**: Siswa aktif belajar
- **Dikeluarkan**: Siswa dikeluarkan
- **Lulus**: Siswa telah lulus
- **Pindah**: Siswa pindah sekolah

### 3. Sistem PPDB

#### Mengatur PPDB:

1. Pilih menu "Pengaturan PPDB"
2. Konfigurasi periode pendaftaran
3. Set persyaratan dan dokumen yang diperlukan
4. Aktifkan/matikan pendaftaran online

#### Proses Pendaftaran:

1. Calon siswa akses form pendaftaran online
2. Isi data pribadi dan keluarga
3. Upload dokumen persyaratan
4. Submit pendaftaran
5. Admin validasi dan verifikasi data
6. Update status pendaftaran

### 4. Manajemen Pembayaran

#### Mengatur Jenis Pembayaran:

1. Pilih menu "Tagihan & Pembayaran" → "Jenis Pembayaran"
2. Klik "Tambah Jenis Pembayaran"
3. Isi nama, jumlah default, dan siklus pembayaran
4. Simpan konfigurasi

#### Generate Tagihan:

1. Pilih menu "Tagihan & Pembayaran" → "Tagihan Siswa"
2. Klik "Generate Tagihan"
3. Pilih siswa dan jenis pembayaran
4. Set jumlah dan tanggal jatuh tempo
5. Generate tagihan

#### Validasi Pembayaran:

1. Pilih menu "Tagihan & Pembayaran" → "Validasi Pembayaran"
2. Lihat daftar pembayaran yang belum diverifikasi
3. Klik "Verifikasi" pada pembayaran yang sesuai
4. Konfirmasi verifikasi

### 5. Manajemen Akademik

#### Mengatur Tahun Ajaran:

1. Pilih menu "Tahun Ajaran"
2. Klik "Tambah Tahun Ajaran"
3. Isi label tahun ajaran (contoh: "2024/2025")
4. Set sebagai tahun ajaran aktif

#### Mengelola Kelas:

1. Pilih menu "Data Master" → "Kelas"
2. Klik "Tambah Kelas"
3. Isi nama kelas, pilih tahun ajaran dan grade
4. Assign wali kelas
5. Simpan data

#### Input Nilai:

1. Pilih menu "Nilai" atau akses melalui kelas
2. Pilih siswa dan mata pelajaran
3. Input nilai sesuai komponen penilaian
4. Simpan nilai

### 6. Generate Laporan

#### Rapor Siswa:

1. Pilih menu "Laporan" → "Rapor"
2. Pilih siswa dan semester
3. Klik "Generate Rapor"
4. Download PDF rapor

#### Laporan Pembayaran:

1. Pilih menu "Laporan" → "Pembayaran"
2. Set filter periode dan status
3. Generate laporan
4. Export ke Excel/PDF

---

## Manajemen User & Role

### Role yang Tersedia:

- **Super Admin**: Akses penuh ke semua fitur
- **Admin**: Manajemen data dan laporan
- **Guru**: Input nilai dan tugas
- **Wali Kelas**: Manajemen siswa di kelas
- **Siswa**: Melihat data pribadi dan nilai
- **Orang Tua**: Melihat data anak

### Permission System:

Aplikasi menggunakan Spatie Laravel Permission untuk mengatur akses fitur berdasarkan role.

### Menambah User Baru:

1. Pilih menu "Data Master" → "User"
2. Klik "Tambah User"
3. Isi data pribadi user
4. Assign role yang sesuai
5. Set password
6. Simpan user

---

## Troubleshooting

### Masalah Umum:

#### 1. Error 500 - Server Error

```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Check logs
tail -f storage/logs/laravel.log
```

#### 2. Asset tidak ter-load

```bash
# Rebuild assets
npm run build

# Clear browser cache
# Hard refresh (Ctrl+F5)
```

#### 3. Database connection error

- Periksa konfigurasi database di `.env`
- Pastikan database server berjalan
- Verifikasi kredensial database

#### 4. Permission denied

```bash
# Set permissions
chmod -R 755 storage
chmod -R 755 bootstrap/cache
chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache
```

#### 5. Media upload error

```bash
# Create storage link
php artisan storage:link

# Check disk space
df -h
```

### Log Files:

- **Laravel Log**: `storage/logs/laravel.log`
- **Web Server Log**: `/var/log/apache2/error.log` atau `/var/log/nginx/error.log`
- **PHP Log**: `/var/log/php/error.log`

---

## FAQ

### Q: Bagaimana cara reset password admin?

A:

```bash
# Via artisan command
php artisan tinker
>>> $user = User::where('email', 'admin@example.com')->first();
>>> $user->password = Hash::make('newpassword');
>>> $user->save();
```

### Q: Bagaimana cara backup database?

A:

```bash
# MySQL
mysqldump -u username -p database_name > backup.sql

# PostgreSQL
pg_dump -U username database_name > backup.sql
```

### Q: Bagaimana cara mengubah logo aplikasi?

A: Ganti file logo di `public/logo.svg` atau `resources/js/components/app-logo.tsx`

### Q: Bagaimana cara menambah mata pelajaran baru?

A:

1. Pilih menu "Data Master" → "Mata Pelajaran"
2. Klik "Tambah Mata Pelajaran"
3. Isi nama mata pelajaran
4. Simpan data

### Q: Bagaimana cara export data siswa?

A:

1. Pilih menu "Data Master" → "Siswa"
2. Gunakan filter untuk memilih data yang akan diexport
3. Klik tombol "Export" (jika tersedia)
4. Pilih format export (Excel/CSV)

### Q: Bagaimana cara mengatur notifikasi email?

A: Konfigurasi SMTP di file `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
```

---

## Support & Kontak

Untuk bantuan teknis atau pertanyaan lebih lanjut:

- **Email**: support@pkbm.com
- **Documentation**: Akses menu "Documentation" di aplikasi
- **GitHub Issues**: [Repository Issues](link-to-repo)

---

## Changelog

### Version 1.0.0

- Initial release
- Basic CRUD operations
- User management
- Payment system
- Academic management
- Report generation

---

**© 2024 Sistem Informasi PKBM. All rights reserved.**
