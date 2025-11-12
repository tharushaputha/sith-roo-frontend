// src/components/AdminDashboardContent.tsx
import { supabase } from '@/lib/supabaseClient';

// Dashboard එකේ Statistics Fetching Function
async function fetchAdminStats() {
    // 1. Total Books Count
    const { count: bookCount } = await supabase.from('books').select('*', { count: 'exact', head: true });
    
    // 2. Pending Payments Count
    const { count: paymentCount } = await supabase
        .from('payment_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending');

    // 3. Active Pro Users Count (User Profiles Table එකෙන්)
    const { count: proUserCount } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true })
        .eq('current_plan', 'Pro');

    return {
        totalBooks: bookCount || 0,
        pendingPayments: paymentCount || 0,
        proUsers: proUserCount || 0
    };
}

export default async function AdminDashboardContent() {
    const stats = await fetchAdminStats();

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 border-b pb-2">Overview Statistics</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                
                <StatsCard title="Total Books" value={stats.totalBooks} icon="📖" />
                <StatsCard title="Active Pro Users" value={stats.proUsers} icon="👑" />
                <StatsCard title="Pending Payments" value={stats.pendingPayments} icon="💸" isPending={true} />
                
            </div>
        </div>
    );
}

// Stats Card Component
const StatsCard = ({ title, value, icon, isPending = false }: { title: string, value: number, icon: string, isPending?: boolean }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-8 ${isPending ? 'border-red-500' : 'border-[#FFC300]'} transition hover:shadow-xl`}>
        <div className="text-4xl mb-2">{icon}</div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h4 className="text-3xl font-extrabold text-[#071952] mt-1">{value}</h4>
    </div>
);