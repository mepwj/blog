'use client';

import * as runtime from "react/jsx-runtime";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none 
      prose-p:text-gray-700 dark:prose-p:text-gray-300
      prose-li:text-gray-700 dark:prose-li:text-gray-300
      prose-strong:text-gray-800 dark:prose-strong:text-gray-200
      prose-headings:text-gray-900 dark:prose-headings:text-gray-100
      prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
      prose-code:text-gray-100 prose-code:bg-gray-800 dark:prose-code:text-gray-200 dark:prose-code:bg-gray-800
      prose-a:text-green-600 dark:prose-a:text-green-400
      prose-td:text-gray-700 dark:prose-td:text-gray-300
      prose-th:text-gray-900 dark:prose-th:text-gray-100">
      <Component />
    </div>
  );
}