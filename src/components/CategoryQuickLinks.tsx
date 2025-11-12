// src/components/CategoryQuickLinks.tsx
import Link from 'next/link';

const categories = [
    { name: 'Hangum රූ', slug: 'hangum-roo', icon: '📖', description: 'සම්පූර්ණ පොත් එකතුව' },
    { name: 'Anime රූ', slug: 'anime-roo', icon: '🖼️', description: 'රූපමය නවකතා සහ චිත්‍ර' },
    { name: 'අපේ කතා', slug: 'ape-katha', icon: '✍️', description: 'දිනපතා නව කතාංග' },
    { name: 'සිතුවිලි', slug: 'sithuwili', icon: '💭', description: 'දෛනික ආශ්වාදජනක වදන්' },
];

export default function CategoryQuickLinks() {
  return (
    // Mobile: 1 Column, Tablet/Desktop: 4 Columns
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <Link 
          key={cat.slug}
          href={`/category/${cat.slug}`} 
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center space-y-3 border-b-4 border-[#071952]"
        >
          <div className="text-6xl text-[#071952]">{cat.icon}</div>
          <h4 className="text-xl font-bold text-gray-900">{cat.name}</h4>
          <p className="text-sm text-gray-500 text-center">{cat.description}</p>
        </Link>
      ))}
    </div>
  );
}