<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AcademicYearFormatRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match('/^\d{4}\/\d{4}$/', $value)) {
            $fail("The {$attribute} must be in format YYYY/YYYY.");
            return;
        }

        // Pecah jadi 2 tahun
        [$start, $end] = explode('/', $value);

        // Cek selisih tahun
        if ((int)$end !== (int)$start + 1) {
            $fail("The {$attribute} must be consecutive years (e.g. 2023/2024).");
        }
    }
}
