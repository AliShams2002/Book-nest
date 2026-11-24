import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('ایمیل معتبر وارد کنید'),
  password: z.string().min(6, 'رمز عبور حداقل ۶ کاراکتر است'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'نام کامل را وارد کنید'),
    email: z.string().email('ایمیل معتبر وارد کنید'),
    password: z
      .string()
      .min(8, 'رمز عبور حداقل ۸ کاراکتر است')
      .regex(/[A-Z]/, 'حداقل یک حرف بزرگ')
      .regex(/[0-9]/, 'حداقل یک عدد'),
    confirmPassword: z.string(),
    agree: z.literal(true, {
      errorMap: () => ({ message: 'پذیرش قوانین الزامی است' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن یکسان نیست',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;