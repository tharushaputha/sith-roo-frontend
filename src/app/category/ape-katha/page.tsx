import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export const metadata = {
    title: 'අපේ කතා | දිනපතා නව කතාංග - Sith Roo',
};

async function fetchAllEpisodes() {
    // ape_katha Table එකෙන් Episodes Fetch කිරීම
    const { data: episodes, error } = await supabase
        .from('ape_katha')
        .select('*') 
        .order('episode_number', { ascending: false });

    if (error) {
        console.error("Error fetching Ape Katha episodes:", error);
        return [];
    }
    return episodes;
}

export default async function ApeKathaPage() {
    const episodes = await fetchAllEpisodes();

    return (
        <div className="container mx-auto px-4 md:px-8 py-10">
            
            <h1 className="text-4xl font-extrabold text-[#071952] mb-4">✍️ අපේ කතා</h1>
            <p className="text-gray-600 mb-10">සියලුම කතාංග මෙතැනින් කියවන්න. {episodes.length} කතාංග ඇත.</p>

            {episodes.length === 0 ? (
                <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg border">
                    <p className="text-xl font-semibold">දැනට කිසිදු කතාංගයක් නොමැත. ඉක්මනින්ම යාවත්කාලීන වේ.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {episodes.map((ep: any) => (
                        <Link 
                            key={ep.episode_id} 
                            href={`/episode/${ep.episode_id}`} 
                            className="block p-5 bg-white rounded-xl shadow-lg hover:shadow-2xl transition border-l-8 border-red-500 hover:border-red-700"
                        >
                            <h4 className="text-2xl font-bold text-[#071952]">{ep.title} (Ep. {ep.episode_number})</h4>
                            <p className="text-sm text-gray-500 mt-1">Published: {new Date(ep.created_at).toLocaleDateString()}</p>
                            {/* කතාංගයේ කෙටි කොටසක් මෙහි පෙන්විය හැකියි */}
                            <p className="mt-2 text-gray-700 line-clamp-2">{ep.story_content.substring(0, 150)}...</p> 
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}