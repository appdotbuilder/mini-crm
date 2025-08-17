<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDealRequest;
use App\Http\Requests\UpdateDealRequest;
use App\Models\Deal;
use App\Models\Contact;
use App\Models\Company;
use Inertia\Inertia;

class DealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deals = Deal::with(['contact', 'company'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('deals/index', [
            'deals' => $deals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $contacts = Contact::orderBy('name')->get(['id', 'name']);
        $companies = Company::orderBy('name')->get(['id', 'name']);
        
        return Inertia::render('deals/create', [
            'contacts' => $contacts,
            'companies' => $companies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDealRequest $request)
    {
        $deal = Deal::create($request->validated());

        return redirect()->route('deals.show', $deal)
            ->with('success', 'Deal created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Deal $deal)
    {
        $deal->load(['contact', 'company', 'tasks']);
        
        return Inertia::render('deals/show', [
            'deal' => $deal
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deal $deal)
    {
        $contacts = Contact::orderBy('name')->get(['id', 'name']);
        $companies = Company::orderBy('name')->get(['id', 'name']);
        
        return Inertia::render('deals/edit', [
            'deal' => $deal,
            'contacts' => $contacts,
            'companies' => $companies
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDealRequest $request, Deal $deal)
    {
        $deal->update($request->validated());

        return redirect()->route('deals.show', $deal)
            ->with('success', 'Deal updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deal $deal)
    {
        $deal->delete();

        return redirect()->route('deals.index')
            ->with('success', 'Deal deleted successfully.');
    }
}