import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import getDb from '@/lib/db';
const db = getDb();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage');

    let query = `
      SELECT 
        cp.id,
        cp.user_id,
        cp.stage,
        cp.content,
        cp.created_at,
        u.name as user_name,
        COUNT(cs.id) as support_count
      FROM community_posts cp
      JOIN users u ON cp.user_id = u.id
      LEFT JOIN community_support cs ON cp.id = cs.post_id
      ${stage ? 'WHERE cp.stage = ?' : ''}
      GROUP BY cp.id
      ORDER BY cp.created_at DESC
      LIMIT 50
    `;

    const stmt = db.prepare(query);
    const posts = stage ? stmt.all(parseInt(stage)) : stmt.all();

    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to get posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { stage, content } = await request.json();

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const stmt = db.prepare(
      'INSERT INTO community_posts (user_id, stage, content) VALUES (?, ?, ?)'
    );
    const result = stmt.run(decoded.userId, stage || null, content);

    return NextResponse.json({
      success: true,
      postId: result.lastInsertRowid,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}







