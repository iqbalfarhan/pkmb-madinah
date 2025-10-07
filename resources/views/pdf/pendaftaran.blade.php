<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>

	<style>
		@page {
			size: 210mm 330mm; /* Atur ukuran ke F4 */
			margin: 0cm;
		}
		@font-face {
			font-family: 'Noto Serif';
			src: url('{{ storage_path('fonts/NotoSerif-Regular.ttf') }}') format('truetype');
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: 'Noto Serif Bold';
			src: url('{{ storage_path('fonts/NotoSerif-Bold.ttf') }}') format('truetype');
			font-weight: bold;
			font-style: normal;
		}
		@font-face {
			font-family: 'Noto Sans';
			src: url('{{ storage_path('fonts/NotoSans-Regular.ttf') }}') format('truetype');
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: 'Noto Sans Bold';
			src: url('{{ storage_path('fonts/NotoSans-Bold.ttf') }}') format('truetype');
			font-weight: bold;
			font-style: normal;
		}
		*{
			font-family: 'Noto Sans';
		}
		body {
			font-size: 9.5pt;
			margin: 0.2in;
		}
		h1, h2, h3, h4{
			text-align: center;
			font-family: 'Noto Serif Bold';
		}
		strong, b {
			font-family: 'Noto Serif Bold';
		}

		.text-center{
			text-align: center
		}
		.text-left{
			text-align: left
		}
		.text-italic{
			font-style: italic
		}
		.text-muted {
			color: grey
		}

		.section-heading {
			/* background-color: #0170c0; */
			background-color: lightblue;
		}

		.font-bold {
			font-weight: bold;
		}
	</style>

