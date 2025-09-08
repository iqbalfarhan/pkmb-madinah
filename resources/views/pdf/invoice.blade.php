<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="{{ public_path('report.css') }}">

  {{-- <style>
    * {
      line-height: 1.6;
      font-family: ubuntu;
      padding: 0;
      margin: 0;
    }

    table {
      width: 100%;
      border: 1px black;
      border-collapse: collapse
    }

    td,
    th {
      padding: 2px;
    }

    .text-xl {
      font-size: 18pt;
    }

    .text-center {
      text-align: center;
    }

    .text-left {
      text-align: left;
    }

    .text-right {
      text-align: right;
    }

    .bg-black {
      background-color: black;
    }

    .text-white {
      color: white;
    }

    .w-column {
      width: 120px;
    }

    .content {
      width: 90%;
      margin: auto;
    }

  </style> --}}

</head>
<body>
  <header>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem reprehenderit quisquam obcaecati, illum officia reiciendis quod culpa fuga nam dicta. Facilis eligendi quo perferendis iste. Tenetur placeat maxime tempore eius.
  </header>
  <div class="content">
    @foreach ($data['curricular_domain'] as $nilai)
    <table>
      <thead>
        <tr class="bg-black text-white">
          <th colspan="5" class="text-xl">{{ $nilai['name'] }}</th>
        </tr>
        <tr>
          <th colspan="5" class="text-left">{{ $nilai['goal'] }}</th>
        </tr>
      </thead>
      <tbody>
        @foreach ($nilai['points'] as $point)
            <tr>
              <td class="w-column">{{ $point['name'] }}</td>
              <td class="text-left">{{ $point['description'] }}</td>
              <td>{{ $point['mark'] }}</td>
              <td>{{ $point['mark'] }}</td>
              <td>{{ $point['mark'] }}</td>
            </tr>
        @endforeach
      </tbody>
    </table>
    @endforeach
  </div>

  <footer>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet, rem explicabo quod eum quam ipsa quidem molestias nihil molestiae beatae! Error magnam quas voluptate repellat incidunt ab quaerat voluptatem.</footer>
</body>
</html>