import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import React from 'react';

// ✅ Local type definition (no PageProps import!)
type EpisodePageProps = {
  params: { bookId: string };
};

// 🧩 Supabase එකෙන් ape_katha table එකේ data fetch කිරීම
async function fetchEpisodeDetails(bookId: string) {
  const { data: episode, error } = await supabase
    .from('ape_katha')
    .select('*')
    .eq('episode_id', bookId)
    .single();

  if (error || !episode) {
    redirect('/category/ape-katha'); // Data නැත්නම් redirect වෙයි
  }

  return episode;
}

// 🧠 Dynamic metadata (SEO සඳහා)
export async function generateMetadata({
  params,
}: {
  params: { bookId: string };
}) {
  const episode = await fetchEpisodeDetails(params.bookId);
  if (!episode) return { title: 'Episode Not Found' };
  return {
    title: `${episode.title} (Ep. ${episode.episode_number}) - Sith Roo`,
  };
}

// 🖼️ Main Page Component
export default async function BookDetailPage({ params }: EpisodePageProps) {
  const { bookId } = params;
  const episode = await fetchEpisodeDetails(bookId);

  // 🧱 Image/Text split logic
  const contentBlocks = episode.story_content?.split('---IMAGE-BREAK---') || [];

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 max-w-4xl">
      {/* Title and Info */}
      <h1 className="text-4xl font-extrabold text-[#071952] mb-2">
        {episode.title}
      </h1>
      <h2 className="text-2xl font-semibold text-red-600 mb-8">
        Episode {episode.episode_number}
      </h2>

      {/* Content */}
      <div className="bg-white p-8 rounded-xl shadow-2xl space-y-8 border-l-4 border-red-500">
        {contentBlocks.length > 0 ? (
          contentBlocks.map((block: string, index: number) => {
            // 🖼️ Image detection
            if (
              block.trim().startsWith('http') ||
              block.trim().startsWith('/images/')
            ) {
              return (
                <div key={index} className="flex justify-center my-6">
                  <img
                    src={block.trim()}
                    alt={`Image for segment ${index}`}
                    className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-xl border border-gray-200"
                  />
                </div>
              );
            } else {
              // 📝 Text section
              return (
                <p
                  key={index}
                  className="text-lg text-gray-800 leading-relaxed indent-8 whitespace-pre-wrap"
                >
                  {block.trim()}
                </p>
              );
            }
          })
        ) : (
          <p className="text-gray-600 italic">No story content available.</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500">
        <BookOpen size={20} className="inline-block mr-2" />
        End of Episode {episode.episode_number}
      </div>
    </div>
  );
}
