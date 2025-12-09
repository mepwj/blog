# 커피넛 블로그 프로젝트

## 프로젝트 개요

- **이름**: 커피넛 블로그
- **도메인**: coffeenuts.dev
- **배포**: Vercel

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| 콘텐츠 | MDX (next-mdx-remote) |
| 코드 하이라이팅 | VS Code 스타일 |
| 배포 | Vercel |

## 페이지 구조

```
/                    - 홈 (소개 + 최신 글)
/blog                - 블로그 목록 (카테고리 필터, 검색)
/blog/[slug]         - 블로그 상세
/portfolio           - 포트폴리오 목록
/portfolio/[slug]    - 포트폴리오 상세
/about               - 자기소개
```

## 폴더 구조

```
/app
  /page.tsx              # 홈
  /layout.tsx            # 루트 레이아웃 (사이드바 포함)
  /globals.css           # 전역 스타일 (다크모드, prose)
  /blog
    /page.tsx            # 블로그 목록
    /BlogContent.tsx     # 블로그 필터 클라이언트 컴포넌트
    /[slug]/page.tsx     # 블로그 상세
  /portfolio
    /page.tsx            # 포트폴리오 목록
    /[slug]/page.tsx     # 포트폴리오 상세
  /about
    /page.tsx            # About 페이지

/components
  /Sidebar.tsx           # 사이드바
  /SearchBar.tsx         # 검색바
  /PostCard.tsx          # 블로그 카드
  /ProjectCard.tsx       # 프로젝트 카드
  /ThemeToggle.tsx       # 다크모드 토글
  /ThemeProvider.tsx     # 테마 컨텍스트
  /LayoutWrapper.tsx     # 레이아웃 래퍼
  /MobileHeader.tsx      # 모바일 헤더

/content
  /blog                  # 블로그 MDX 파일
  /portfolio             # 포트폴리오 MDX 파일

/lib
  /mdx.ts               # MDX 파싱 및 모든 데이터 유틸

/public
  /profile.jpg          # 프로필 이미지 (400x400)
```

## 기능 목록

### 필수 기능
- [x] Next.js 프로젝트 설정
- [x] 사이드바 레이아웃 (노션 스타일)
- [x] 다크모드
- [x] 태그/카테고리 분류
- [x] 검색 기능
- [x] 포트폴리오 페이지
- [x] About 페이지

### 기본 적용
- [x] SEO 최적화
- [x] 글 썸네일 (선택적)

### 제외
- 댓글 기능
- 시리즈 기능
- 조회수/인기글
- RSS 피드

## 디자인 가이드

### 레이아웃
- 노션 스타일: 좌측 사이드바 + 본문
- 모바일: 햄버거 메뉴로 사이드바 숨김

### 톤/무드
- 깔끔하고 모던한 흑백 기반

### 사이드바 구성
1. 프로필 영역 (이미지 + 닉네임 + 소개)
2. 네비게이션 (Blog, Portfolio, About)
3. 카테고리 (동적)
4. 검색바
5. 소셜 링크 (GitHub, X, LinkedIn, Email)
6. 다크모드 토글

## 프로필 정보

- **닉네임**: 커피넛
- **프로필 이미지**: /public/profile.jpg (400x400)
- **자기소개**: "나중에 자기소개가 들어갈 영역입니다"

## MDX Frontmatter 형식

### 블로그 글
```yaml
---
title: "글 제목"
description: "글 설명"
date: "2024-01-01"
category: "카테고리"
tags: ["태그1", "태그2"]
thumbnail: "/images/thumbnail.jpg"  # 선택
---
```

### 포트폴리오
```yaml
---
title: "프로젝트명"
description: "프로젝트 설명"
thumbnail: "/images/project.jpg"
techStack: ["Next.js", "TypeScript"]
github: "https://github.com/..."
demo: "https://..."
presentation: "https://..."  # 선택
---
```

## 개발 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사
```

## 작업 완료 현황

- [x] Next.js 프로젝트 생성 + Tailwind 설정
- [x] MDX 설정 (next-mdx-remote, gray-matter, reading-time)
- [x] 사이드바 레이아웃 구현
- [x] 블로그 목록/상세 페이지
- [x] 포트폴리오 목록/상세 페이지
- [x] About 페이지
- [x] 검색, 다크모드, 카테고리 필터
- [x] SEO 기본 설정
- [ ] Vercel 배포 + 도메인 연결

## 다음 작업

1. Vercel 배포
2. 도메인 연결 (coffeenuts.dev)
3. 실제 콘텐츠 작성
4. 소셜 링크 업데이트
