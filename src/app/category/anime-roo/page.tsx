import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Download } from 'lucide-react';

export const metadata = {
    title: 'Anime රූ | රූපමය නවකතා සහ චිත්‍ර - Sith Roo',
};

async function fetchAnimeImages() {
    // anime_roo_images Table එකෙන් Images Fetch කිරීම
    const { data: images, error } = await supabase
        .from('anime_roo_images')
        .select('*') 
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching Anime Roo images:", error);
        return [];
    }
    return images;
}

export default async function AnimeRooPage() {
    const images = await fetchAnimeImages();

    return (
        <div className="container mx-auto px-4 md:px-8 py-10">
            
            <h1 className="text-4xl font-extrabold text-[#071952] mb-4">🖼️ Anime රූ</h1>
            <p className="text-gray-600 mb-10">උසස් තත්ත්වයේ රූපමය නවකතා සහ චිත්‍ර එකතුව. {images.length} චිත්‍ර ඇත.</p>

            {images.length === 0 ? (
                <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg border">
                    <p className="text-xl font-semibold">දැනට Anime රූ යටතේ කිසිදු චිත්‍රයක් නැත.</p>
                </div>
            ) : (
                // Image Cards භාවිතයෙන් Responsive Grid එකක්
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {images.map((img: any) => (
                        <div key={img.image_id} className="relative bg-white rounded-xl shadow-lg overflow-hidden group">
                            
                            {/* Required Plan Tag */}
                            {img.required_plan !== 'Free' && (
                                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md z-10">
                                    {img.required_plan.toUpperCase()}
                                </span>
                            )}

                            <img 
                                src={img.image_url || '/placeholder-image.png'} 
                                alt={img.title} 
                                className="w-full h-48 object-cover transition duration-300 group-hover:scale-105" 
                            />
                            
                            <div className="p-3 text-center">
                                <h4 className="text-lg font-bold text-[#071952] line-clamp-1">{img.title}</h4>
                                <p className="text-xs text-gray-500">By: {img.author || 'නොදන්නා'}</p>
                            </div>

                            {/* Download Button (Overlay) */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <Link 
                                    href={img.image_url} // ⚠️ Download Logic පසුව සකස් කළ යුතුයි
                                    target="_blank"
                                    className="bg-[#FFC300] text-[#071952] p-3 rounded-full hover:bg-[#D4A700] transition"
                                >
                                    <Download size={24} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}