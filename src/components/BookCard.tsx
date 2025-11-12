// src/components/BookCard.tsx
import Link from 'next/link';
import { Star } from 'lucide-react'; 

interface Book {
    book_id: string;
    title: string;
    author: string;
    required_plan: 'Free' | 'Plus' | 'Pro';
    cover_url: string;
    rating: number;
}

export default function BookCard({ book, isSidebar = false }: { book: Book; isSidebar?: boolean }) {
    
    // Rating Stars
    const ratingStars = Array.from({ length: 5 }, (_, i) => (
        <Star 
            key={i} 
            size={16} 
            fill={i < Math.round(book.rating || 0) ? "#FFC300" : "none"} // රන්වන් පැහැයෙන් fill කරන්න
            strokeWidth={1.5}
            color="#FFC300" 
        />
    ));

    // Subscription Tag
    const planTag = (plan: string) => {
        if (plan === 'Pro') return <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full absolute top-2 right-2 shadow-md">PRO</span>;
        if (plan === 'Plus') return <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full absolute top-2 right-2 shadow-md">PLUS</span>;
        return null;
    };

    return (
        <Link href={`/book/${book.book_id}`} 
              className={`block relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden group 
                          ${isSidebar ? 'w-full' : 'w-full'}`}>
            
            {planTag(book.required_plan)}

            <div className="p-4 flex flex-col items-center text-center">
                {/* Book Cover Image */}
                <img 
                    src={book.cover_url || '/placeholder-book.png'} 
                    alt={book.title} 
                    // Sidebar එකේදී රූපය කුඩා කරන්න
                    className={`w-full object-cover rounded-lg shadow-lg mb-3 group-hover:opacity-90 transition duration-300 ${isSidebar ? 'h-32' : 'h-48'}`}
                    style={{ maxWidth: isSidebar ? '100px' : 'none' }}
                />

                <h3 className="text-lg font-bold text-[#071952] line-clamp-2">{book.title || 'Untitled'}</h3>
                <p className="text-xs text-gray-500 mt-1">{book.author || 'Unknown Author'}</p>
                
                {/* Rating Stars */}
                <div className="flex mt-2 space-x-0.5">
                    {ratingStars}
                </div>
            </div>
        </Link>
    );
}