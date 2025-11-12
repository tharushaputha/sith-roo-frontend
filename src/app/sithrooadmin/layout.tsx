// src/app/sithrooadmin/layout.tsx

import AdminSidebar from '@/components/AdminSidebar'; 
import { ReactNode } from 'react';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 md:px-8 py-10">
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/5 flex-shrink-0">
                        <AdminSidebar />
                    </div>
                    
                    {/* Content Area */}
                    <div className="lg:w-4/5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}