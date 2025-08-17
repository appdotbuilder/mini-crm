<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
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
            'description' => 'required|string',
            'due_date' => 'required|date|after_or_equal:today',
            'status' => 'required|in:To Do,In Progress,Completed',
            'related_type' => 'required|in:contact,deal',
            'related_id' => 'required|integer',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'description.required' => 'Task description is required.',
            'due_date.required' => 'Due date is required.',
            'due_date.after_or_equal' => 'Due date cannot be in the past.',
            'status.in' => 'Please select a valid status.',
            'related_type.in' => 'Please select a valid relation type.',
            'related_id.required' => 'Please select what this task is related to.',
        ];
    }
}