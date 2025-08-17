import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Handshake, Plus, Users, Building2 } from 'lucide-react';

interface Company {
    id: number;
    name: string;
}

interface Contact {
    id: number;
    name: string;
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

interface Props {
    deals: {
        data: Deal[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
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

const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(num);
};

export default function DealsIndex({ deals }: Props) {
    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Deals</h1>
                        <p className="text-sm text-gray-600">
                            Track your sales pipeline and revenue opportunities
                        </p>
                    </div>
                    <Link href="/deals/create">
                        <Button>
                            <Plus className="w-4 h-4" />
                            Add Deal
                        </Button>
                    </Link>
                </div>

                {/* Deals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deals.data.map((deal) => (
                        <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Handshake className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{deal.name}</CardTitle>
                                            <CardDescription>
                                                <Badge className={`${getStageColor(deal.stage)} mr-2`} variant="secondary">
                                                    {deal.stage}
                                                </Badge>
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-green-600">
                                            {formatCurrency(deal.amount)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>Contact: {deal.contact.name}</span>
                                    </div>
                                    
                                    {deal.company && (
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Building2 className="w-4 h-4" />
                                            <span>Company: {deal.company.name}</span>
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-400 pt-2">
                                        Created {new Date(deal.created_at).toLocaleDateString()}
                                    </div>

                                    <div className="flex space-x-2 pt-4">
                                        <Link href={`/deals/${deal.id}`}>
                                            <Button variant="outline" size="sm" className="flex-1">
                                                View Details
                                            </Button>
                                        </Link>
                                        <Link href={`/deals/${deal.id}/edit`}>
                                            <Button size="sm" className="flex-1">
                                                Edit
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {deals.data.length === 0 && (
                    <div className="text-center py-12">
                        <Handshake className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No deals yet</h3>
                        <p className="text-gray-500 mb-6">
                            Start tracking your sales opportunities by adding your first deal.
                        </p>
                        <Link href="/deals/create">
                            <Button>
                                <Plus className="w-4 h-4" />
                                Add Your First Deal
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {deals.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700">
                                Page {deals.current_page} of {deals.last_page}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}