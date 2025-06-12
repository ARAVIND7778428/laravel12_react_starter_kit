import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';


export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShow(true);
            const timeout = setTimeout(() => setShow(false), 4000);
            return () => clearTimeout(timeout);
        }
    }, [flash]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {flash?.success && show && (
                    <div className="mb-4 max-w-4xl mx-auto bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg shadow">
                        ✅ {flash.success}
                    </div>
                )}
                {flash?.error && show && (
                    <div className="mb-4 max-w-4xl mx-auto bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg shadow">
                        ❌ {flash.error}
                    </div>
                )}
                {children}
            </AppContent>
        </AppShell>
    );
}
