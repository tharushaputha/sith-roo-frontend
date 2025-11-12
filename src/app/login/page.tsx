// src/app/login/page.tsx
'use client'; 
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [isLoginView, setIsLoginView] = useState(true); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setMessage(`Login Error: ${error.message}`);
        } else {
            setMessage('Login successful! Redirecting...');
            router.refresh(); 
            router.push('/'); // Home Page වෙත යන්න
        }
        setLoading(false);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        if (password !== confirmPassword) {
            setMessage('Error: Passwords do not match!');
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: `${firstName} ${lastName}`,
                },
            },
        });

        if (error) {
            setMessage(`Signup Error: ${error.message}`);
        } else {
            setMessage('Registration successful! Please check your email for the confirmation link.');
            setIsLoginView(true); 
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                <h2 className="text-3xl font-extrabold text-[#071952] mb-4 text-center">
                    {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
                </h2>
                
                {/* Message Box */}
                {message && (
                    <p className={`mt-2 mb-4 text-center font-medium p-3 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={isLoginView ? handleLogin : handleSignup} className="space-y-4">
                    
                    {/* Signup Fields: First Name / Last Name */}
                    {!isLoginView && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fname" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" id="fname" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
                            </div>
                            <div>
                                <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" id="lname" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
                            </div>
                        </div>
                    )}
                    
                    {/* Common Fields: Email / Password */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="user@sithroo.lk" />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="********" />
                    </div>
                    
                    {/* Signup Field: Confirm Password */}
                    {!isLoginView && (
                        <div>
                            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" id="cpassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="********" />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                {/* Toggle Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    {isLoginView ? "Don't have an account? " : "Already have an account? "}
                    <button 
                        onClick={() => { setIsLoginView(!isLoginView); setMessage(''); }}
                        className="text-[#071952] font-semibold hover:underline"
                    >
                        {isLoginView ? 'Register Here' : 'Login Here'}
                    </button>
                </p>
            </div>
        </div>
    );
}