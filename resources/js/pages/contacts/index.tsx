import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus, Building2, Mail, Phone } from 'lucide-react';

interface Company {
    id: number;
    name: string;
}

interface Contact {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: Company;
    created_at: string;
}

interface Props {
    contacts: {
        data: Contact[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function ContactsIndex({ contacts }: Props) {
    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
                        <p className="text-sm text-gray-600">
                            Manage your contact relationships and personal connections
                        </p>
                    </div>
                    <Link href="/contacts/create">
                        <Button>
                            <Plus className="w-4 h-4" />
                            Add Contact
                        </Button>
                    </Link>
                </div>

                {/* Contacts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contacts.data.map((contact) => (
                        <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 font-semibold">
                                                {contact.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{contact.name}</CardTitle>
                                            <CardDescription>
                                                {contact.company ? contact.company.name : 'Independent'}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <a 
                                            href={`mailto:${contact.email}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {contact.email}
                                        </a>
                                    </div>
                                    
                                    {contact.phone && (
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            <a 
                                                href={`tel:${contact.phone}`}
                                                className="hover:underline"
                                            >
                                                {contact.phone}
                                            </a>
                                        </div>
                                    )}

                                    {contact.company && (
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Building2 className="w-4 h-4" />
                                            <span>{contact.company.name}</span>
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-400 pt-2">
                                        Added {new Date(contact.created_at).toLocaleDateString()}
                                    </div>

                                    <div className="flex space-x-2 pt-4">
                                        <Link href={`/contacts/${contact.id}`}>
                                            <Button variant="outline" size="sm" className="flex-1">
                                                View Details
                                            </Button>
                                        </Link>
                                        <Link href={`/contacts/${contact.id}/edit`}>
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
                {contacts.data.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
                        <p className="text-gray-500 mb-6">
                            Start building your network by adding your first contact.
                        </p>
                        <Link href="/contacts/create">
                            <Button>
                                <Plus className="w-4 h-4" />
                                Add Your First Contact
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {contacts.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700">
                                Page {contacts.current_page} of {contacts.last_page}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}