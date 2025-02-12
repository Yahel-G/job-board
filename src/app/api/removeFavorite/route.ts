// src/app/api/removeFavorite/route.ts
import { NextResponse } from 'next/server';
import { removeJobFromFavoritesAction } from '@/app/actions/jobActions';

export async function POST(request: Request) {
  try {
    const { jobId, userId } = await request.json();
    const result = await removeJobFromFavoritesAction({ jobId, userId });
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
