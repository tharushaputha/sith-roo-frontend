// src/app/category/hangum-roo/page.tsx
import { supabase } from '@/lib/supabaseClient';
import BookCard from '@/components/BookCard'; 
import React from 'react';

export const metadata = {
    title: 'Hangum රූ | සම්පූර්ණ පොත් එකතුව - Sith Roo',
};

async function fetchAllHangumRooBooks() {
    const { data: books, error } = await supabase
        .from('books')
        .select('*')
        .eq('category_slug', 'hangum-roo') 
        .order('created_at', { ascending: false }); 

    if (error) {
        console.error("Error fetching Hangum Roo books:", error);
        return [];
    }
    return books;
}

export default async function HangumRooPage() {
    const books = await fetchAllHangumRooBooks();

    return (
        <div className="container mx-auto px-4 md:px-8 py-10">
            
            <h1 className="text-4xl font-extrabold text-[#071952] mb-4">📖 Hangum රූ</h1>
            <p className="text-gray-600 mb-10">සියලුම සම්පූර්ණ පොත් එකතුව. {books.length} පොත් ඇත.</p>

            {books.length === 0 ? (
                <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg border">
                    <p className="text-xl font-semibold">දැනට Hangum රූ යටතේ කිසිදු පොතක් නැත.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {books.map((book: any) => (
                        <BookCard key={book.book_id} book={book} isSidebar={false} />
                    ))}
                </div>
            )}
            
        </div>
    );
}