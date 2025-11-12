// src/components/PaymentForm.tsx
'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentForm({ selectedPlan }: { selectedPlan: string }) {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState<number | ''>('');
    const [slipFile, setSlipFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSlipFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!slipFile || !amount) {
            setMessage('Error: Please fill all fields and upload the payment slip.');
            setLoading(false);
            return;
        }

        let slipUrl = null;
        let userId = null;
        
        try {
            // 0. User ID ලබා ගැනීම
            const { data: { user } } = await supabase.auth.getUser();
            if (user) userId = user.id;

            // 1. 🖼️ Slip Image එක Supabase Storage වෙත Upload කරන්න
            const fileExt = slipFile.name.split('.').pop();
            const fileName = `${Date.now()}-${user?.id || 'anon'}.${fileExt}`;
            const filePath = `payment_slips/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('sithroo_assets') // ⚠️ Storage Bucket එකේ නම
                .upload(filePath, slipFile);

            if (uploadError) throw uploadError;

            // Public URL එක ලබා ගන්න
            const { data: publicUrl } = supabase.storage
                .from('sithroo_assets')
                .getPublicUrl(filePath);
            slipUrl = publicUrl.publicUrl;


            // 2. 📚 Submission Database එකට ඇතුළත් කරන්න
            const { error: insertError } = await supabase
                .from('payment_submissions')
                .insert({
                    user_id: userId, // User logged in නම් ID එක යවයි
                    user_email: email, 
                    plan_requested: selectedPlan,
                    amount_paid: amount,
                    slip_image_url: slipUrl,
                    status: 'Pending'
                });

            if (insertError) throw insertError;

            setMessage('✅ Payment slip submitted successfully! Admin will review shortly.');
            // Form clear
            setEmail('');
            setAmount('');
            setSlipFile(null);
            router.refresh(); 

        } catch (error: any) {
            setMessage(`❌ Submission Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-red-600">
            <h3 className="text-2xl font-bold text-red-600 mb-6">Submit Payment for {selectedPlan} Plan</h3>
            
            {message && (
                <div className={`p-3 rounded-lg font-medium mb-4 ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email (User ID නොමැති නම්) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Your Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                           className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5" />
                </div>
                
                {/* Amount Paid */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Amount Paid (Rs.)</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} required min="500"
                           className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5" />
                </div>

                {/* Slip Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Payment Slip Image</label>
                    <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} required
                           className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
                </div>

                <button type="submit" disabled={loading}
                        className="w-full bg-[#071952] text-white py-3 rounded-lg font-bold hover:bg-[#20496A] transition disabled:opacity-50">
                    {loading ? 'Submitting...' : `Confirm Submission for ${selectedPlan}`}
                </button>
            </form>
        </div>
    );
}