<?php

namespace App\Http\Requests;

use App\Models\Assignment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'rate' => 'nullable|numeric|max:100',
            'type' => ['nullable', Rule::in(Assignment::$typeLists)],
            'uploadable' => 'nullable|boolean',
        ];
    }
}
