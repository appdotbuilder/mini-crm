import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Users, Handshake, CheckSquare, TrendingUp, DollarSign } from 'lucide-react';

interface Company {
    id: number;
    name: string;
    address?: string;
    phone?: string;
    website?: string;
    created_at: string;
}

interface Contact {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: Company;
    created_at: string;
}

interface Deal {
    id: number;
    name: string;
    amount: string;
    stage: string;
    contact: Contact;
    company?: Company;
    created_at: string;
}

interface Task {
    id: number;
    description: string;
    due_date: string;
    status: string;
    related_type: string;
    related_name: string;
    created_at: string;
}

interface Stats {
    total_contacts: number;
    total_companies: number;
    total_deals: number;
    active_tasks: number;
    deals_value: string;
    won_deals_value: string;
}

interface DealStage {
    stage: string;
    count: number;
}

interface Props {
    stats: Stats;
    recent_contacts: Contact[];
    recent_deals: Deal[];
    upcoming_tasks: Task[];
    deal_stages: DealStage[];
    [key: string]: unknown;
}

const getStageColor = (stage: string) => {
    switch (stage) {
        case 'Prospecting':
            return 'bg-blue-100 text-blue-800';
        case 'Qualification':
            return 'bg-yellow-100 text-yellow-800';
        case 'Proposal':
            return 'bg-orange-100 text-orange-800';
        case 'Negotiation':
            return 'bg-purple-100 text-purple-800';
        case 'Closed Won':
            return 'bg-green-100 text-green-800';
        case 'Closed Lost':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

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

const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(num);
};

export default function Welcome({
    stats,
    recent_contacts,
    recent_deals,
    upcoming_tasks,
}: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🤝 Personal CRM
                            </h1>
                            <p className="text-lg text-gray-600 mt-1">
                                Manage your relationships, deals, and tasks in one place
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/login">
                                <Button variant="outline" size="lg">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="lg">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Contacts
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_contacts}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Companies
                            </CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_companies}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Deals
                            </CardTitle>
                            <Handshake className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_deals}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Tasks
                            </CardTitle>
                            <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.active_tasks}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pipeline Value
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.deals_value)}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Won Deals
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.won_deals_value)}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Recent Contacts */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Contacts</CardTitle>
                            <CardDescription>Latest contacts added to your CRM</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recent_contacts.map((contact) => (
                                    <div key={contact.id} className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Users className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{contact.name}</p>
                                            <p className="text-xs text-gray-500">{contact.email}</p>
                                            {contact.company && (
                                                <p className="text-xs text-gray-400">{contact.company.name}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Deals */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Deals</CardTitle>
                            <CardDescription>Your latest deal opportunities</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recent_deals.map((deal) => (
                                    <div key={deal.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <Handshake className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{deal.name}</p>
                                                <p className="text-xs text-gray-500">{deal.contact.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{formatCurrency(deal.amount)}</p>
                                            <Badge className={`text-xs ${getStageColor(deal.stage)}`} variant="secondary">
                                                {deal.stage}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Tasks */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Tasks</CardTitle>
                            <CardDescription>Tasks that need your attention</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {upcoming_tasks.map((task) => (
                                    <div key={task.id} className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                            <CheckSquare className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{task.description}</p>
                                            <p className="text-xs text-gray-500">
                                                Due: {new Date(task.due_date).toLocaleDateString()}
                                            </p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Badge className={`text-xs ${getStatusColor(task.status)}`} variant="secondary">
                                                    {task.status}
                                                </Badge>
                                                <span className="text-xs text-gray-400">
                                                    Related to: {task.related_name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Feature Highlights */}
                <div className="mt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Everything you need to manage relationships
                        </h2>
                        <p className="text-lg text-gray-600">
                            A complete CRM solution to grow your business
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Contact Management</h3>
                            <p className="text-sm text-gray-600">Keep track of all your contacts with detailed profiles and company associations</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Handshake className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Deal Tracking</h3>
                            <p className="text-sm text-gray-600">Monitor your sales pipeline with deal stages and revenue forecasting</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <CheckSquare className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Task Management</h3>
                            <p className="text-sm text-gray-600">Never miss a follow-up with task tracking and due date reminders</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Building2 className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Company Profiles</h3>
                            <p className="text-sm text-gray-600">Organize contacts by company and track business relationships</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to get organized? 🚀
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Start managing your contacts, deals, and tasks today
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link href="/register">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    Sign Up Free
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg">
                                    Login to Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}