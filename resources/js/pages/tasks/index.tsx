import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Plus, Calendar, Link as LinkIcon } from 'lucide-react';

interface Task {
    id: number;
    description: string;
    due_date: string;
    status: string;
    related_type: string;
    related_name: string;
    created_at: string;
}

interface Props {
    tasks: {
        data: Task[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'To Do':
            return 'bg-red-100 text-red-800';
        case 'In Progress':
            return 'bg-yellow-100 text-yellow-800';
        case 'Completed':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getPriorityFromDueDate = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Overdue', color: 'text-red-600' };
    if (diffDays === 0) return { label: 'Due Today', color: 'text-orange-600' };
    if (diffDays === 1) return { label: 'Due Tomorrow', color: 'text-yellow-600' };
    if (diffDays <= 7) return { label: `Due in ${diffDays} days`, color: 'text-blue-600' };
    return { label: `Due ${due.toLocaleDateString()}`, color: 'text-gray-600' };
};

export default function TasksIndex({ tasks }: Props) {
    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
                        <p className="text-sm text-gray-600">
                            Stay organized with your follow-ups and action items
                        </p>
                    </div>
                    <Link href="/tasks/create">
                        <Button>
                            <Plus className="w-4 h-4" />
                            Add Task
                        </Button>
                    </Link>
                </div>

                {/* Tasks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.data.map((task) => {
                        const priority = getPriorityFromDueDate(task.due_date);
                        return (
                            <Card key={task.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <CheckSquare className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg line-clamp-2">
                                                    {task.description}
                                                </CardTitle>
                                                <CardDescription>
                                                    <Badge className={`${getStatusColor(task.status)} mr-2`} variant="secondary">
                                                        {task.status}
                                                    </Badge>
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className={`flex items-center space-x-2 text-sm ${priority.color}`}>
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium">{priority.label}</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <LinkIcon className="w-4 h-4" />
                                            <span>
                                                Related to: {task.related_name} 
                                                <span className="text-gray-400 ml-1">
                                                    ({task.related_type})
                                                </span>
                                            </span>
                                        </div>

                                        <div className="text-xs text-gray-400 pt-2">
                                            Created {new Date(task.created_at).toLocaleDateString()}
                                        </div>

                                        <div className="flex space-x-2 pt-4">
                                            <Link href={`/tasks/${task.id}`}>
                                                <Button variant="outline" size="sm" className="flex-1">
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Link href={`/tasks/${task.id}/edit`}>
                                                <Button size="sm" className="flex-1">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Empty State */}
                {tasks.data.length === 0 && (
                    <div className="text-center py-12">
                        <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                        <p className="text-gray-500 mb-6">
                            Stay organized by creating tasks for your contacts and deals.
                        </p>
                        <Link href="/tasks/create">
                            <Button>
                                <Plus className="w-4 h-4" />
                                Add Your First Task
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {tasks.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700">
                                Page {tasks.current_page} of {tasks.last_page}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}