// src/components/FeaturedBooks.tsx
import { fetchFeaturedBooks } from '@/lib/data';
import BookCard from './BookCard'; // BookCard component එක import කරන්න

export default async function FeaturedBooks({ limit, isSidebar = false }: { limit: number; isSidebar?: boolean }) {
    const books = await fetchFeaturedBooks(limit);

    if (books.length === 0) {
        return <div className="p-4 text-center text-gray-500">No featured books currently available.</div>;
    }

    // Sidebar නම් 1 Column, Home page නම් 3 Columns (Responsive)
    return (
        <div className={`grid gap-6 ${isSidebar ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3'}`}>
            {books.map((book: any) => (
                <BookCard key={book.book_id} book={book} isSidebar={isSidebar} />
            ))}
        </div>
    );
}