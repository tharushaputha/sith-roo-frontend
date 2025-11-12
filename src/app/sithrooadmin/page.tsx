// src/app/sithrooadmin/page.tsx
import { supabase } from '@/lib/supabaseClient';
import AdminDashboardContent from '@/components/AdminDashboardContent'; 
import { redirect } from 'next/navigation';

// 🛑🛑🛑 ඔබගේ සත්‍ය Admin Email එක මෙහි යොදන්න 🛑🛑🛑
const ADMIN_EMAIL = 'admin@yourdomain.com'; // ⚠️ උදාහරණයක් ලෙස: 'sithroo.admin@gmail.com' ⚠️

export default async function AdminPage() {
    
    // 1. Auth Check
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login'); // Not logged in
    }
    
    // 2. 🟢 සරල කරන ලද Admin Email Check
    // Email එක Hardcoded Admin Email එකට සමානදැයි පරීක්ෂා කරන්න
    const isHardcodedAdmin = user.email === ADMIN_EMAIL;
    
    // ⛔ Unauthorized Access
    if (!isHardcodedAdmin) {
        redirect('/'); // Redirect to Home
    }
    
    // ✅ Admin Access - Dashboard Content එක පෙන්වන්න
    return (
        <AdminDashboardContent /> 
    );
}