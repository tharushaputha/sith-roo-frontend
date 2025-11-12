// src/components/AuthButton.tsx
'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User, Crown } from 'lucide-react'; 

export default function AuthButton() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Dropdown Closing Logic (ඔබ කලින් ලබා දුන් කේතය)
    useEffect(() => {
        // ...
    }, []);

    // Auth State Listener (ඔබ කලින් ලබා දුන් කේතය)
    useEffect(() => {
        // ...
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user || null);
                setLoading(false);
            }
        );
        // ...
        return () => {
             authListener.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsDropdownOpen(false);
        router.refresh(); 
        router.push('/');
    };

    if (loading) return <div className="text-white text-sm md:text-base px-3">...</div>;

    if (user) {
        // Logged In User View (Icon and Dropdown)
        return (
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition duration-200 shadow-lg border-2 border-white"
                >
                    <User size={20} color="white" />
                </button>
                
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl overflow-hidden z-50">
                        {/* Admin Dashboard Link */}
                        <Link 
                            href="/sithrooadmin" 
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center px-4 py-3 text-[#071952] hover:bg-gray-100 font-semibold border-b border-gray-100"
                        >
                            <Crown size={18} className="mr-2 text-yellow-600" />
                            Admin Dashboard
                        </Link>
                        
                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 font-semibold"
                        >
                            <LogOut size={18} className="mr-2" />
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        );
    }
    
    return (
        <Link href="/login" className="px-3 py-2 rounded-lg hover:bg-[#20496A] transition text-sm md:text-base border border-transparent hover:border-white">
            Login
        </Link>
    );
}