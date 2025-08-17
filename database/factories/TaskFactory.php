<?php

namespace Database\Factories;

use App\Models\Contact;
use App\Models\Deal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['To Do', 'In Progress', 'Completed'];
        $relatedType = fake()->randomElement(['contact', 'deal']);
        
        $relatedId = $relatedType === 'contact' 
            ? Contact::factory()
            : Deal::factory();
        
        return [
            'description' => fake()->sentence(),
            'due_date' => fake()->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'status' => fake()->randomElement($statuses),
            'related_type' => $relatedType,
            'related_id' => $relatedId,
        ];
    }
}