import { getAllCategories } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('카테고리 API 에러:', error);
    return NextResponse.json([], { status: 500 });
  }
}