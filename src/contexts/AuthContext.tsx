import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { User as AppUser } from '@/types';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async (authUser: SupabaseUser) => {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (data) {
        setUser(data as AppUser);
        setLoading(false);
        return;
      }

      // Recover gracefully if auth user exists but public.users row is missing.
      const metaRole = authUser.user_metadata?.role;
      const normalizedRole = metaRole === 'admin' || metaRole === 'staff' || metaRole === 'customer'
        ? metaRole
        : 'customer';

      const fallbackUser: AppUser = {
        id: authUser.id,
        name: (authUser.user_metadata?.name as string) || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        role: normalizedRole,
        created_at: new Date().toISOString(),
      };

      const { data: insertedUser } = await supabase
        .from('users')
        .upsert([fallbackUser], { onConflict: 'id' })
        .select('*')
        .single();

      setUser((insertedUser as AppUser) || fallbackUser);
      setLoading(false);
    };

    // Check current session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUser(session.user);
      } else {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUser(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
