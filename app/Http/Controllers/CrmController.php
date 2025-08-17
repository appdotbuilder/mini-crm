<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Contact;
use App\Models\Deal;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CrmController extends Controller
{
    /**
     * Display the CRM dashboard.
     */
    public function index()
    {
        $stats = [
            'total_contacts' => Contact::count(),
            'total_companies' => Company::count(),
            'total_deals' => Deal::count(),
            'active_tasks' => Task::whereIn('status', ['To Do', 'In Progress'])->count(),
            'deals_value' => Deal::where('stage', '!=', 'Closed Lost')->sum('amount'),
            'won_deals_value' => Deal::where('stage', 'Closed Won')->sum('amount'),
        ];

        $recent_contacts = Contact::with('company')
            ->latest()
            ->limit(5)
            ->get();

        $recent_deals = Deal::with(['contact', 'company'])
            ->latest()
            ->limit(5)
            ->get();

        $upcoming_tasks = Task::whereIn('status', ['To Do', 'In Progress'])
            ->orderBy('due_date')
            ->limit(5)
            ->get();
        // The related_name is automatically appended via the model accessor

        $deal_stages = Deal::select('stage', DB::raw('count(*) as count'))
            ->groupBy('stage')
            ->get();

        return Inertia::render('welcome', [
            'stats' => $stats,
            'recent_contacts' => $recent_contacts,
            'recent_deals' => $recent_deals,
            'upcoming_tasks' => $upcoming_tasks,
            'deal_stages' => $deal_stages,
        ]);
    }
}