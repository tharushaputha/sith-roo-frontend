import { supabase } from '@/lib/supabaseClient';

export const metadata = {
    title: 'සිතුවිලි | දෛනික ආශ්වාදජනක වදන් - Sith Roo',
};

async function fetchAllThoughts() {
    // 🛑 daily_thoughts Table එකෙන් සියලුම සිතුවිලි Fetch කිරීම
    const { data: thoughts, error } = await supabase
        .from('daily_thoughts')
        .select('*')
        .order('thought_date', { ascending: false });

    if (error) {
        console.error("Error fetching thoughts:", error);
        return [];
    }
    return thoughts;
}

export default async function SithuwiliPage() {
    const thoughts = await fetchAllThoughts();

    return (
        <div className="container mx-auto px-4 md:px-8 py-10 max-w-4xl">
            
            <h1 className="text-4xl font-extrabold text-[#071952] mb-4">💭 සිතුවිලි</h1>
            <p className="text-gray-600 mb-10">දවසින් දවස ඔබට නව ජීවයක් දෙන ආශ්වාදජනක වදන්.</p>

            <div className="space-y-6">
                {thoughts.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border">No thoughts found.</div>
                ) : (
                    thoughts.map((thought: any) => (
                        <div key={thought.thought_id} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#FFC300]">
                            <p className="text-xl italic text-gray-800 leading-relaxed">
                                &ldquo;{thought.thought_text}&rdquo;
                            </p>
                            <p className="text-sm text-gray-500 mt-3 text-right">
                                - {new Date(thought.thought_date).toDateString()}
                            </p>
                        </div>
                    ))
                )}
            </div>
            
        </div>
    );
}