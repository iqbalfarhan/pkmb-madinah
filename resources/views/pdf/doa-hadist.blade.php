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
			font-size: 10pt;
			margin: 0.5in;
		}
		h1, h2, h3, h4{
			text-align: center;
			font-family: 'Noto Serif Bold';
		}
		strong, b {
			font-family: 'Noto Serif Bold';
		}

		.content table{
			width: 100%;
			border-collapse: collapse;
			border: 1px solid black;
		}
		.content table th, .content table td {
			padding: 2px 7px;
			padding-bottom: 7px;
		}
		.content table tr th {
			font-family: 'Noto Serif Bold';
			line-height: 1
		}

		.text-center{
			text-align: center
		}
		.text-left{
			text-align: left
		}
	</style>
</head>
<body>
	<table style="width: 100%;">
		<tr>
			<td>
			<img src="{{ public_path("rapor-tahfidz.png") }}" />
			</td>
			<td>
			<h3 class="judul-rapor">
				LAPORAN PERKEMBANGAN HAFALAN <br>
				BACAAN DO'A HARIAN DAN HADITS<br>
				{{ strtoupper($settings['SCHOOL_NAME']) }}<br>
				SEMESTER {{ strtoupper($data['semester']) }}<br>
				TAHUN AJARAN {{ $data['tahunajaran'] }}
			</h3>
			</td>
		</tr>
	</table>

	<hr>

	<div style="margin: 20px 0cm;">
		<table>
			<tr><td style="width: 100px"><strong>Nama siswa</strong></td><td><strong>:</strong></td><td><strong>{{ $data['nama'] }}</strong></td></tr>
			<tr><td style="width: 100px"><strong>Kelas</strong></td><td><strong>:</strong></td><td><strong>{{ $data['kelas'] }}</strong></td></tr>
			<tr><td style="width: 100px"><strong>Usia</strong></td><td><strong>:</strong></td><td><strong>{{ $data['usia'] }}</strong></td></tr>
			<tr><td style="width: 100px"><strong>NIS/NISN</strong></td><td><strong>:</strong></td><td><strong>{{ $data['nisn'] }}</strong></td></tr>
		</table>
	</div>

	@php
		$grouped = [];

		foreach ($data['nilai'] as $item) {
			$grouped[$item['juz']][] = $item;
		}
	@endphp

	<div class="content">
		<table class="table" border="1">
			<tr>
				<th>No</th>
				<th>Nama surah</th>
				<th>Kemampuan yang dicapai</th>
				<th>Keterangan ayat</th>
			</tr>
			@foreach ($grouped as $juz => $nilais)	
				<tr style="background-color: lightgrey">
					<th colspan="4">Hafalan juz {{ $juz }}</th>
				</tr>
				@foreach ($nilais as $nilai)
					<tr>
						<td style="width: 15px" class="text-center">{{ $loop->iteration }}</td>
						<th>{{ $nilai['surah'] }}</th>
						<td class="text-center">{{ ucwords($nilai['pencapaian']) }}</td>
						<td>{{ $nilai['keterangan'] }}</td>
					</tr>
				@endforeach
			@endforeach
			<tr>
				<td colspan="4">
					<div>
						<strong>Catatan:</strong><br>
						{{ $data['catatan'] }}
					</div>
				</td>
			</tr>
		</table>
		<br>
	</div>

	<div>
		<table border="0" style="width: 100%">
			<tr>
				<td style="width: 40%; text-align: center;"></td>
				<td style="width: 30%; text-align: center;"></td>
				<td style="width: 40%; text-align: center;">{{ $data['tanggal'] ?? "" }}</td>
			</tr>
			<tr>
			<td style="width: 40%; text-align: center;">
				Orangtua/Wali
				<br>
				<br>
				<br>
				<br>
				_______________
			</td>
			<td style="width: 30%; text-align: center;"></td>
			<td style="width: 40%; text-align: center;">
				Guru pembimbing,
				<br>
				<br>
				<br>
				<br>
				<strong>{{ $data['pembimbing'] ?? "" }}</strong>
			</td>
			</tr>
			<tr>
			<td>&nbsp;</td>
			</tr>
			<tr>
			<td style="text-align: center;" colspan="3">
				Mengetahui,<br>
				Koordinator Al-Muyassar<br>
				<br>
				<br>
				<br>
				<strong>{{ $data['koordinator'] }}</strong>
			</td>
			</tr>
		</table>
	</div>
</body>
</html>