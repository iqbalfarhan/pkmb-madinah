<?php

namespace App\Http\Requests;

use App\Models\Family;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFamilyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'father_name' => 'nullable|string|max:255',
            'father_ocupation' => 'nullable|string|max:255',
            'father_address' => 'nullable|string|max:255',
            'father_phone' => 'nullable|string|max:255',
            'father_sallary' => [
                'nullable',
                Rule::in(Family::$sallaryLists),
            ],
            'mother_name' => 'nullable|string|max:255',
            'mother_ocupation' => 'nullable|string|max:255',
            'mother_address' => 'nullable|string|max:255',
            'mother_phone' => 'nullable|string|max:255',
            'mother_sallary' => [
                'nullable',
                Rule::in(Family::$sallaryLists),
            ],
        ];
    }
}
