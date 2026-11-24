import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, authCookie } from '@/lib/jwt';
import { users } from '@/lib/db';

export async function GET() {
  const token = cookies().get(authCookie.name)?.value;
  if (!token) return NextResponse.json(null, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json(null, { status: 401 });

  const user = users.find((u) => u.id === payload.userId);
  if (!user) return NextResponse.json(null, { status: 401 });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}