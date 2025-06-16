---
title: "Next.js 14 블로그 개발기"
date: "2025-01-15"
description: "Next.js 14 App Router로 개인 기술 블로그를 만들어보며 겪은 경험을 공유합니다."
thumbnail: "/images/common/default-thumbnail.jpg"
category: "Frontend"
tags: ["Next.js", "React", "블로그", "개발"]
draft: false
---

# Next.js 14로 기술 블로그 만들기

안녕하세요! 오늘은 Next.js 14의 App Router를 사용해서 개인 기술 블로그를 개발한 경험을 공유하려고 합니다.

## 🚀 주요 기능

이 블로그는 다음과 같은 기능들을 포함하고 있습니다:

### 1. 마크다운 기반 포스트 작성
- 포스트는 `posts/` 폴더에 마크다운 파일로 작성
- frontmatter를 통한 메타데이터 관리
- 자동 SEO 최적화

### 2. 카테고리 및 태그 시스템
- 포스트를 카테고리별로 분류
- 태그를 통한 세부 분류
- 카테고리별 페이지 자동 생성

### 3. 검색 기능
- Fuse.js를 사용한 퍼지 검색
- 제목, 내용, 태그 전체 검색
- 실시간 검색 결과

### 4. 반응형 디자인
- 모바일 친화적인 UI
- 다크 모드 지원
- Tailwind CSS 활용

## 🛠️ 기술 스택

```typescript
const techStack = {
  framework: "Next.js 14",
  styling: "Tailwind CSS",
  language: "TypeScript",
  markdown: "gray-matter + remark",
  search: "Fuse.js",
  deployment: "Vercel"
};
```

## 📝 개발 과정에서 배운 것들

### App Router의 장점
Next.js 13부터 도입된 App Router는 기존 Pages Router보다 더 직관적이고 강력한 기능들을 제공합니다:

1. **파일 기반 라우팅**의 개선
2. **Server Components**의 기본 지원
3. **레이아웃 시스템**의 개선

### 마크다운 처리
마크다운 파일을 처리하기 위해 다음 라이브러리들을 사용했습니다:

- `gray-matter`: frontmatter 파싱
- `remark`: 마크다운 → HTML 변환
- `remark-html`: HTML 출력 최적화

## 🔍 검색 기능 구현

검색 기능은 Fuse.js를 사용해서 구현했습니다:

```javascript
const searchOptions = {
  keys: ['title', 'content', 'tags'],
  threshold: 0.3,
  includeScore: true
};

const fuse = new Fuse(posts, searchOptions);
const results = fuse.search(query);
```

## 🎨 UI/UX 고려사항

### 1. 성능 최적화
- 이미지 최적화 (Next.js Image 컴포넌트)
- 코드 스플리팅
- 정적 생성 활용

### 2. 사용자 경험
- 빠른 페이지 로딩
- 직관적인 네비게이션
- 모바일 최적화

### 3. 접근성
- 시맨틱 HTML
- 키보드 네비게이션
- 스크린 리더 지원

## 📈 앞으로의 계획

1. **댓글 시스템** 추가 (Giscus 또는 Utterances)
2. **RSS 피드** 생성
3. **포스트 조회수** 트래킹
4. **관련 포스트 추천** 기능
5. **시리즈 포스트** 지원

## 마무리

Next.js 14로 블로그를 만들어보면서 최신 React 기능들을 경험할 수 있었습니다. 특히 Server Components와 App Router의 조합은 정말 강력했습니다.

개발하면서 겪었던 시행착오들과 해결 과정들도 앞으로 포스트로 자세히 다뤄보겠습니다!

---

**참고 자료:**
- [Next.js 공식 문서](https://nextjs.org/docs)
- [App Router 가이드](https://nextjs.org/docs/app)
- [Vercel 배포 가이드](https://vercel.com/docs)
