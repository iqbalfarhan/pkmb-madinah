<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGradeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'group' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'characters' => 'nullable|array',
            'characters.*' => 'string',
        ];
    }
}
