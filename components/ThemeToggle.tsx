'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const contextValue = useTheme();
  const { theme, setTheme } = contextValue;

  console.log('[ThemeToggle] Context value:', contextValue);
  console.log('[ThemeToggle] 현재 테마:', theme);
  console.log('[ThemeToggle] setTheme 함수:', typeof setTheme);

  const toggleTheme = () => {
    console.log('[ThemeToggle] 토글 클릭됨, 현재 테마:', theme);
    console.log('[ThemeToggle] setTheme 타입:', typeof setTheme);
    
    try {
      if (theme === 'light' || theme === 'system') {
        console.log('[ThemeToggle] 다크모드로 변경 시도');
        setTheme('dark');
        console.log('[ThemeToggle] setTheme(dark) 호출 완료');
      } else {
        console.log('[ThemeToggle] 라이트모드로 변경 시도');
        setTheme('light');
        console.log('[ThemeToggle] setTheme(light) 호출 완료');
      }
    } catch (error) {
      console.error('[ThemeToggle] setTheme 에러:', error);
    }
  };

  const getIcon = () => {
    if (theme === 'dark') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    }
  };

  const getTooltip = () => {
    if (theme === 'dark') return '다크 모드';
    return '라이트 모드';
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={getTooltip()}
    >
      <span className="text-gray-700 dark:text-gray-300">
        {getIcon()}
      </span>
    </button>
  );
}