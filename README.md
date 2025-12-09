# coffeenuts.dev

개인 블로그 및 포트폴리오 사이트

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Content**: MDX (next-mdx-remote)
- **Deployment**: Vercel

## 주요 기능

- Notion 스타일 사이드바 레이아웃
- 다크모드 지원
- MDX 기반 콘텐츠 관리
- 블로그 카테고리 및 태그
- 포트폴리오 프로젝트 페이지
- 검색 기능

## 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── blog/              # 블로그 페이지
│   ├── portfolio/         # 포트폴리오 페이지
│   └── about/             # 소개 페이지
├── components/            # React 컴포넌트
├── content/               # MDX 콘텐츠
│   ├── blog/             # 블로그 글
│   ├── portfolio/        # 포트폴리오 프로젝트
│   └── profile.json      # 프로필 정보
└── lib/                   # 유틸리티 함수
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 콘텐츠 작성

### 블로그 글

`content/blog/` 폴더에 MDX 파일 생성:

```mdx
---
title: "글 제목"
description: "글 설명"
date: "2025-01-01"
category: "카테고리"
tags: ["태그1", "태그2"]
---

본문 내용
```

### 포트폴리오

`content/portfolio/` 폴더에 MDX 파일 생성:

```mdx
---
title: "프로젝트 이름"
description: "프로젝트 설명"
thumbnail: "/projects/thumbnail.png"
techStack: ["React", "Node.js"]
github: "https://github.com/..."
demo: "https://..."
---

프로젝트 상세 내용
```

## 라이선스

MIT
