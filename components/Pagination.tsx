import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const generatePageUrl = (page: number) => {
    if (page === 1) {
      return basePath === '/' ? '/' : basePath;
    }
    return `${basePath}?page=${page}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 끝 페이지가 총 페이지 수보다 작으면 시작 페이지를 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 첫 페이지
    if (startPage > 1) {
      pages.push(
        <Link
          key={1}
          href={generatePageUrl(1)}
          className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          1
        </Link>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-3 py-2 text-sm text-gray-400">
            ...
          </span>
        );
      }
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={generatePageUrl(i)}
          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {i}
        </Link>
      );
    }

    // 마지막 페이지
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-3 py-2 text-sm text-gray-400">
            ...
          </span>
        );
      }
      
      pages.push(
        <Link
          key={totalPages}
          href={generatePageUrl(totalPages)}
          className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {totalPages}
        </Link>
      );
    }

    return pages;
  };

  return (
    <nav className="flex justify-center items-center space-x-1 sm:space-x-2 px-4">
      {/* 이전 페이지 */}
      {currentPage > 1 && (
        <Link
          href={generatePageUrl(currentPage - 1)}
          className="flex items-center px-2 sm:px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">이전</span>
        </Link>
      )}

      {/* 페이지 번호들 */}
      <div className="flex items-center space-x-1 overflow-x-auto">
        {renderPageNumbers()}
      </div>

      {/* 다음 페이지 */}
      {currentPage < totalPages && (
        <Link
          href={generatePageUrl(currentPage + 1)}
          className="flex items-center px-2 sm:px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <span className="hidden sm:inline">다음</span>
          <svg className="w-4 h-4 sm:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </nav>
  );
}
