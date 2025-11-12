import SubscriptionPlans from '@/components/SubscriptionPlans';

export const metadata = {
    title: 'Subscribe Now | Get Plus or Pro Access - Sith Roo',
};

export default function PaymentPage() {
    return (
        <div className="container mx-auto px-4 md:px-8 py-10">
            <h1 className="text-4xl font-extrabold text-[#071952] mb-4 text-center">
                👑 Sith Roo Subscription Plans
            </h1>
            <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                Plus සහ Pro සැලසුම් තෝරා ගැනීමෙන් අපගේ සියලුම වාරික (Premium) පොත්, රූප සහ විශේෂ කතාංග වෙත අසීමිත ප්‍රවේශයක් ලබා ගන්න.
            </p>

            {/* Subscription Plan Cards */}
            <SubscriptionPlans />
            
            <div className="mt-20 p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">How to Subscribe (Offline Payment)</h2>
                <p className="text-gray-700">
                    1. ඔබේ සැලසුම තෝරා අදාල ගාස්තුව පහත ගිණුමට බැර කරන්න. <br/>
                    2. ගෙවීම් ස්ලිප් එක අප්ලෝඩ් කර Form එක සම්පූර්ණ කරන්න. <br/>
                    3. පැය 24ක් ඇතුළත Admin විසින් ඔබගේ ගිණුම සක්‍රිය කරනු ඇත.
                </p>
                <div className="mt-6 bg-white p-4 rounded-lg shadow-inner inline-block">
                    <p className="font-extrabold text-[#071952]">Bank Account: 1234567890 (BOC)</p>
                    <p className="text-sm">Account Name: Sith Roo Digital Library</p>
                </div>
            </div>
        </div>
    );
}