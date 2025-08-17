<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Deal>
 */
class DealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
        
        return [
            'name' => fake()->words(3, true) . ' Deal',
            'amount' => fake()->randomFloat(2, 1000, 100000),
            'stage' => fake()->randomElement($stages),
            'contact_id' => Contact::factory(),
            'company_id' => fake()->optional()->randomElement(Company::pluck('id')->toArray()),
        ];
    }
}