<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'score' => 'required|numeric',
            'remark' => 'nullable|string|max:255',
            'answer' => 'nullable|string|max:255',
        ];
    }
}
