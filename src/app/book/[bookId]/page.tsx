// src/app/book/[bookId]/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import { Star } from 'lucide-react'; 
import BookPageView from '@/components/BookPageView'; 
import { checkUserSubscription } from '@/lib/data'; 
import Link from 'next/link';

// 🛑🛑🛑 TypeScript Error Fix: නිවැරදි Props Interface 🛑🛑🛑
interface BookDetailPageProps {
    params: {
        bookId: string;
    };
    searchParams: {
        view?: string; // Query parameter එකක් විය හැකියි
    };
}

async function fetchBookDetails(bookId: string) {
    const { data: book, error } = await supabase
        .from('books')
        .select('*')
        .eq('book_id', bookId)
        .single();

    if (error || !book) {
        redirect('/'); 
    }
    return book;
}

// 🛑 Component අර්ථ දැක්වීම 🛑
export default async function BookDetailPage({ params, searchParams }: BookDetailPageProps) {
    const book = await fetchBookDetails(params.bookId);
    const { userPlan } = await checkUserSubscription(); 

    // Plan Levels සඳහා Simple Rank
    const PLAN_RANK: { [key: string]: number } = { 'Free': 0, 'Plus': 1, 'Pro': 2 };

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
    
    // Rating Stars
    const ratingStars = Array.from({ length: 5 }, (_, i) => (
        <Star 
            key={i} 
            size={20} 
            fill={i < Math.round(book.rating || 0) ? "#FFC300" : "none"} 
            color="#FFC300" 
        />
    ));

    return (
        <div className="container mx-auto px-4 md:px-8 py-10">
            {/* Book Details View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white p-8 rounded-xl shadow-2xl">
                
                {/* Book Cover (1/3) */}
                <div className="lg:col-span-1 flex justify-center">
                    <img 
                        src={book.cover_url || '/placeholder-book.png'} 
                        alt={book.title} 
                        className="w-full max-w-xs rounded-xl shadow-2xl"
                    />
                </div>

                {/* Book Details (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-4xl font-extrabold text-[#071952]">{book.title}</h1>
                    <h2 className="text-xl font-semibold text-gray-700">Author: {book.author}</h2>
                    
                    <div className="flex items-center space-x-2">
                        <div className="flex space-x-0.5">{ratingStars}</div>
                        <span className="text-gray-500">({book.rating.toFixed(1)}/5)</span>
                    </div>

                    <p className="text-lg text-gray-800">{book.description || 'No description available.'}</p>

                    {/* Read Button & Plan Check */}
                    <div className="pt-4 border-t border-gray-100">
                        <span className={`px-4 py-2 inline-block rounded-full font-bold text-white shadow-md ${book.required_plan === 'Pro' ? 'bg-red-600' : book.required_plan === 'Plus' ? 'bg-green-600' : 'bg-gray-600'}`}>
                            Plan Required: {book.required_plan}
                        </span>

                        {!hasAccess ? (
                            <Link 
                                href="/payment" 
                                className="ml-6 bg-red-500 text-white px-8 py-3 rounded-xl font-extrabold hover:bg-red-600 transition shadow-lg inline-block"
                            >
                                Subscribe to Read ({book.required_plan})
                            </Link>
                        ) : (
                            <Link 
                                href={`/book/${book.book_id}?view=read`} 
                                className="ml-6 bg-[#FFC300] text-[#071952] px-8 py-3 rounded-xl font-extrabold hover:bg-[#D4A700] transition shadow-lg inline-block"
                            >
                                Read Now
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}