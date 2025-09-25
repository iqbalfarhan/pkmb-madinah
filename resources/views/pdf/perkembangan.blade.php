<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ $report->name }}</title>

  <style>
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
      font-size: 10pt;
      margin: 0.5in;
      margin-top: 2cm;
    }
    h3, h4{
      text-align: center;
      font-family: 'Noto Sans';
    }
    strong, b {
      font-family: 'Noto Sans Bold';
    }

    .section-heading{
      background-image: url("{{ public_path('rapor-perkembangan-section-header.png') }}");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      padding: 0px 6px;
      width: 240px;
      height: 40px;
      margin-bottom: 10px;
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
      font-family: 'Noto Sans Bold';
      line-height: 1
    }

    .domain-heading {
      background-color: black;
      color: white;
      font-size: 12pt;
      font-family: "Noto Sans Bold";
      padding: 6px;
    }

    .domain-goal {
      text-align: left;
      font-size: 'Noto Sans';
    }

    .domain-value {
      text-align: justify;
    }

    .domain-checkbox {
      width: 30px;
      text-align: center
    }
    
    @page {
      size: 210mm 330mm; /* Atur ukuran ke F4 */
      margin: 0cm;
    }

    .font-sans-bold {
      font-family: 'Noto Sans Bold';
    }

    footer {
      position: fixed; 
      text-align: right;
      bottom: 0cm; 
      left: 0cm;
      right: 0cm;
      height: 0.3in;
      background-image: url("{{ public_path('rapor-perkembangan-footer-gradient.png') }}");
      padding-right: 10px;
    }

    footer .page:after {
      content: counter(page, decimal);
    }

    .judul-rapor {
      font-family: "Noto Sans Bold";
      text-align: center;
      font-weight: bold
    }

    .hidden {
      display: none
    }

    table.table-condensed {
      border: 0px
    }

    table.table-condensed tr td {
      padding: 0px;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <table style="width: 100%;">
    <tr>
      <td>
        <img src="{{ public_path("rapor-perkembangan.png") }}" />
      </td>
      <td>
        <h2 class="judul-rapor">
          LAPORAN PERKEMBANGAN SISWA<br>
          {{ strtoupper($settings['SCHOOL_NAME']) }}<br>
          SEMESTER {{ strtoupper($data['semester']) }}<br>
          TAHUN AJARAN {{ $data['tahunajaran'] }}
        </h2>
      </td>
    </tr>
  </table>

  <footer>
    <strong class="page">Laporan Perkembangan Siswa – PKBM Al–Madinah | </strong>
  </footer>

  <div style="margin: 1cm 0cm;">
    <table>
      <tr><td style="width: 100px"><strong>Nama siswa</strong></td><td><strong>:</strong></td><td><strong>{{ $data['nama'] }}</strong></td></tr>
      <tr><td style="width: 100px"><strong>Kelas</strong></td><td><strong>:</strong></td><td><strong>{{ $data['kelas'] }}</strong></td></tr>
      <tr><td style="width: 100px"><strong>Usia</strong></td><td><strong>:</strong></td><td><strong>{{ $data['usia'] }}</strong></td></tr>
      <tr><td style="width: 100px"><strong>NIS/NISN</strong></td><td><strong>:</strong></td><td><strong>{{ $data['nisn'] }}</strong></td></tr>
    </table>
  </div>

  <div class="content">
    <div class="section-heading">
      <strong>CURRICULAR DOMAIN</strong>
    </div>
    @foreach ($data['curricular_domain'] as $nilai)
      <table border={1}>
        <tr>
          <th colspan="5" class="domain-heading">{{ $nilai['name'] }}</th>
        </tr>
        <tr>
          <td colspan="5" class="domain-goal">
            <strong>Tujuan utama:<br> {{ $nilai['goal'] }}</strong>
          </td>
        </tr>
        <tr style="background-color: grey; color: white;">
          <th>Fokus<br>perkembangan</th>
          <th>Perkembangan anak</th>
          <th>A</th>
          <th>B</th>
          <th>C</th>
        </tr>
        @foreach ($nilai['points'] as $point)
          <tr>
            <td class="w-column" style="width: 120px">
              <strong>{{ $point['name'] }}</strong>
            </td>
            <td class="domain-value">{{ $point['description'] }}</td>
            <td class="domain-checkbox">
              @if ($point['mark'] == "A")
                <img src="{{ public_path('symbols/check.png') }}" style="width: 10pt" />
              @endif
            </td>
            <td class="domain-checkbox">
              @if ($point['mark'] == "B")
                <img src="{{ public_path('symbols/check.png') }}" style="width: 10pt" />
              @endif
            </td>
            <td class="domain-checkbox">
              @if ($point['mark'] == "C")
                <img src="{{ public_path('symbols/check.png') }}" style="width: 10pt" />
              @endif
            </td>
          </tr>
        @endforeach
      </table>
      <br>
    @endforeach
  </div>

  <div class="content">
    <div class="section-heading">
      <strong>18 SIKAP</strong>
    </div>
    <table border="1">
      <tr>
        <td colspan="5">
          {{ count($data['sikap']) ?? 0 }} dari 18 sikap yang dibangun di Sekolah Al-Madinah<br>
          <table border="0" class="table-condensed">
            @foreach (["Membutuhkan motivasi", "Menunjukkan perbaikan", "Memiliki kompetensi"] as $key => $item)
              <tr>
                <td style="width: 70px">
                  @if($key === 0)
                    <img src="{{ public_path("symbols/star-fill-black.png") }}" style="height: 10px; margin-top: 7px;" />
                  @elseif($key === 1)
                    <img src="{{ public_path("symbols/2-star-fill-black.png") }}" style="height: 10px; margin-top: 7px;" />
                  @elseif($key === 2)
                    <img src="{{ public_path("symbols/3-star-fill-black.png") }}" style="height: 10px; margin-top: 7px;" />
                  @endif
                </td>
                <td>({{ $item }})</td>
              </tr>
            @endforeach
          </table>
        </td>
      </tr>
      <tr style="background-color: black; color: white;">
        <th>No</th>
        <th>Sikap yang dikembangkan</th>
        <th>
          <img src="{{ public_path("symbols/star-fill-white.png") }}" style="height: 10px; margin-top: 5px;" />
        </th>
        <th>
          <img src="{{ public_path("symbols/2-star-fill-white.png") }}" style="height: 10px; margin-top: 5px;" />
        </th>
        <th>
          <img src="{{ public_path("symbols/3-star-fill-white.png") }}" style="height: 10px; margin-top: 5px;" />
        </th>
      </tr>
      @foreach ($data['sikap'] as $key => $value)
          <tr>
            <td>{{ $loop->iteration }}</td>
            <td style="width: 100%"><strong>{{ ucfirst($key) }}</strong></td>
            <th style="width: 50px">
              @if ($value == 1)
                  <img src="{{ public_path("symbols/check.png") }}" style="width: 10px" />
              @endif
            </th>
            <th style="width: 50px">
              @if ($value == 2)
                  <img src="{{ public_path("symbols/check.png") }}" style="width: 10px" />
              @endif
            </th>
            <th style="width: 50px">
              @if ($value == 3)
                  <img src="{{ public_path("symbols/check.png") }}" style="width: 10px" />
              @endif
            </th>
          </tr>
      @endforeach
    </table>
    <br>
  </div>

  <div class="content">
    <div class="section-heading">
      <strong>EKSTRAKURIKULER</strong>
    </div>
    <table border="1">
      <tr style="background-color: black; color: white;">
        <th>No</th>
        <th>Ekstrakulikuler</th>
        <th>Kegiatan yang pernah diikuti</th>
      </tr>
      @forelse ($data['ekskul'] as $item)
          <tr>
            <td>{{ $loop->iteration }}</td>
            <td>{{ $item['nama'] }}</td>
            <td>{{ $item['kegiatan'] }}</td>
          </tr>
      @empty
          @for ($i = 1; $i < 3; $i++)
              <tr>
                <td>{{ $i }}</td>
                <td></td>
                <td></td>
              </tr>
          @endfor
      @endforelse
    </table>
    <br>
  </div>

  <div class="content">
    <div class="section-heading">
      <strong>KETIDAKHADIRAN</strong>
    </div>
    <table border="1" style="width: 60%">
      <tr style="background-color: black; color: white;">
        <th colspan="3">Ketidakhadiran</th>
      </tr>
      @foreach ($data['ketidakhadiran'] as $key => $value)
          <tr>
            <td>{{ $key }}</td>
            <td style="width: 5px">:</td>
            <td>{{ $value }}</td>
          </tr>
      @endforeach
    </table>
    <br>
  </div>

  <div class="content">
    <table>
      <tr style="background-color: black; color: white;">
        <th>KOMENTAR GURU</th>
      </tr>
      <tr>
        <td>{!! str()->markdown($data['komentar_guru'] ?? "") !!}</td>
      </tr>
      <tr style="background-color: black; color: white;">
        <th>KOMENTAR SISWA</th>
      </tr>
      <tr>
        <td>
          {!! str()->markdown($data['komentar_siswa'] ?? "<br><br><br><br>") !!}
        </td>
      </tr>
      <tr style="background-color: black; color: white;">
        <th>KOMENTAR ORANGTUA/WALI</th>
      </tr>
      <tr>
        <td>
          {!! str()->markdown($data['komentar_wali'] ?? "<br><br><br><br>") !!}
        </td>
      </tr>
    </table>
    <br>
  </div>

  <div>
    <table border="0" style="width: 100%">
      <tr>
        <td style="width: 50%">
          Orangtua/Wali
          <br>
          <br>
          <br>
          <br>
          <br>
          .................
        </td>
        <td style="width: 50%; text-align: center;">
          {{ $data['tanggal'] ?? "" }}<br>
          Wali Kelas,
          <br>
          <br>
          <br>
          <br>
          <strong>{{ $data['walikelas'] ?? "" }}</strong>
        </td>
      </tr>
    </table>
  </div>

</body>
</html>