import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authCookie } from '@/lib/jwt';

export async function POST() {
  cookies().delete(authCookie.name);
  return NextResponse.json({ success: true });
}