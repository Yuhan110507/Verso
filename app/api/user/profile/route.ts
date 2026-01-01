import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Helper to create authenticated Supabase client
function getSupabaseClient(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
}

// PATCH - Update user profile
export async function PATCH(request: NextRequest) {
  try {
    const supabaseClient = getSupabaseClient(request);
    if (!supabaseClient) {
      return NextResponse.json(
        { error: 'Unauthorized - No auth token provided' },
        { status: 401 }
      );
    }

    // Get authenticated user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { roles, liked_genres, writing_philosophy, influences, display_name, bio, avatar_url } = body;

    // Build update object
    const updates: any = {
      updated_at: new Date().toISOString()
    };

    if (roles !== undefined) updates.roles = roles;
    if (liked_genres !== undefined) updates.liked_genres = liked_genres;
    if (writing_philosophy !== undefined) updates.writing_philosophy = writing_philosophy;
    if (influences !== undefined) updates.influences = influences;
    if (display_name !== undefined) updates.display_name = display_name;
    if (bio !== undefined) updates.bio = bio;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;

    // Update user profile (RLS will ensure user owns it)
    const { data, error } = await supabaseClient
      .from('users')
      .update(updates)
      .eq('uid', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return NextResponse.json(
        { error: 'Failed to update profile: ' + error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
