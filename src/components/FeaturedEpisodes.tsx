// src/components/FeaturedEpisodes.tsx
import { fetchFeaturedEpisodes } from '@/lib/data';
import Link from 'next/link';

export default async function FeaturedEpisodes({ limit }: { limit: number }) {
    const episodes = await fetchFeaturedEpisodes(limit);

    if (episodes.length === 0) {
        return <div className="p-4 text-center text-gray-500">No new episodes published recently.</div>;
    }

    return (
        <div className="space-y-4">
            {episodes.map((ep: any) => (
                <Link 
                    key={ep.episode_id} 
                    href={`/episode/${ep.episode_id}`}
                    className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition border-l-4 border-red-500 hover:border-red-700"
                >
                    <h4 className="text-lg font-bold text-[#071952] line-clamp-1">{ep.title} (Ep. {ep.episode_number})</h4>
                    <p className="text-sm text-gray-500">Published: {new Date(ep.created_at).toLocaleDateString()}</p>
                </Link>
            ))}
        </div>
    );
}