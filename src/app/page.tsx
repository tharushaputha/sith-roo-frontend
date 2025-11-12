// src/app/page.tsx
import React from 'react';
import DailyThought from '@/components/DailyThought';
import CategoryQuickLinks from '@/components/CategoryQuickLinks'; 
import FeaturedBooks from '@/components/FeaturedBooks'; // පසුව සාදමු
import FeaturedEpisodes from '@/components/FeaturedEpisodes'; // පසුව සාදමු

// Home Page එක Server Component එකක් ලෙස
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 md:px-8 pt-10 bg-white"> 
      
      {/* 1. දවසේ සිතුවිල්ල - Hero Section එක */}
      <section className="mb-16">
        {/* DailyThought යනු Server Component එකක් වන අතර Supabase වෙතින් දත්ත ලබා ගනී */}
        <DailyThought />
      </section>

      {/* 2. ප්‍රවර්ග Quick Links */}
      <section className="mb-16">
        <h2 className="text-3xl font-extrabold text-[#071952] mb-8 border-b-2 border-[#FFC300] pb-3">
            Categories
        </h2>
        <CategoryQuickLinks />
      </section>

      {/* 3. නවතම කතාංග සහ විශේෂාංගිත පොත් - Responsive Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* 3a. New Episodes (Lg screens වලදී 2/3 ප්‍රමාණය ගනී) */}
          <section className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-[#071952] mb-6 border-b-2 border-red-500 pb-3">
                ✍️ New Episodes
            </h2>
            <FeaturedEpisodes limit={4} />
          </section>

          {/* 3b. Featured Books (Lg screens වලදී 1/3 ප්‍රමාණය ගනී) */}
          <section className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold text-[#071952] mb-6 border-b-2 border-[#FFC300] pb-3">
                ⭐ Featured Books
            </h2>
            <FeaturedBooks limit={3} isSidebar={true} />
          </section>

      </div>
      
    </div>
  );
}