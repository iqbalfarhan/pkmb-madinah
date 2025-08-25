<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkDeleteAbsentRequest extends FormRequest
{
    /**
     * Determine if the absent is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'absent_ids' => 'required|array',
            'absent_ids.*' => 'exists:absents,id',
        ];
    }
}
