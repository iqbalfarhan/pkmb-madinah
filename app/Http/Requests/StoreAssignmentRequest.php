<?php

namespace App\Http\Requests;

use App\Models\Assignment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lesson_id' => 'required|exists:lessons,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'rate' => 'nullable|numeric',
            'type' => ['required', Rule::in(Assignment::$typeLists)],
            'uploadable' => 'nullable|boolean',
        ];
    }
}
