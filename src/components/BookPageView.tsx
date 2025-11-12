// src/components/BookPageView.tsx
'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

// පිටු Images වල URLs ලැයිස්තුව (පසුව Supabase වෙතින් Fetch වේ)
const DUMMY_PAGES: string[] = [
    // ⚠️ Note: Images are currently hardcoded for design.
    '/images/page_1.jpg', 
    '/images/page_2.jpg',
    '/images/page_3.jpg',
    '/images/page_4.jpg',
    '/images/page_5.jpg',
];

export default function BookPageView({ bookTitle }: { bookTitle: string }) {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const totalPages = DUMMY_PAGES.length;

    const nextPage = () => {
        if (currentPageIndex < totalPages - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const prevPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold text-[#071952] flex items-center">
                <BookOpen size={24} className="mr-2 text-red-500" />
                Reading: {bookTitle} (Page {currentPageIndex + 1} of {totalPages})
            </h2>

            {/* Reading Area */}
            <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg min-h-[600px] border">
                <img 
                    src={DUMMY_PAGES[currentPageIndex]} 
                    alt={`Page ${currentPageIndex + 1}`} 
                    // 🔴 Supiri Design: Image එකේ Quality එක සහ Shadow එක
                    className="max-h-[80vh] w-auto max-w-full shadow-2xl border-2 border-gray-300 rounded-md transition-opacity duration-300"
                />
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center space-x-6 pt-4">
                <button 
                    onClick={prevPage} 
                    disabled={currentPageIndex === 0}
                    className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition disabled:bg-gray-400"
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="text-lg font-semibold text-gray-700">
                    Page {currentPageIndex + 1} / {totalPages}
                </div>

                <button 
                    onClick={nextPage} 
                    disabled={currentPageIndex === totalPages - 1}
                    className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition disabled:bg-gray-400"
                >
                    <ArrowRight size={24} />
                </button>
            </div>
        </div>
    );
}