# My Tech Blog

Next.js 14와 TypeScript로 구축된 개인 기술 블로그입니다.

## 🚀 주요 기능

- **정적 사이트 생성(SSG)**: 빠른 로딩 속도
- **마크다운 기반**: 쉬운 글 작성
- **검색 기능**: Fuse.js를 활용한 전체 텍스트 검색
- **카테고리 필터링**: 주제별 포스트 분류
- **반응형 디자인**: 모든 디바이스에서 최적화
- **SEO 최적화**: 메타 태그 및 구조화된 데이터

## 🛠️ 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **마크다운 처리**: gray-matter, remark
- **검색**: Fuse.js
- **배포**: Vercel

## 📁 프로젝트 구조

```
my-blog/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 전역 레이아웃
│   ├── page.tsx           # 메인 페이지
│   ├── posts/[slug]/      # 포스트 상세 페이지
│   ├── category/[category]/ # 카테고리 페이지
│   └── search/            # 검색 페이지
├── components/            # React 컴포넌트
├── lib/                   # 유틸리티 함수
├── posts/                 # 마크다운 포스트
└── public/images/         # 이미지 파일
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 포스트 작성

`posts/` 디렉토리에 마크다운 파일을 생성하세요.

#### 파일명 규칙

```
yyyy-mm-dd-제목.md
```

예시: `2025-06-12-nextjs-blog-setup.md`

#### Frontmatter 형식

```yaml
---
title: "포스트 제목"
date: "2025-06-12"
description: "포스트 설명"
thumbnail: "/images/common/default-thumbnail.jpg"
category: "Frontend"
tags: ["Next.js", "React", "TypeScript"]
draft: false
---
```

## 📝 글 작성 가이드

### 이미지 추가

1. `public/images/` 디렉토리에 이미지 업로드
2. 마크다운에서 참조:

```markdown
![이미지 설명](/images/폴더명/이미지.jpg)
```

### 코드 블록

````markdown
```javascript
const hello = "world";
console.log(hello);
```
````

## 🔧 커스터마이징

### 사이트 정보 수정

`app/layout.tsx`에서 메타데이터를 수정하세요:

```typescript
export const metadata = {
  title: '내 블로그',
  description: '블로그 설명',
  // ...
};
```

### 스타일 변경

`tailwind.config.js`와 `app/globals.css`에서 스타일을 커스터마이징할 수 있습니다.

## 📦 빌드 및 배포

### 로컬 빌드

```bash
npm run build
npm start
```

### Vercel 배포

1. GitHub에 저장소 업로드
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 자동 배포 완료!

## 🎯 향후 계획

- [ ] 댓글 시스템 (utterances/giscus)
- [ ] 다크모드 토글
- [ ] RSS 피드
- [ ] 조회수 추적
- [ ] 관련 포스트 추천

## 📄 라이선스

MIT License

## 🤝 기여하기

이슈나 풀 리퀘스트는 언제든 환영합니다!
