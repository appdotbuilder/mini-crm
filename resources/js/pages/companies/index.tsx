import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Plus, Users, Handshake } from 'lucide-react';

interface Company {
    id: number;
    name: string;
    address?: string;
    phone?: string;
    website?: string;
    contacts_count: number;
    deals_count: number;
    created_at: string;
}

interface Props {
    companies: {
        data: Company[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function CompaniesIndex({ companies }: Props) {
    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
                        <p className="text-sm text-gray-600">
                            Manage your business relationships and company profiles
                        </p>
                    </div>
                    <Link href="/companies/create">
                        <Button>
                            <Plus className="w-4 h-4" />
                            Add Company
                        </Button>
                    </Link>
                </div>

                {/* Companies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.data.map((company) => (
                        <Card key={company.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{company.name}</CardTitle>
                                            <CardDescription>
                                                Added {new Date(company.created_at).toLocaleDateString()}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {company.address && (
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            📍 {company.address}
                                        </p>
                                    )}
                                    {company.phone && (
                                        <p className="text-sm text-gray-600">📞 {company.phone}</p>
                                    )}
                                    {company.website && (
                                        <p className="text-sm text-gray-600">
                                            🌐 <a 
                                                href={company.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {company.website}
                                            </a>
                                        </p>
                                    )}
                                    
                                    <div className="flex items-center space-x-4 pt-2">
                                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                                            <Users className="w-4 h-4" />
                                            <span>{company.contacts_count} contacts</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                                            <Handshake className="w-4 h-4" />
                                            <span>{company.deals_count} deals</span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 pt-4">
                                        <Link href={`/companies/${company.id}`}>
                                            <Button variant="outline" size="sm" className="flex-1">
                                                View Details
                                            </Button>
                                        </Link>
                                        <Link href={`/companies/${company.id}/edit`}>
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
                {companies.data.length === 0 && (
                    <div className="text-center py-12">
                        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No companies yet</h3>
                        <p className="text-gray-500 mb-6">
                            Start by adding your first company to organize your business relationships.
                        </p>
                        <Link href="/companies/create">
                            <Button>
                                <Plus className="w-4 h-4" />
                                Add Your First Company
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {companies.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700">
                                Page {companies.current_page} of {companies.last_page}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}