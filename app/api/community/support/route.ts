import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import getDb from '@/lib/db';
const db = getDb();

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

    const { postId } = await request.json();

    const stmt = db.prepare(
      'INSERT OR IGNORE INTO community_support (post_id, user_id) VALUES (?, ?)'
    );
    stmt.run(postId, decoded.userId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to support post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    const stmt = db.prepare(
      'DELETE FROM community_support WHERE post_id = ? AND user_id = ?'
    );
    stmt.run(postId, decoded.userId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to remove support' },
      { status: 500 }
    );
  }
}







