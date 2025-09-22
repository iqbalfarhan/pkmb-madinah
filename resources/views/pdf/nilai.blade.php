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
      font-size: 9pt;
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
        <img src="{{ public_path("rapor-perkembangan.png") }}" style="width: 150px" />
      </td>
      <td>&nbsp;</td>
      <td class="text-center">
        <h1 style="margin-bottom: 0; padding-bottom: 0;">
          {{ $settings['SCHOOL_NAME'] }}
        </h1>
        <div style="width: 90%; margin:0px auto;">{{ $settings['SCHOOL_ADDRESS'] }} Hp. {{ $settings['SCHOOL_PHONE'] }} email : {{ $settings['SCHOOL_EMAIL'] }}</div>
      </td>
    </tr>
  </table>

  <hr>

  <h3>LAPORAN HASIL AKHIR<br>SEMESTER {{ strtoupper($data['semester']) }} TAHUN AJARAN {{ $data['tahunajaran'] }}</h3>
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
			$grouped[$item['type']][] = $item;
		}
	@endphp

	<div class="content">
		<table border="1" style="width: 100%">
			<thead>
				<tr>
					<th>NO</th>
					<th>MATA PELAJARAN</th>
					<th style="width: 90px">NILAI<br>TUGAS</th>
					<th style="width: 90px">NILAI<br>EVALUASI</th>
					<th style="width: 90px">NILAI<br>RATA-RATA</th>
				</tr>
			</thead>
			<tbody>
				@php
					$no = 1;
				@endphp
				@foreach ($grouped as $type => $nilais)
					@if ($type == "Muatan lokal")
						<tr style="background-color: lightgrey">
							<th colspan="5" class="text-left">{{ $type }} :</th>
						</tr>
					@endif
					@foreach ($nilais as $nilai)
						<tr>
							<td class="text-center">{{ $no++ }}</td>
							<td>{{ $nilai['name'] }}</td>
							<td class="text-center">{{ round($nilai['nilai_tugas'], 2) }}</td>
							<td class="text-center">{{ round($nilai['evaluasi'], 2) }}</td>
							<td class="text-center">{{ round($nilai['rata_rata'], 2) }}</td>
						</tr>
					@endforeach
				@endforeach
			</tbody>
			<tfoot>
				<tr>
				<th colspan="2">Rata-rata</th>
				<th>0.00</th>
				<th>0.00</th>
				<th>0.00</th>
				</tr>
			</tfoot>
		</table>

		@if ($data['rapor_kenaikan_kelas'] == true)
			<br>
			<table style="margin-left: auto; width: 45%;">
				<tr>
					<td colspan="3">Keputusan :</td>
				</tr>
				<tr>
					<td colspan="3">Berdasarkan pencapaian kompetensi pada semester 1 dan 2, peserta didik dinyatakan :</td>
				</tr>
				<tr>
					<td>Naik ke kelas</td>
					<td style="width: 5px">:</td>
					<td>
						@if ($data['naik_kelas'] && $data['ke_kelas'])
							{{ $data['ke_kelas'] }}
						@endif
					</td>
				</tr>
				<tr>
					<td>Tinggal dikelas</td>
					<td style="width: 5px">:</td>
					<td>
						@if (!$data['naik_kelas'] && $data['ke_kelas'])
							{{ $data['ke_kelas'] }}
						@endif
					</td>
				</tr>
			</table>
		@endif

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
          Wali Kelas,
          <br>
          <br>
          <br>
          <br>
          <strong>{{ $data['walikelas'] ?? "" }}</strong>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td style="text-align: center;" colspan="3">
          Mengetahui,<br>
          Kepala Sekolah<br>
          <br>
          <br>
          <br>
          <strong>{{ $settings['KEPALA_SEKOLAH'] }}</strong>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>