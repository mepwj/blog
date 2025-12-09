'use client';

interface MobileHeaderProps {
  onMenuClick: () => void;
  nickname: string;
}

export default function MobileHeader({ onMenuClick, nickname }: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 lg:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="메뉴 열기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <span className="font-semibold">{nickname}</span>
        <div className="w-10" />
      </div>
    </header>
  );
}
