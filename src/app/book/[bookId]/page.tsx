import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import { Star, BookOpen } from 'lucide-react';
import React from 'react';

// ✅ Explicit props type
type BookDetailPageProps = {
  params: { bookId: string };
};

// Supabase fetch
async function fetchBookDetails(bookId: string) {
  const { data: book, error } = await supabase
    .from('books')
    .select('*')
    .eq('book_id', bookId)
    .single();

  if (error || !book) redirect('/books'); // redirect if not found
  return book;
}

// Metadata for SEO
export async function generateMetadata({ params }: { params: { bookId: string } }) {
  const book = await fetchBookDetails(params.bookId);
  if (!book) return { title: 'Book Not Found' };
  return { title: `${book.title} - Sith Roo` };
}

// Main component
export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { bookId } = params;
  const book = await fetchBookDetails(bookId);

  const ratingStars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={20}
      fill={i < Math.round(book.rating || 0) ? '#FFC300' : 'none'}
      color="#FFC300"
    />
  ));

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white p-8 rounded-xl shadow-2xl">
        {/* Book Cover */}
        <div className="lg:col-span-1 flex justify-center">
          <img
            src={book.cover_url || '/placeholder-book.png'}
            alt={book.title}
            className="w-full max-w-xs rounded-xl shadow-2xl"
          />
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-extrabold text-[#071952]">{book.title}</h1>
          <h2 className="text-xl font-semibold text-gray-700">Author: {book.author}</h2>

          <div className="flex items-center space-x-2">
            <div className="flex space-x-0.5">{ratingStars}</div>
            <span className="text-gray-500">({book.rating.toFixed(1)}/5)</span>
          </div>

          <p className="text-lg text-gray-800">{book.description || 'No description available.'}</p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500">
        <BookOpen size={20} className="inline-block mr-2" />
        End of Book Details
      </div>
    </div>
  );
}
