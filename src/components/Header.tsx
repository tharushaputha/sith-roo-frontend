// src/components/Header.tsx
import Link from 'next/link';
import AuthButton from './AuthButton'; 
import { Search } from 'lucide-react'; // Search Icon එකක් mobile සඳහා අවශ්‍යයි

export default function Header() {
    return (
        // Header Padding එක තව ටිකක් වැඩි කරමු (py-4)
        <header className="flex justify-between items-center px-4 md:px-8 py-4 md:py-6 bg-[#071952] text-white shadow-2xl sticky top-0 z-50">
            
            {/* 1. Logo Section */}
            <div className="flex items-center flex-shrink-0">
                <Link href="/">
                    {/* 🔴 වෙනස්කම්: Logo උස mobile h-16, desktop h-20 ලෙස වැඩි කරමු */}
                    <img 
                        src="/logo.png" 
                        alt="Sith Roo Logo" 
                        className="h-16 md:h-20 w-auto cursor-pointer filter brightness-200 transition-transform duration-300 hover:scale-[1.05]" 
                    />
                </Link>
            </div>

            {/* 2. Search Bar - Desktop Only */}
            <div className="flex-grow max-w-xl mx-4 hidden lg:flex"> {/* LG screen වලට පමණක් පෙන්වමු */}
                <div className="flex w-full border-2 border-[#FFC300] rounded-lg overflow-hidden">
                    <input 
                        type="search" 
                        placeholder="Search Books, Authors, Categories..."
                        className="w-full p-3 text-gray-900 placeholder-gray-500 focus:outline-none bg-white"
                    />
                    <button className="bg-[#FFC300] hover:bg-[#D4A700] p-3 transition duration-200 flex items-center justify-center">
                        <span className="text-[#071952] font-bold text-lg">🔍</span>
                    </button>
                </div>
            </div>

            {/* 3. User Navigation (Responsive) */}
            <nav className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
                
                {/* Mobile Search Button (Desktop එකේදී අතුරුදහන් වේ) */}
                <button className="lg:hidden p-2 rounded-full hover:bg-[#20496A] transition">
                    <Search size={22} color="white" />
                </button>

                {/* AuthButton (Login/Logout Icon) */}
                <AuthButton /> 

                {/* Subscription Button (Responsive size) */}
                <Link 
                    href="/payment" 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 md:px-5 md:py-3 rounded-xl transition duration-200 font-bold text-sm md:text-base shadow-lg"
                >
                    Subscribe
                </Link>
                
            </nav>
        </header>
    );
}