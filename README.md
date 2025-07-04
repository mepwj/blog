# CoffeeNuts.Dev

커피넛의 개인 기술 블로그입니다. Next.js 14와 Velite를 사용하여 구축되었습니다.

## 🚀 주요 기능

- **MDX 기반 블로그**: Velite를 사용한 정적 사이트 생성
- **코드 하이라이팅**: rehype-pretty-code를 사용한 아름다운 코드 표시
- **검색 기능**: Fuse.js를 사용한 퍼지 검색
- **카테고리 & 태그**: 포스트 분류 시스템
- **다크 모드**: 시스템 설정 연동 다크/라이트 모드
- **반응형 디자인**: 모바일 최적화
- **이미지 최적화**: Next.js Image 컴포넌트 활용

## 🛠️ 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **콘텐츠 관리**: Velite + MDX
- **스타일링**: Tailwind CSS + Typography Plugin
- **검색**: Fuse.js
- **언어**: TypeScript
- **배포**: Vercel

## 📁 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── blog/              # 블로그 라우트
│   │   ├── page.tsx       # 블로그 목록
│   │   └── [slug]/        # 포스트 상세 페이지
│   ├── category/          # 카테고리별 페이지
│   └── search/            # 검색 페이지
├── components/            # React 컴포넌트
├── lib/                   # 유틸리티 함수
├── posts/                 # MDX 블로그 포스트
│   └── blog/             # 블로그 포스트 파일
├── public/               
│   └── posts/            # 포스트 이미지
│       ├── thumbnail/    # 썸네일 이미지
│       └── [포스트명]/   # 포스트별 이미지
└── velite.config.ts      # Velite 설정
```

## 🚦 시작하기

### 필요 사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/mepwj/blog.git
cd blog

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

## ✍️ 포스트 작성

새 포스트를 작성하려면 `posts/blog/` 디렉토리에 `.mdx` 파일을 생성하세요.

### Frontmatter 예시

```mdx
---
title: "포스트 제목"
date: "2025-01-20"
description: "포스트 설명"
thumbnailUrl: "/posts/thumbnail/my-post.jpg"
category: "Frontend"
tags: ["React", "Next.js"]
draft: false
---

# 포스트 내용

여기에 마크다운으로 내용을 작성하세요.
```

### 이미지 추가

```markdown
![설명](/posts/my-post/image.png)
```

자세한 가이드는 [posts/GUIDE.md](posts/GUIDE.md)를 참고하세요.

## 🎨 커스터마이징

### 프로필 수정
`data/profile.json` 파일에서 프로필 정보를 수정할 수 있습니다:
- 이름, 닉네임, 소개
- 소셜 미디어 링크
- 기술 스택

### 색상 테마
`tailwind.config.js`에서 색상 테마를 변경할 수 있습니다.

### MDX 컴포넌트
`app/blog/[slug]/components/mdx.tsx`에서 MDX 렌더링을 커스터마이징할 수 있습니다.

## 🎯 주요 특징

- **빌드 시간 최적화**: Velite를 통한 빌드 타임 콘텐츠 처리
- **타입 안정성**: TypeScript와 Velite의 자동 타입 생성
- **SEO 최적화**: 메타데이터 자동 생성
- **성능**: 정적 생성으로 빠른 로딩 속도

## 📦 주요 의존성

- Next.js 14
- Velite (MDX 처리)
- Tailwind CSS
- Fuse.js (검색)
- rehype-pretty-code (코드 하이라이팅)

## 🚀 배포

Vercel을 통한 자동 배포:

1. GitHub에 푸시
2. Vercel에서 프로젝트 연결
3. 자동 빌드 및 배포

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여

이슈와 PR은 언제나 환영합니다!

## 📧 연락처

- GitHub: [@mepwj](https://github.com/mepwj)
- Email: hoholeo382@gmail.com

---

Built with ☕ by [커피넛](https://github.com/mepwj)