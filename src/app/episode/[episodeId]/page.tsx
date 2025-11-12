import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import { BookOpen } from 'lucide-react';

export async function generateMetadata({ params }: { params: { episodeId: string } }) {
    const episode = await fetchEpisodeDetails(params.episodeId);
    if (!episode) return { title: 'Episode Not Found' };
    return { title: `${episode.title} (Ep. ${episode.episode_number}) - Sith Roo` };
}

async function fetchEpisodeDetails(episodeId: string) {
    // 🛑 ape_katha Table එකෙන් Single Episode Fetch කිරීම
    const { data: episode, error } = await supabase
        .from('ape_katha')
        .select('*')
        .eq('episode_id', episodeId)
        .single();

    if (error || !episode) {
        redirect('/category/ape-katha'); 
    }
    return episode;
}

export default async function EpisodeDetailPage({ params }: { params: { episodeId: string } }) {
    const episode = await fetchEpisodeDetails(params.episodeId);

    // 🛑 1. Image සහ Text සඳහා Simple Formatting Logic
    // අපි කතාවේ content එක Image/Text ලෙස වෙන් කිරීමට 
    // විශේෂිත delimiter (උදා: [IMG_URL] හෝ [IMG] ) එකක් යොදා ගනිමු
    const contentBlocks = episode.story_content.split('---IMAGE-BREAK---');
    
    return (
        <div className="container mx-auto px-4 md:px-8 py-10 max-w-4xl">
            
            <h1 className="text-4xl font-extrabold text-[#071952] mb-2">{episode.title}</h1>
            <h2 className="text-2xl font-semibold text-red-600 mb-8">Episode {episode.episode_number}</h2>

            <div className="bg-white p-8 rounded-xl shadow-2xl space-y-8 border-l-4 border-red-500">
                
                {contentBlocks.map((block: string, index: number) => {
                    // Block එක Image URL එකක්දැයි පරීක්ෂා කිරීම
                    if (block.trim().startsWith('http') || block.trim().startsWith('/images/')) {
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
                        // Text Block (Paragraph)
                        return (
                            <p key={index} className="text-lg text-gray-800 leading-relaxed indent-8 whitespace-pre-wrap">
                                {block.trim()}
                            </p>
                        );
                    }
                })}

            </div>

            <div className="mt-8 text-center text-gray-500">
                <BookOpen size={20} className="inline-block mr-2" />
                End of Episode {episode.episode_number}
            </div>
        </div>
    );
}