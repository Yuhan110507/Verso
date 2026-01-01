import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/types';

// Sign up with email and password
export const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<User> => {
  // Create the user account
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error('No user returned from signup');

  // Check if user profile already exists
  const { data: existingProfile } = await supabase
    .from('users')
    .select('uid')
    .eq('uid', data.user.id)
    .single();

  // Only create profile if it doesn't exist
  if (!existingProfile) {
    // Create user profile in database
    const userProfile = {
      uid: data.user.id,
      email: data.user.email || '',
      username,
      roles: ['reader'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error: profileError } = await supabase
      .from('users')
      .insert([userProfile]);

    if (profileError) {
      // If insertion fails due to duplicate, it means profile was created by another request
      if (!profileError.message.includes('duplicate key value')) {
        throw profileError;
      }
    }
  }

  return data.user;
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error('No user returned from signin');

  return data.user;
};

// Sign out
export const logOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uid)
    .single();

  if (error) return null;

  return data ? {
    ...data,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  } as UserProfile : null;
};

// Auth state subscription
export const subscribeToAuthState = (
  callback: (user: User | null) => void
): (() => void) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
};

// Update user profile
export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('uid', uid);

  if (error) throw error;
};
