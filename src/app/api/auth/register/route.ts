import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { registerSchema } from '@/features/auth/schemas/auth.schema';
import { users } from '@/lib/db';
import { signToken, authCookie } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'اطلاعات نامعتبر', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    // Check duplicate
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ error: 'این ایمیل قبلاً ثبت شده' }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user (mock)
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      passwordHash,
      role: 'user' as const,
    };
    users.push(newUser);

    // Sign token
    const token = await signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    cookies().set(authCookie.name, token, authCookie.options);

    return NextResponse.json(
      { user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}