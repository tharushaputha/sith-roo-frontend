'use client';
import { CheckCircle } from 'lucide-react';
import PaymentForm from './PaymentForm'; // පසුව සාදමු
import { useState } from 'react';

const plans = [
    { name: 'Plus Plan', price: 'Rs. 500', duration: '/ Month', color: 'bg-green-600', features: ['All Plus Books', 'All Episodes', 'Daily Thought Access'], plan_slug: 'Plus' },
    { name: 'Pro Plan', price: 'Rs. 1,000', duration: '/ Month', color: 'bg-red-600', features: ['All Premium Books (PRO)', 'All Plus Books', 'High-Quality Anime Art', 'Early Access'], plan_slug: 'Pro' },
];

export default function SubscriptionPlans() {
    const [selectedPlan, setSelectedPlan] = useState('');

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan) => (
                    <div key={plan.name} className={`bg-white p-8 rounded-xl shadow-2xl border-t-8 ${plan.plan_slug === 'Pro' ? 'border-red-600' : 'border-green-600'} transition transform hover:scale-[1.02]`}>
                        <h2 className="text-3xl font-extrabold text-[#071952] mb-2">{plan.name}</h2>
                        <p className="text-4xl font-extrabold mb-6">{plan.price} <span className="text-lg font-medium text-gray-500">{plan.duration}</span></p>

                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start text-gray-700">
                                    <CheckCircle size={20} className="mr-3 mt-1 text-green-500 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={() => setSelectedPlan(plan.plan_slug)}
                            className={`w-full ${plan.color} text-white py-3 rounded-lg font-bold hover:opacity-90 transition shadow-lg`}>
                            Choose {plan.name}
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Payment Submission Form - Selected Plan එකට අනුව පෙන්වයි */}
            {selectedPlan && (
                <div className="mt-16 max-w-2xl mx-auto">
                    <PaymentForm selectedPlan={selectedPlan} />
                </div>
            )}
        </>
    );
}