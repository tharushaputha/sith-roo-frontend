// src/app/layout.tsx
import { Noto_Sans_Sinhala } from 'next/font/google';
import './globals.css'; // Global Styles (Tailwind layers)
import Header from '@/components/Header'; // Header Component එක
import React from 'react';

// සිංහල භාෂාවට සුදුසු Google Font එක
const sinhalaFont = Noto_Sans_Sinhala({ subsets: ['sinhala'], weight: ['400', '700'] });

export const metadata = {
  title: 'සිත් රූ - Sith Roo | The Digital Library',
  description: 'පොත් කියවීමට ඇති සුපිරිම වෙබ් අඩවිය',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="si" className={sinhalaFont.className}>
      <body>
        <Header /> 
        
        {/* Main Content Container - සුදු Background එක */}
        <main className="min-h-screen pt-4 pb-12 bg-white"> 
            {children}
        </main>
        
      </body>
    </html>
  );
}