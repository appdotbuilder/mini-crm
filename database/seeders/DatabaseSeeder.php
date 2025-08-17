<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use App\Models\Contact;
use App\Models\Deal;
use App\Models\Task;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample CRM data
        Company::factory(10)->create();
        Contact::factory(25)->create();
        Deal::factory(15)->create();
        Task::factory(20)->create();
    }
}
