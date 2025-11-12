// src/app/book/[bookId]/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import { Star } from 'lucide-react'; 
import BookPageView from '@/components/BookPageView'; 
import { checkUserSubscription } from '@/lib/data'; 
import Link from 'next/link'; // Link component එක import කරන්න

// Plan Levels සඳහා Simple Rank
const PLAN_RANK: { [key: string]: number } = { 'Free': 0, 'Plus': 1, 'Pro': 2 };

// ... fetchBookDetails function (පෙර තිබූ පරිදි) ...

export default async function BookDetailPage({ params, searchParams }: { params: { bookId: string }, searchParams: { view?: string } }) {
    const book = await fetchBookDetails(params.bookId);
    const { userPlan } = await checkUserSubscription(); 

    const requiredRank = PLAN_RANK[book.required_plan] || 0;
    const userRank = PLAN_RANK[userPlan] || 0;

    const hasAccess = userRank >= requiredRank;
    
    // 1. Reading View Logic
    if (searchParams.view === 'read') {
        
        if (!hasAccess) {
             // Access නැතිනම්, Payment Page එකට යොමු කරන්න
             redirect('/payment?error=access_denied&required=' + book.required_plan); 
        }

        return (
            <div className="container mx-auto px-4 md:px-8 py-10">
                <BookPageView bookTitle={book.title} />
            </div>
        );
    }
    
    // ... (Details View Rendering - Rating Stars Logic) ...

    return (
        <div className="container mx-auto px-4 md:px-8 py-10">
            {/* ... Book Details View ... */}
                
            {/* Read Button & Plan Check */}
            <div className="pt-4 border-t border-gray-100">
                
                {/* 🔴 Read Button Logic */}
                {!hasAccess ? (
                    // Access නැතිනම්, Subscribe කිරීමට Button එක පෙන්වන්න
                    <Link 
                        href="/payment" 
                        className="ml-6 bg-red-500 text-white px-8 py-3 rounded-xl font-extrabold hover:bg-red-600 transition shadow-lg inline-block"
                    >
                        Subscribe to Read ({book.required_plan})
                    </Link>
                ) : (
                    // Access ඇත්නම්, Read Now Button එක පෙන්වන්න
                    <Link 
                        href={`/book/${book.book_id}?view=read`} 
                        className="ml-6 bg-[#FFC300] text-[#071952] px-8 py-3 rounded-xl font-extrabold hover:bg-[#D4A700] transition shadow-lg inline-block"
                    >
                        Read Now
                    </Link>
                )}
            </div>
        </div>
    );
}