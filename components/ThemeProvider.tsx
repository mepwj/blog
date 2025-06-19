'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'blog-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = localStorage.getItem(storageKey) as Theme;
    console.log('[ThemeProvider] 초기화 - 저장된 테마:', stored);
    return stored || defaultTheme;
  });

  console.log('[ThemeProvider] 현재 테마 상태:', theme);

  useEffect(() => {
    console.log('[ThemeProvider] useEffect 실행, 테마:', theme);
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      console.log('[ThemeProvider] 시스템 테마:', systemTheme);
      root.classList.add(systemTheme);
      return;
    }

    console.log('[ThemeProvider] 테마 클래스 추가:', theme);
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      console.log('[ThemeProvider] setTheme 호출:', newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, newTheme);
      }
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  console.log('[useTheme] Context 확인:', context);

  if (context === undefined) {
    console.error('[useTheme] ThemeProvider를 찾을 수 없습니다!');
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};