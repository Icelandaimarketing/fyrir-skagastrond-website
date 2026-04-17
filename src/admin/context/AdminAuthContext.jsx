import React, { createContext, useContext, useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadAdminProfile(nextUser) {
    if (!nextUser || !supabase) {
      setProfile(null);
      setAuthError('');
      return null;
    }

    const { data, error } = await supabase
      .from('admin_profiles')
      .select('user_id, email, role')
      .eq('user_id', nextUser.id)
      .maybeSingle();

    if (error) {
      setProfile(null);
      setAuthError(error.message);
      return null;
    }

    setProfile(data || null);
    setAuthError('');
    return data || null;
  }

  useEffect(() => {
    let active = true;

    if (!isSupabaseConfigured || !supabase) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    // Get current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!active) return;
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      await loadAdminProfile(nextUser);
      if (active) setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextUser = session?.user ?? null;
      setLoading(true);
      setUser(nextUser);
      await loadAdminProfile(nextUser);
      if (active) setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(email, password) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    if (!isSupabaseConfigured || !supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
  }

  return (
    <AdminAuthContext.Provider value={{ user, profile, authError, loading, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}
