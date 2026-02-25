import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        return { data: null, error };
      }
      
      if (data.user) {
        // Try to create user profile, but don't fail if table doesn't exist
        try {
          await supabase.from('user_profiles').insert({
            id: data.user.id,
            full_name: fullName
          });
        } catch (profileError) {
          console.warn('Could not create user profile:', profileError);
        }
      }
      
      return { data, error: null };
    } catch (err) {
      console.error('Network error during signup:', err);
      return { 
        data: null, 
        error: { message: 'Network error. Please check your internet connection and try again.' }
      };
    }
  };

  const signIn = async (email, password) => {
    try {
      const result = await supabase.auth.signInWithPassword({ email, password });
      if (result.error) {
        console.error('Login error:', result.error);
      }
      return result;
    } catch (err) {
      console.error('Network error during login:', err);
      return { 
        data: null, 
        error: { message: 'Network error. Please check your internet connection and try again.' }
      };
    }
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
