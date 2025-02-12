import { NextResponse } from 'next/server';
import { addJobToFavoritesAction } from '@/app/actions/jobActions';

export async function POST(request: Request) {
  try {
    const { jobId, userId } = await request.json();
    const result = await addJobToFavoritesAction({ jobId, userId });
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
