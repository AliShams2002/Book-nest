'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as authApi from '../api/auth';
import type { LoginInput, RegisterInput } from '../schemas/auth.schema';

export function useAuth() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.getMe,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess: ({ user }) => {
      qc.setQueryData(['auth', 'me'], user);
      toast.success(`خوش آمدی ${user.name}!`);
      router.push('/');
      router.refresh();
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useRegister() {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: RegisterInput) => authApi.register(input),
    onSuccess: ({ user }) => {
      qc.setQueryData(['auth', 'me'], user);
      toast.success('حساب ساخته شد!');
      router.push('/');
      router.refresh();
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      qc.setQueryData(['auth', 'me'], null);
      qc.clear();
      toast.success('خارج شدید');
      router.push('/login');
      router.refresh();
    },
  });
}