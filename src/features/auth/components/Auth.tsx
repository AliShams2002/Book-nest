'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from '../schemas/auth.schema';
import { useLogin, useRegister } from '../hooks/useAuth';

// ... (Logo, InputField, PasswordStrength - بدون تغییر از فایل شما)

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const login = useLogin();
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <div>
      {/* ... هدر و UI شما بدون تغییر ... */}

      <form onSubmit={handleSubmit((data) => login.mutate(data))} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              {/* آیکون ایمیل */}
            </span>
            <input
              {...register('email')}
              type="email"
              placeholder="john@example.com"
              className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-rose-400 focus:ring-rose-500'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* مشابه برای password با register('password') */}

        <button
          type="submit"
          disabled={isSubmitting || login.isPending}
          className="w-full ... disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {login.isPending ? 'در حال ورود...' : 'Sign In'}
        </button>
      </form>

      {/* ... بقیه UI شما (social, divider, ...) بدون تغییر ... */}
    </div>
  );
}

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const registerUser = useRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', agree: false as any },
  });

  const password = watch('password');

  return (
    <div>
      {/* ... هدر ... */}
      <form onSubmit={handleSubmit((data) => registerUser.mutate(data))} className="space-y-4">
        {/* فیلدها با register('name') و ... */}
        {/* PasswordStrength password={password} */}
        {/* Checkbox با register('agree') */}
        <button type="submit" disabled={isSubmitting || registerUser.isPending}>
          {registerUser.isPending ? 'در حال ساخت...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  return (
    // ... همون UI شما بدون تغییر ...
  );
}