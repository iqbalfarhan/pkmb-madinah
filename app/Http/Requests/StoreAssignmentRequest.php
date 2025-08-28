<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'description' => 'required|string',
            'rate' => 'required|numeric',
        ];
    }
}
