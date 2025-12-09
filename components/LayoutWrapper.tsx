'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import { Profile } from '@/lib/profile';

interface LayoutWrapperProps {
  children: React.ReactNode;
  categories: string[];
  profile: Profile;
}

export default function LayoutWrapper({ children, categories, profile }: LayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} nickname={profile.nickname} />
      <Sidebar
        categories={categories}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        profile={profile}
      />
      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </>
  );
}
