<?php

namespace App;

trait AnyFormatter
{
    public static function numberToWords(int $num): string
    {
        if ($num === 0) {
            return 'Nol';
        }

        $units = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];

        $belasan = [
            'Sepuluh',
            'Sebelas',
            'Dua Belas',
            'Tiga Belas',
            'Empat Belas',
            'Lima Belas',
            'Enam Belas',
            'Tujuh Belas',
            'Delapan Belas',
            'Sembilan Belas',
        ];

        $puluhan = [
            '',
            'Sepuluh',
            'Dua Puluh',
            'Tiga Puluh',
            'Empat Puluh',
            'Lima Puluh',
            'Enam Puluh',
            'Tujuh Puluh',
            'Delapan Puluh',
            'Sembilan Puluh',
        ];

        $ribuan = ['', 'Ribu', 'Juta', 'Miliar', 'Triliun'];

        $toWords = function ($n) use (&$toWords, $units, $belasan, $puluhan, $ribuan): string {
            if ($n < 10) {
                return $units[$n];
            } elseif ($n < 20) {
                return $belasan[$n - 10];
            } elseif ($n < 100) {
                return $puluhan[floor($n / 10)] . ($n % 10 !== 0 ? ' ' . $units[$n % 10] : '');
            } elseif ($n < 200) {
                return 'Seratus' . ($n % 100 !== 0 ? ' ' . $toWords($n % 100) : '');
            } elseif ($n < 1000) {
                return $units[floor($n / 100)] . ' Ratus' . ($n % 100 !== 0 ? ' ' . $toWords($n % 100) : '');
            }

            $i = 0;
            $words = '';
            while ($n > 0) {
                $chunk = $n % 1000;
                if ($chunk !== 0) {
                    $chunkWords = $toWords($chunk) . ' ' . $ribuan[$i];
                    if ($chunk === 1 && $i === 1) {
                        $chunkWords = 'Seribu'; // khusus 1000
                    }
                    $words = $chunkWords . ($words ? ' ' . $words : '');
                }
                $n = floor($n / 1000);
                $i++;
            }
            return trim($words);
        };

        return $toWords($num);
    }

    public static function hariNumberDescription(int $num): string
    {
        return $num === 0 ? '-' : $num . ' (' . self::numberToWords($num) . ') Hari';
    }
}
