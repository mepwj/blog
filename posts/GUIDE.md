# 블로그 글 작성 가이드

이 문서는 velite 기반 블로그에 새로운 글을 작성하는 방법을 설명합니다.

## 📁 디렉토리 구조

```
posts/
└── blog/                    # 모든 블로그 글은 이 폴더에 작성
    ├── my-first-post.mdx   # MDX 파일로 작성
    └── another-post.mdx

public/
└── posts/
    ├── thumbnail/          # 썸네일 이미지
    │   └── my-first-post.jpg
    └── my-first-post/      # 포스트별 이미지
        ├── image1.png
        └── image2.gif
```

## ✍️ 새 글 작성하기

### 1. MDX 파일 생성

`posts/blog/` 디렉토리에 새로운 `.mdx` 파일을 생성합니다:

```bash
# 예시
posts/blog/my-awesome-post.mdx
```

### 2. Frontmatter 작성

모든 MDX 파일은 다음과 같은 frontmatter로 시작해야 합니다:

```markdown
---
title: "포스트 제목"
date: "2025-01-20"
description: "포스트에 대한 간단한 설명 (검색 결과에 표시됨)"
thumbnailUrl: "/posts/thumbnail/my-awesome-post.jpg"
category: "Frontend"
tags: ["React", "Next.js", "TypeScript"]
draft: false
---
```

#### Frontmatter 필드 설명:
- `title`: 포스트 제목 (필수)
- `date`: 작성일 (YYYY-MM-DD 형식, 필수)
- `description`: 포스트 설명 (필수)
- `thumbnailUrl`: 썸네일 이미지 경로 (필수)
- `category`: 카테고리 (필수)
- `tags`: 태그 배열 (선택)
- `draft`: 초안 여부 (선택, 기본값: false)

### 3. 본문 작성

일반적인 Markdown 문법과 MDX 기능을 사용할 수 있습니다:

```markdown
# 제목

일반 텍스트를 작성합니다.

## 부제목

**굵은 글씨**와 *기울임체*를 사용할 수 있습니다.

### 목록

- 항목 1
- 항목 2
  - 하위 항목

### 코드 블록

\`\`\`typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "홍길동",
  age: 25
};
\`\`\`

### 인라인 코드

`const name = "velite"` 처럼 인라인 코드를 사용할 수 있습니다.

### 인용문

> 이것은 인용문입니다.
> 여러 줄로 작성할 수 있습니다.

### 링크

[Next.js 공식 문서](https://nextjs.org)

### 표

| 제목 | 설명 |
|------|------|
| Velite | 정적 사이트 생성기 |
| MDX | 마크다운 + JSX |
```

## 🖼️ 이미지 추가하기

### 1. 썸네일 이미지

썸네일은 `/public/posts/thumbnail/` 디렉토리에 저장합니다:

```bash
# 파일명은 포스트 slug와 동일하게
public/posts/thumbnail/my-awesome-post.jpg
```

### 2. 본문 이미지

포스트 본문에 사용할 이미지는 포스트별 디렉토리에 저장합니다:

```bash
# 포스트별 디렉토리 생성
public/posts/my-awesome-post/
├── feature-image.png
├── diagram.svg
└── demo.gif
```

### 3. 이미지 삽입

MDX 파일에서 이미지를 삽입할 때는 절대 경로를 사용합니다:

```markdown
![이미지 설명](/posts/my-awesome-post/feature-image.png)

![다이어그램](/posts/my-awesome-post/diagram.svg)

![데모 GIF](/posts/my-awesome-post/demo.gif)
```

## 🚀 글 발행하기

### 1. 초안 작성

작성 중인 글은 `draft: true`로 설정하여 공개되지 않도록 할 수 있습니다:

```yaml
---
title: "작성 중인 글"
draft: true
---
```

### 2. 로컬에서 확인

```bash
npm run dev
```

개발 서버를 실행하고 `http://localhost:3000/blog`에서 확인합니다.

### 3. 발행

`draft: false`로 변경하거나 해당 필드를 제거하면 글이 공개됩니다.

## 📋 체크리스트

새 글을 작성할 때 다음 사항을 확인하세요:

- [ ] MDX 파일을 `posts/blog/` 디렉토리에 생성했나요?
- [ ] Frontmatter의 필수 필드를 모두 작성했나요?
- [ ] 썸네일 이미지를 `/public/posts/thumbnail/`에 추가했나요?
- [ ] 본문 이미지를 `/public/posts/[포스트명]/`에 추가했나요?
- [ ] 이미지 경로가 올바른가요?
- [ ] `draft` 상태를 확인했나요?
- [ ] 카테고리와 태그가 적절한가요?

## 💡 팁

1. **파일명**: 영문 소문자와 하이픈(-)을 사용하세요 (예: `my-awesome-post.mdx`)
2. **이미지 최적화**: 웹에 최적화된 형식(WebP, 최적화된 JPEG/PNG)을 사용하세요
3. **제목 길이**: SEO를 위해 60자 이내로 작성하세요
4. **설명 길이**: 150자 이내로 간결하게 작성하세요
5. **코드 하이라이팅**: 지원되는 언어 목록은 [여기](https://github.com/shikijs/shiki/blob/main/docs/languages.md)에서 확인하세요

## 🔧 문제 해결

### velite 빌드 오류

```bash
# velite 캐시 삭제 후 재빌드
rm -rf .velite
npm run build
```

### 이미지가 표시되지 않을 때

1. 이미지 경로가 `/posts/`로 시작하는지 확인
2. 파일명에 특수문자가 없는지 확인
3. 이미지 파일이 실제로 존재하는지 확인

### 포스트가 목록에 나타나지 않을 때

1. `draft: false`인지 확인
2. frontmatter 형식이 올바른지 확인
3. 날짜 형식이 "YYYY-MM-DD"인지 확인