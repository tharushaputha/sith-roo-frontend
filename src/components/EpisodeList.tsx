import { supabase } from '@/lib/supabaseClient';
import { Edit, Trash2 } from 'lucide-react';
import DeleteEpisodeButton from './DeleteEpisodeButton'; // පසුව සාදමු

async function fetchAllEpisodes() {
    const { data: episodes, error } = await supabase
        .from('ape_katha')
        .select('episode_id, title, episode_number, created_at, is_featured');
    
    if (error) {
        console.error("Error fetching episodes:", error);
        return [];
    }
    return episodes;
}

export default async function EpisodeList() {
    const episodes = await fetchAllEpisodes();

    if (episodes.length === 0) {
        return <div className="text-center py-10 text-gray-500">No episodes found.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Episode Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {episodes.map((ep: any) => (
                        <tr key={ep.episode_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071952]">{ep.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ep.episode_number}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ep.is_featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {ep.is_featured ? 'YES' : 'NO'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="text-[#071952] hover:text-[#FFC300] mr-3 disabled:opacity-50" disabled>
                                    <Edit size={18} />
                                </button>
                                {/* Delete Button - Client Component */}
                                {/* <DeleteEpisodeButton episodeId={ep.episode_id} /> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}