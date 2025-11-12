/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🛑🛑🛑 ඔබේ සත්‍ය KEYS මෙහි අනිවාර්යයෙන්ම යොදන්න 🛑🛑🛑
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://jdyzeexmraegvyrhgxnd.supabase.co", 
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeXplZXhtcmFlZ3Z5cmhneG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MDcyMzYsImV4cCI6MjA3Nzk4MzIzNn0.9bMk5RmzTfsxVgm-0Uzaw7JWbQqJhalXvNXVTZciwOA", // ⚠️ ඔබේ සත්‍ය KEY එක යොදන්න ⚠️
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
};

export default nextConfig;