import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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

// GET - Fetch all works or a specific work
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const authorId = searchParams.get('authorId');
    const visibility = searchParams.get('visibility');

    let query = supabase
      .from('works')
      .select('*, author:users!works_author_id_fkey(uid, username, display_name, avatar_url)');

    // Filter by ID if provided
    if (id) {
      query = query.eq('id', id).single();
    }

    // Filter by author if provided
    if (authorId) {
      query = query.eq('author_id', authorId);
    }

    // Filter by visibility (default to public only)
    if (visibility) {
      query = query.eq('visibility', visibility);
    } else if (!id && !authorId) {
      // Only show public works by default
      query = query.eq('visibility', 'public');
    }

    // Order by most recent
    if (!id) {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching works:', error);
      return NextResponse.json(
        { error: 'Failed to fetch works' },
        { status: 500 }
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

// POST - Create a new work
export async function POST(request: NextRequest) {
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
    const { title, description, genre, content, visibility = 'private' } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Calculate word count and reading time
    const wordCount = content.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200); // Average reading speed

    // Create work
    const { data, error } = await supabaseClient
      .from('works')
      .insert([
        {
          author_id: user.id,
          title: title.trim(),
          description: description?.trim() || null,
          genre: genre || null,
          content,
          visibility,
          status: 'published',
          word_count: wordCount,
          reading_time_minutes: readingTimeMinutes,
          published_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating work:', error);
      return NextResponse.json(
        { error: 'Failed to create work: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing work
export async function PUT(request: NextRequest) {
  try {
    const supabaseClient = getSupabaseClient(request);
    if (!supabaseClient) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, title, description, genre, content, visibility } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Work ID is required' },
        { status: 400 }
      );
    }

    // Build update object
    const updates: any = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description?.trim() || null;
    if (genre !== undefined) updates.genre = genre;
    if (content !== undefined) {
      updates.content = content;
      updates.word_count = content.trim().split(/\s+/).length;
      updates.reading_time_minutes = Math.ceil(updates.word_count / 200);
    }
    if (visibility !== undefined) updates.visibility = visibility;

    // Update work (RLS will ensure user owns it)
    const { data, error } = await supabaseClient
      .from('works')
      .update(updates)
      .eq('id', id)
      .eq('author_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating work:', error);
      return NextResponse.json(
        { error: 'Failed to update work' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Work not found or you do not have permission' },
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

// DELETE - Delete a work
export async function DELETE(request: NextRequest) {
  try {
    const supabaseClient = getSupabaseClient(request);
    if (!supabaseClient) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Work ID is required' },
        { status: 400 }
      );
    }

    // Delete work (RLS will ensure user owns it)
    const { error } = await supabaseClient
      .from('works')
      .delete()
      .eq('id', id)
      .eq('author_id', user.id);

    if (error) {
      console.error('Error deleting work:', error);
      return NextResponse.json(
        { error: 'Failed to delete work' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
