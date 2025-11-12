// src/components/DailyThought.tsx
import { fetchDailyThought } from '@/lib/data'; 

export default async function DailyThought() {
  const thoughtData = await fetchDailyThought(); 
  const thoughtText = thoughtData?.thought_text || "සාර්ථකත්වයට යන මාවත සැමවිටම විවෘතයි. සිත් රූ වෙතින් සුබ දවසක්.";

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl border-4 border-[#FFC300] shadow-2xl transition duration-500">
      <h3 className="text-xl font-bold text-[#071952] mb-4">Daily Thought</h3>
      <p className="text-4xl italic text-gray-800 leading-snug border-l-4 border-gray-300 pl-4">
        &ldquo;{thoughtText}&rdquo; 
      </p>
      <p className="text-right text-base mt-6 text-gray-500">- Sith Roo Team</p>
    </div>
  );
}