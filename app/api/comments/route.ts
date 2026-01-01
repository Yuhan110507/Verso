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

// GET - Fetch comments for a work
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workId = searchParams.get('workId');
    const paragraphIndex = searchParams.get('paragraphIndex');

    if (!workId) {
      return NextResponse.json(
        { error: 'workId is required' },
        { status: 400 }
      );
    }

    // Use unauthenticated client for reading public comments
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    let query = supabase
      .from('comments')
      .select(`
        *,
        user:users!comments_user_id_fkey(uid, username, display_name, avatar_url)
      `)
      .eq('work_id', workId)
      .order('created_at', { ascending: true });

    // Filter by paragraph if specified
    if (paragraphIndex !== null) {
      query = query.eq('paragraph_index', parseInt(paragraphIndex));
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
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

// POST - Create a new comment
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
    const { work_id, content, paragraph_index, comment_type } = body;

    // Validate required fields
    if (!work_id || !content) {
      return NextResponse.json(
        { error: 'work_id and content are required' },
        { status: 400 }
      );
    }

    // Validate content length (minimum 50 characters for thoughtful engagement)
    if (content.trim().length < 50) {
      return NextResponse.json(
        { error: 'Comments must be at least 50 characters to encourage thoughtful discussion' },
        { status: 400 }
      );
    }

    // Validate comment type
    const validTypes = ['reflection', 'appreciation', 'question', 'critique'];
    if (comment_type && !validTypes.includes(comment_type)) {
      return NextResponse.json(
        { error: 'Invalid comment type' },
        { status: 400 }
      );
    }

    // Create comment
    const { data, error } = await supabaseClient
      .from('comments')
      .insert([
        {
          work_id,
          user_id: user.id,
          content: content.trim(),
          paragraph_index: paragraph_index !== undefined ? paragraph_index : null,
          comment_type: comment_type || 'reflection',
        },
      ])
      .select(`
        *,
        user:users!comments_user_id_fkey(uid, username, display_name, avatar_url)
      `)
      .single();

    if (error) {
      console.error('Error creating comment:', error);
      return NextResponse.json(
        { error: 'Failed to create comment: ' + error.message },
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

// DELETE - Delete a comment
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
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    // Delete comment (RLS will ensure user owns it)
    const { error } = await supabaseClient
      .from('comments')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting comment:', error);
      return NextResponse.json(
        { error: 'Failed to delete comment' },
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