</head>
<body>
	<p class="text-center font-bold">FORMULIR PESERTA DIDIK</p>
	<table style="width: 100%; border-collapse: collapse;">
		<tr>
			<th colspan="10" class="section-heading">IDENTITAS PESERTA DIDIK (WAJIB DIISI)</th>
		</tr>
		<tr>
			<td>a.</td>
			<td>Nama lengkap</td>
			<td style="width: 5px">:</td>
			<td colspan="7">{{ $student['name'] }}</td>
		</tr>
		<tr>
			<td>b.</td>
			<td>Jenis kelamin</td>
			<td>:</td>
			<td colspan="7">{{ $student['gender'] ? "Laki-laki" : "Perempuan" }}</td>
		</tr>
		<tr>
			<td>c.</td>
			<td>NISN</td>
			<td>:</td>
			<td>{{ $student['nisn'] }}</td>
			<td>NIS</td>
			<td>:</td>
			<td colspan="4">{{ $student['nis'] }}</td>
		</tr>
		<tr>
			<td>d.</td>
			<td>Nomor Seri Ijazah</td>
			<td>:</td>
			<td></td>
			<td class="text-italic text-muted" colspan="6">*) diisikan data dari jenjang sebelumnya</td>
		</tr>
		<tr>
			<td>e.</td>
			<td>Nomor Seri SKHUN</td>
			<td>:</td>
			<td></td>
			<td class="text-italic text-muted" colspan="6">*) diisikan data dari jenjang sebelumnya</td>
		</tr>
		<tr>
			<td>f.</td>
			<td>No. Ujian Nasional</td>
			<td>:</td>
			<td></td>
			<td class="text-italic text-muted" colspan="6">*) diisikan data dari jenjang sebelumnya</td>
		</tr>
		<tr>
			<td>g.</td>
			<td>No.Induk Kependudukan(NIK)</td>
			<td>:</td>
			<td colspan="7"></td>
		</tr>
		<tr>
			<td></td>
			<td>NPSN Sekolah Asal</td>
			<td>:</td>
			<td></td>
			<td class="text-italic text-muted" colspan="6">*) diisikan data dari jenjang sebelumnya</td>
		</tr>
		<tr>
			<td></td>
			<td>Nama Sekolah Asal</td>
			<td>:</td>
			<td></td>
			<td class="text-italic text-muted" colspan="6">*) diisikan data dari jenjang sebelumnya</td>
		</tr>
		<tr>
			<td>h.</td>
			<td>Tempat, Tgl Lahir</td>
			<td>:</td>
			<td colspan="3">{{ $student['pob'] }}</td>
			<td>,</td>
			<td colspan="3">{{ date('d/m/y', strtotime($student['dob'])) }}</td>
		</tr>
		<tr>
			<td>i.</td>
			<td>Agama</td>
			<td>:</td>
			<td colspan="7">Islam</td>
		</tr>
		<tr>
			<td>j.</td>
			<td>Berkebutuhan Khusus</td>
			<td>:</td>
			<td colspan="7">Tidak ada</td>
		</tr>
		<tr>
			<td>k.</td>
			<td>Alamat Tempat Tinggal</td>
			<td>:</td>
			<td colspan="7">{{ $student['address']['jalan'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Dusun</td>
			<td>:</td>
			<td colspan="3">{{ $student['address']['dusun'] }}</td>
			<td>RT :</td>
			<td>{{ $student['address']['rt'] }}</td>
			<td>RW :</td>
			<td>{{ $student['address']['rw'] ?? "-" }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Kelurahan / Desa</td>
			<td>:</td>
			<td colspan="7">{{ $student['address']['kelurahan'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Kecamatan</td>
			<td>:</td>
			<td colspan="7">{{ $student['address']['kecamatan'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Kabupaten / Kota</td>
			<td>:</td>
			<td colspan="7">{{ $student['address']['kota'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Propinsi</td>
			<td>:</td>
			<td colspan="7">{{ $student['address']['provinsi'] }}</td>
		</tr>
		<tr>
			<td>l.</td>
			<td>Alat Transportasi ke Sekolah</td>
			<td>:</td>
		</tr>
		<tr>
			<td>m.</td>
			<td>Jenis Tinggal</td>
			<td>:</td>
		</tr>
		<tr>
			<td>n.</td>
			<td>No Telepon Rumah</td>
			<td>:</td>
		</tr>
		<tr>
			<td>o.</td>
			<td>Email Pribadi</td>
			<td>:</td>
			<td>{{ $student['email'] }}</td>
		</tr>
		<tr>
			<td>p.</td>
			<td>No. KKS</td>
			<td>:</td>
		</tr>
		<tr>
			<td>q.</td>
			<td>Apakah Penerima KPS / PKH</td>
			<td>:</td>
		</tr>
		<tr>
			<td></td>
			<td>- Usulan dari sekolah Layak PIP</td>
			<td>:</td>
		</tr>
		<tr>
			<td></td>
			<td>- Penerima KIP</td>
			<td>:</td>
		</tr>
		<tr>
			<td></td>
			<td>- Nama Tertera di KIP</td>
			<td>:</td>
		</tr>
		<tr>
			<td></td>
			<td>- Alasan Menolak KIP</td>
			<td>:</td>
		</tr>
		<tr>
			<td></td>
			<td>- No Registrasi Akta Lahir</td>
			<td>:</td>
		</tr>
		<tr>
			<td></td>
			<td>- Lintang</td>
			<td>:</td>
		</tr>
		<tr>
			<td></td>
			<td>- Bujur</td>
			<td>:</td>
		</tr>

		<tr>
			<td colspan="10">&nbsp;</td>
		</tr>
		<tr>
			<th colspan="10" class="section-heading">DATA AYAH KANDUNG (WAJIB DIISI)</th>
		</tr>

		<tr>
			<td>r.</td>
			<td>Nama Ayah</td>
			<td>:</td>
			<td colspan="5">{{ $student['family']['father_name'] }}</td>
			<td>Tahun lahir</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td>- Berkebutuhan Khusus</td>
			<td>:</td>
			<td colspan="7">Tidak ada</td>
		</tr>
		<tr>
			<td></td>
			<td>- Pekerjaan</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['father_ocupation'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Pendidikan</td>
			<td>:</td>
			<td colspan="7"></td>
		</tr>
		<tr>
			<td></td>
			<td>- Penghasilan Bulanan</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['father_sallary'] }}</td>
		</tr>

		<tr>
			<td colspan="10">&nbsp;</td>
		</tr>
		<tr>
			<th colspan="10" class="section-heading">DATA IBU KANDUNG (WAJIB DIISI)</th>
		</tr>

		<tr>
			<td>s.</td>
			<td>Nama Ibu</td>
			<td>:</td>
			<td colspan="5">{{ $student['family']['mother_name'] }}</td>
			<td>Tahun lahir</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td>- Berkebutuhan Khusus</td>
			<td>:</td>
			<td colspan="7">Tidak ada</td>
		</tr>
		<tr>
			<td></td>
			<td>- Pekerjaan</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['mother_ocupation'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Pendidikan</td>
			<td>:</td>
			<td colspan="7"></td>
		</tr>
		<tr>
			<td></td>
			<td>- Penghasilan Bulanan</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['mother_sallary'] }}</td>
		</tr>
	</table>
</body>
</html>