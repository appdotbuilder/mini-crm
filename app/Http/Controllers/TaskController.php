<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\Contact;
use App\Models\Deal;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::latest('due_date')
            ->paginate(10);
        
        // The related_name is automatically appended via the model accessor
        
        return Inertia::render('tasks/index', [
            'tasks' => $tasks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $contacts = Contact::orderBy('name')->get(['id', 'name']);
        $deals = Deal::orderBy('name')->get(['id', 'name']);
        
        return Inertia::render('tasks/create', [
            'contacts' => $contacts,
            'deals' => $deals
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());

        return redirect()->route('tasks.show', $task)
            ->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        // The related_name is automatically appended via the model accessor
        
        return Inertia::render('tasks/show', [
            'task' => $task
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $contacts = Contact::orderBy('name')->get(['id', 'name']);
        $deals = Deal::orderBy('name')->get(['id', 'name']);
        
        return Inertia::render('tasks/edit', [
            'task' => $task,
            'contacts' => $contacts,
            'deals' => $deals
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return redirect()->route('tasks.show', $task)
            ->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Task deleted successfully.');
    }
}