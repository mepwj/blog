'use client';

interface SearchInputProps {
  defaultValue?: string;
}

export default function SearchInput({ defaultValue = '' }: SearchInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="제목, 내용, 태그로 검색..."
        defaultValue={defaultValue}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const searchQuery = (e.target as HTMLInputElement).value;
            if (searchQuery.trim()) {
              window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
            } else {
              window.location.href = '/search';
            }
          }
        }}
      />
    </div>
  );
}