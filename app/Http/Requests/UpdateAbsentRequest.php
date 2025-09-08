<?php

namespace App\Http\Requests;

use App\Models\Absent;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAbsentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => 'nullable|date',
            'reason' => [
                'nullable',
                Rule::in(Absent::$reasonLists),
            ],
            'description' => 'nullable|string|max:255',
        ];
    }
}
