export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            const theme = localStorage.getItem('blog-theme');
            console.log('[ThemeScript] 저장된 테마:', theme);
            
            if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
              console.log('[ThemeScript] dark 클래스 추가');
            } else {
              document.documentElement.classList.remove('dark');
              console.log('[ThemeScript] dark 클래스 제거');
            }
          } catch (e) {
            console.error('[ThemeScript] 에러:', e);
          }
        `,
      }}
    />
  );
}