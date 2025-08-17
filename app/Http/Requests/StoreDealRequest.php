<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDealRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'stage' => 'required|in:Prospecting,Qualification,Proposal,Negotiation,Closed Won,Closed Lost',
            'contact_id' => 'required|exists:contacts,id',
            'company_id' => 'nullable|exists:companies,id',
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
            'name.required' => 'Deal name is required.',
            'amount.required' => 'Deal amount is required.',
            'amount.numeric' => 'Amount must be a valid number.',
            'amount.min' => 'Amount cannot be negative.',
            'stage.in' => 'Please select a valid stage.',
            'contact_id.required' => 'Contact is required.',
            'contact_id.exists' => 'Selected contact does not exist.',
            'company_id.exists' => 'Selected company does not exist.',
        ];
    }
}