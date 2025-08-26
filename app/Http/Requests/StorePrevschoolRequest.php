<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePrevschoolRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'student_id' => 'required|numeric',
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ];
    }
}
