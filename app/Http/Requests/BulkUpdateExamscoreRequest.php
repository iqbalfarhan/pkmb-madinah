<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateExamscoreRequest extends FormRequest
{
    /**
     * Determine if the examscore is authorized to make this request.
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
            'examscore_ids' => 'required|array',
            'examscore_ids.*' => 'exists:examscores,id',
        ];
    }
}
