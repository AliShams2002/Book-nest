export type MockUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
};

// 🔐 پسورد هر دو کاربر: "Password123"
// (هش‌شده با bcryptjs، rounds=10)
export const users: MockUser[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@booknest.com',
    passwordHash: '$2b$10$aR5PUt1W5AT77Kagwh48eOpB3CpKsXFsB7p7QPJzEyxjhgw8f0LO2', // بعد از اجرای اسکریپت زیر پر کن
    role: 'admin',
  },
  {
    id: '2',
    name: 'Test User',
    email: 'user@booknest.com',
    passwordHash: '$2b$10$aR5PUt1W5AT77Kagwh48eOpB3CpKsXFsB7p7QPJzEyxjhgw8f0LO2', // بعد از اجرای اسکریپت زیر پر کن
    role: 'user',
  },
];