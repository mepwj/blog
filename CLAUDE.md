# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

### 개발 서버 실행
```bash
npm run dev          # Velite 감시 + Next.js 개발 서버 (터보 모드)
npm run dev:fast     # 포트 3000에서 빠른 시작
```

### 빌드 및 배포
```bash
npm run build        # Velite 빌드 + Next.js 프로덕션 빌드
npm run start        # 프로덕션 서버 시작
```

### 코드 품질 검사
```bash
npm run lint         # ESLint 실행
```

## 프로젝트 아키텍처

### 핵심 구조
- **Next.js 14 App Router** 기반 정적 블로그
- **Velite**를 통한 MDX 콘텐츠 관리 - 빌드 타임에 `.mdx` 파일을 처리하여 `.velite` 디렉토리에 타입 안전한 데이터 생성
- **TypeScript** 전체 적용으로 타입 안정성 확보

### 콘텐츠 시스템
1. **MDX 파일 처리**: `posts/blog/*.mdx` 파일들이 Velite에 의해 처리됨
2. **자동 타입 생성**: Velite가 `.velite/index.d.ts`에 타입 정의 자동 생성
3. **데이터 접근**: `@/.velite`에서 import하여 타입 안전하게 콘텐츠 사용

### 주요 모듈 역할
- `lib/posts.ts`: Velite 데이터를 활용한 포스트 관련 비즈니스 로직
- `lib/search.ts`: Fuse.js 기반 퍼지 검색 구현
- `app/blog/[slug]/components/mdx.tsx`: MDX 컴포넌트 스타일링 및 커스터마이징

### 스타일링 시스템
- Tailwind CSS + Typography 플러그인으로 일관된 디자인
- 다크 모드는 시스템 설정과 연동되며 `ThemeProvider`로 관리

## 포스트 작성 가이드

### 새 포스트 생성
1. `posts/blog/` 디렉토리에 `.mdx` 파일 생성
2. 필수 frontmatter 작성:
   ```yaml
   ---
   title: "제목"
   date: "YYYY-MM-DD"
   description: "설명"
   thumbnailUrl: "/posts/thumbnail/파일명.jpg"
   category: "카테고리명"
   tags: ["태그1", "태그2"]
   draft: false
   ---
   ```

### 이미지 관리
- 썸네일: `public/posts/thumbnail/` 디렉토리
- 본문 이미지: `public/posts/[포스트명]/` 디렉토리
- 이미지 경로는 절대 경로 사용: `/posts/...`

## 개발 시 주의사항

### Velite 관련
- MDX 파일 수정 시 개발 서버가 자동으로 변경사항 감지
- 빌드 오류 시 `.velite` 디렉토리 삭제 후 재빌드
- frontmatter 형식 오류는 빌드 시점에 감지됨

### 타입 안정성
- Velite가 생성한 타입 사용: `import { blogPosts } from '@/.velite'`
- 새로운 frontmatter 필드 추가 시 `velite.config.ts` 스키마 업데이트 필요

### 성능 최적화
- 모든 포스트 데이터는 빌드 타임에 처리됨
- 클라이언트 사이드 검색은 Fuse.js로 구현되어 있음
- 이미지는 Next.js Image 컴포넌트로 최적화됨