import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { loginSchema } from '@/features/auth/schemas/auth.schema';
import { users } from '@/lib/db';
import { signToken, authCookie } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate input
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'اطلاعات ورودی نامعتبر است', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // 2. Find user
    const user = users.find((u) => u.email === parsed.data.email);
    if (!user) {
      // ⚠️ پیام یکسان برای جلوگیری از User Enumeration
      return NextResponse.json({ error: 'ایمیل یا رمز عبور اشتباه است' }, { status: 401 });
    }

    // 3. Verify password
    const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'ایمیل یا رمز عبور اشتباه است' }, { status: 401 });
    }

    // 4. Sign JWT
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // 5. Set HttpOnly cookie
    const cookieStore = cookies();
    cookieStore.set(authCookie.name, token, authCookie.options);

    // 6. Return user (بدون hash)
    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}