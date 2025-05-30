import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const generateUniqueCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding similar looking characters
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const generateSessionId = () => {
  return crypto.randomUUID();
};

export const verifySession = async (sessionId: string | null): Promise<boolean> => {
  if (!sessionId) return false; // Do not allow access if no session ID

  try {
    const { data, error } = await supabase
      .from('wheel_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .eq('is_used', false)
      .maybeSingle(); // Use maybeSingle instead of single to handle no rows gracefully
    console.log(data);
    
    if (error) throw error;
    return !!data; // Return true if we found a valid session, false otherwise
  } catch (err) {
    console.error('Error verifying session:', err);
    return true; // Allow access on error to maintain user experience
  }
};

export const markSessionAsUsed = async (sessionId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('wheel_sessions')
      .update({ 
        is_used: true,
        accessed_at: new Date().toISOString()
      })
      .eq('session_id', sessionId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error marking session as used:', err);
    return false;
  }
};