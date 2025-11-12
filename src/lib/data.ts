import { supabase } from './supabaseClient';

// Plan Levels සඳහා Simple Rank (Access Control සඳහා)
const PLAN_RANK: { [key: string]: number } = { 'Free': 0, 'Plus': 1, 'Pro': 2 };

// ----------------------------------------------------
// 1. Daily Thought Fetching Function (PGRST116 fix එක සමඟ)
// ----------------------------------------------------
export async function fetchDailyThought() {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('daily_thoughts')
    .select('thought_text')
    .eq('thought_date', today)
    .limit(1)
    .single(); 

  // PGRST116 දෝෂය (No rows found) සඳහා fallback
  if (error && error.code === 'PGRST116') {
    return {
      thought_text: "සාර්ථකත්වයට යන මාවත සැමවිටම විවෘතයි. සිත් රූ වෙතින් සුබ දවසක්.",
    };
  } else if (error) {
     console.error('Error fetching daily thought:', error);
     return { thought_text: "දත්ත සමුදාය සම්බන්ධතා දෝෂයකි." };
  }

  return data; 
}

// ----------------------------------------------------
// 2. Featured Books Fetching Function (Home Page)
// ----------------------------------------------------
export async function fetchFeaturedBooks(limit: number) {
    const { data: books, error } = await supabase
        .from('books')
        .select('book_id, title, author, required_plan, cover_url, rating')
        .order('rating', { ascending: false }) // වැඩිම Rating අනුව
        .limit(limit);

    if (error) {
        console.error('Error fetching featured books:', error);
        return [];
    }

    return books;
}

// ----------------------------------------------------
// 3. Featured Episodes Fetching Function (Home Page)
// ----------------------------------------------------
export async function fetchFeaturedEpisodes(limit: number) {
    const { data: episodes, error } = await supabase
        .from('ape_katha')
        .select('episode_id, title, episode_number, created_at')
        .order('created_at', { ascending: false }) // නවතම කතාංග මුලින්ම
        .limit(limit);

    if (error) {
        console.error('Error fetching featured episodes:', error);
        return [];
    }
    return episodes;
}

// ----------------------------------------------------
// 4. Subscription Check Function (Access Control Logic)
// ----------------------------------------------------
/**
 * 🛑 User ගේ වත්මන් Subscription තත්ත්වය සහ Plan එක පරීක්ෂා කිරීම
 * @returns { userPlan: string, isExpired: boolean, userRank: number }
 */
export async function checkUserSubscription() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Logged out users are Free
        return { userPlan: 'Free', isExpired: true, userRank: 0 }; 
    }

    const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('current_plan, plan_expires_at')
        .eq('id', user.id)
        .single();
    
    // Profile නැතිනම් හෝ දෝෂයක් නම්, Default Free ලෙස සලකන්න
    if (error || !profile) {
        return { userPlan: 'Free', isExpired: true, userRank: 0 };
    }

    const expirationDate = profile.plan_expires_at ? new Date(profile.plan_expires_at) : new Date(0);
    const now = new Date();
    
    // 2. ⏳ Expiration Check Logic: Plan Free නොවේ නම් සහ කල් ඉකුත් වී ඇත්නම්
    const isExpired = profile.current_plan !== 'Free' && expirationDate <= now;
    
    const userPlan = isExpired ? 'Free' : profile.current_plan;
    const userRank = PLAN_RANK[userPlan] || 0;

    return { userPlan: userPlan, isExpired: isExpired, userRank: userRank };
}

// ----------------------------------------------------
// 5. User Email Check (Admin Logic සඳහා අවශ්‍යයි)
// ----------------------------------------------------
/**
 * 🛑 වත්මන් පරිශීලකයා Admin Email එකට සමානදැයි පරීක්ෂා කිරීම.
 * (Hardcoded Email Check සඳහා, user_profiles table එකේ is_admin check කිරීම වෙනුවට)
 */
export async function isCurrentUserAdmin(adminEmail: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    // අපි සරලම Hardcoded Email Check එක භාවිතා කරමු
    return user.email === adminEmail;
}