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
			font-family: 'Noto Serif';
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
			background-color: #0170c0;
			color: white;
			padding: 6px 5px;
			padding-bottom: 6px;
			font-size: 11pt;
			font-family: 'Noto Sans';
			font-weight: bold;
			text-align: center;
		}

		.font-bold {
			font-weight: bold;
		}
	</style>

</head>
<body>
	<p class="text-center">
		<b class="font-bold">FORMULIR PESERTA DIDIK</b>
	</p>
	<table style="width: 100%; border-collapse: collapse;">
		<tr>
			<td colspan="10" class="section-heading">IDENTITAS PESERTA DIDIK</td>
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
		</tr>
		<tr>
			<td>d.</td>
			<td>NIS</td>
			<td>:</td>
			<td colspan="4">{{ $student['nis'] }}</td>
		</tr>
		<tr>
			<td>e</td>
			<td>Sekolah Asal</td>
			<td>:</td>
			<td>{{ $student->prevschool->name }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Alamat sekolah Asal</td>
			<td>:</td>
			<td>{{ $student->prevschool->address }}</td>
		</tr>
		<tr>
			<td>f.</td>
			<td>Tempat, Tgl Lahir</td>
			<td>:</td>
			<td colspan="3">{{ $student['kelahiran'] }}</td>
		</tr>
		<tr>
			<td>g.</td>
			<td>Agama</td>
			<td>:</td>
			<td colspan="7">Islam</td>
		</tr>
		<tr>
			<td>h.</td>
			<td>Alamat Tempat Tinggal</td>
			<td>:</td>
			<td colspan="7">{{ $student['address']['jalan'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Dusun</td>
			<td>:</td>
			<td colspan="7">{{ $student['address']['dusun'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- RT / RW</td>
			<td>:</td>
			<td colspan="7">{{ $student['address']['rt'] }} / {{ $student['address']['rw'] ?? "-" }}</td>
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
			<td>i.</td>
			<td>No Telepon Rumah</td>
			<td>:</td>
		</tr>
		<tr>
			<td>j.</td>
			<td>No Telepon Pribadi</td>
			<td>:</td>
			<td>{{ $student->phone }}</td>
		</tr>
		<tr>
			<td>k.</td>
			<td>Email Pribadi</td>
			<td>:</td>
			<td>{{ $student['email'] }}</td>
		</tr>

		<tr>
			<td colspan="10">&nbsp;</td>
		</tr>
		<tr>
			<td colspan="10" class="section-heading">DATA AYAH KANDUNG</td>
		</tr>

		<tr>
			<td>l.</td>
			<td>Nama Ayah</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['father_name'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Pekerjaan</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['father_ocupation'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Penghasilan Bulanan</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['father_sallary'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Nomor telepon</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['father_phone'] }}</td>
		</tr>

		<tr>
			<td colspan="10">&nbsp;</td>
		</tr>
		<tr>
			<td colspan="10" class="section-heading">DATA IBU KANDUNG</td>
		</tr>

		<tr>
			<td>m.</td>
			<td>Nama Ibu</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['mother_name'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Pekerjaan</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['mother_ocupation'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Penghasilan Bulanan</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['mother_sallary'] }}</td>
		</tr>
		<tr>
			<td></td>
			<td>- Nomor telepon</td>
			<td>:</td>
			<td colspan="7">{{ $student['family']['mother_phone'] }}</td>
		</tr>

		<tr>
			<td colspan="10">&nbsp;</td>
		</tr>

		<tr>
			<td colspan="10" class="section-heading">DOKUMEN PELENGKAP</td>
		</tr>

		<tr>
			<td>n.</td>
			<td>Photo siswa</td>
			<td>:</td>
			<td colspan="7">
				{{-- <img src="{{ $photo }}" style="height: 300px;" /> --}}
				<img src="{{ public_path(str_replace(env('APP_URL'), "", $photo)) }}" alt="" style="height: 4cm;">
			</td>
		</tr>
	</table>
</body>
</html>