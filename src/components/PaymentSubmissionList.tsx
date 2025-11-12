// src/components/PaymentSubmissionList.tsx
'use client';
import { supabase } from '@/lib/supabaseClient';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Interface for Payments (Typescript සඳහා)
interface Payment {
    submission_id: string;
    user_id: string; // auth.users(id) හා සම්බන්ධයි
    user_email: string;
    plan_requested: 'Plus' | 'Pro';
    amount_paid: number;
    slip_image_url: string;
    submission_date: string;
}

export default function PaymentSubmissionList({ payments }: { payments: Payment[] }) {
    const router = useRouter();
    const [processing, setProcessing] = useState<boolean>(false);

    const handleUpdateStatus = async (payment: Payment, status: 'Approved' | 'Rejected') => {
        setProcessing(true);
        
        try {
            // 1. Payment Submissions Table එක update කරන්න
            const { error: subError } = await supabase
                .from('payment_submissions')
                .update({ status: status })
                .eq('submission_id', payment.submission_id);

            if (subError) throw subError;

            // 2. Status 'Approved' නම්, User Profile එක update කරන්න
            if (status === 'Approved') {
                const expiryDate = new Date();
                expiryDate.setMonth(expiryDate.getMonth() + 1); // මාසයක් සඳහා Access
                
                const { error: profileError } = await supabase
                    .from('user_profiles')
                    .update({ 
                        current_plan: payment.plan_requested, 
                        plan_expiry_date: expiryDate.toISOString() 
                    })
                    .eq('id', payment.user_id);

                if (profileError) throw profileError;
            }
            
            alert(`Payment submission ${status} successfully!`);
            router.refresh(); // List එක refresh කරන්න
            
        } catch (error: any) {
             alert(`Error processing payment: ${error.message}`);
        } finally {
            setProcessing(false);
        }
    };

    if (payments.length === 0) {
        return <div className="text-center py-10 text-gray-500">No pending payment submissions found.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slip</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((p) => (
                        <tr key={p.submission_id}>
                            <td className="px-6 py-4 text-sm font-medium text-[#071952]">{p.user_email}</td>
                            <td className="px-6 py-4 text-sm font-semibold">{p.plan_requested}</td>
                            <td className="px-6 py-4 text-sm text-green-700">Rs. {p.amount_paid}</td>
                            <td className="px-6 py-4 text-sm">
                                <a href={p.slip_image_url} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
                                    View Slip
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                {/* Approve Button */}
                                <button 
                                    onClick={() => handleUpdateStatus(p, 'Approved')}
                                    disabled={processing}
                                    className="text-green-600 hover:text-green-800 disabled:opacity-50"
                                >
                                    <CheckCircle size={20} />
                                </button>
                                {/* Reject Button */}
                                <button 
                                    onClick={() => handleUpdateStatus(p, 'Rejected')}
                                    disabled={processing}
                                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                >
                                    <XCircle size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}