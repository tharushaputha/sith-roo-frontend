import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import { Star } from 'lucide-react'; 
import BookPageView from '@/components/BookPageView'; 
import { checkUserSubscription } from '@/lib/data'; 
import Link from 'next/link';
import React from 'react';

// 🛑🛑🛑 Final Solution: Inline Type Definition භාවිතය 🛑🛑🛑
type BookPageProps = { 
    params: { bookId: string }; 
    searchParams: { view?: string }; 
};

// ... (Rest of the functions) ...
// ... (Your existing code) ...

// 🛑🛑 Component අර්ථ දැක්වීම (Type එක කෙලින්ම යොදමු) 🛑🛑
export default async function BookDetailPage({ params, searchParams }: BookPageProps) {
    // ... (rest of the logic) ...
    // Note: The body of the function remains the same, only the props definition changes.
    // ...
    const book = await fetchBookDetails(params.bookId);
    // ...
    // Final JSX return...
    return (
        <div className="container mx-auto px-4 md:px-8 py-10">
            {/* ... Content Structure is here ... */}
        </div>
    );
}