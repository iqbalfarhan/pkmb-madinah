<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdatefamilyRequest extends FormRequest
{
    /**
     * Determine if the family is authorized to make this request.
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
            'family_ids' => 'required|array',
            'family_ids.*' => 'exists:families,id',
        ];
    }
}
