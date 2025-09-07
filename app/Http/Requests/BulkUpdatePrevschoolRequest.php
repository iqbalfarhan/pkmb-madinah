<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdatePrevschoolRequest extends FormRequest
{
    /**
     * Determine if the prevschool is authorized to make this request.
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
            'prevschool_ids' => 'required|array',
            'prevschool_ids.*' => 'exists:prevschools,id',
        ];
    }
}
