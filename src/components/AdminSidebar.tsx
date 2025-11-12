// src/components/AdminSidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminLinks = [
    { name: 'Dashboard Overview', href: '/sithrooadmin' },
    { name: 'Manage Books', href: '/sithrooadmin/books' },
    { name: 'Manage Episodes', href: '/sithrooadmin/episodes' },
    { name: 'Pending Payments', href: '/sithrooadmin/payments' },
    { name: 'Daily Thought Editor', href: '/sithrooadmin/thought' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#FFC300] sticky top-28">
            <h3 className="text-xl font-bold text-[#071952] mb-4">Navigation</h3>
            <nav className="space-y-2">
                {adminLinks.map((link) => (
                    <Link 
                        key={link.name} 
                        href={link.href}
                        // Active Link සඳහා Background එක වෙනස් කරන්න
                        className={`block px-4 py-2 rounded-lg transition font-medium ${
                            pathname === link.href ? 'bg-[#071952] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}