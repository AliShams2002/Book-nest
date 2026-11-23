'use client';
import Footer from '@/shared/components/layout/Footer';
import Header from '@/shared/components/layout/Header';
import { useState } from 'react';

const Layout = ({ children }: LayoutProps<'/'>) => {
  const [dark, setDark] = useState(false);
  return (
    <div className={`${dark ? 'dark' : ''}`}>
      <Header dark={dark} toggleDark={() => setDark(!dark)} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
