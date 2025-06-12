---
title: "블로그 포스트 작성 가이드"
date: "2025-01-01"
description: "Coffeenuts.dev 블로그 포스트 작성을 위한 가이드입니다."
thumbnail: "/images/common/default-thumbnail.jpg"
category: "Guide"
tags: ["가이드", "블로그", "마크다운"]
draft: true
---

# 📝 Coffeenuts.dev 블로그 포스트 작성 가이드

이 가이드는 블로그에 표시되지 않습니다 (`draft: true` 설정).

## 📁 파일 구조

### 1. 포스트 파일명
- 위치: `/posts/` 폴더
- 형식: `제목.md` (예: `react-hooks-guide.md`)
- URL: `/posts/제목` (예: `/posts/react-hooks-guide`)

### 2. 이미지 파일
- 위치: `/public/images/포스트제목/` 폴더
- 썸네일: `thumbnail.jpg` (필수)
- 기타 이미지: 자유롭게 명명

## 📋 Frontmatter 설정

```yaml
---
title: "포스트 제목"
date: "YYYY-MM-DD"
description: "포스트 설명 (SEO 및 카드에 표시)"
thumbnail: "/images/포스트제목/thumbnail.jpg"
category: "카테고리명"
tags: ["태그1", "태그2", "태그3"]
draft: false  # true면 블로그에 표시되지 않음
---
```

### 필수 항목
- `title`: 포스트 제목
- `date`: 작성일 (YYYY-MM-DD 형식)
- `category`: 카테고리명
- `draft`: 게시 여부 (false = 게시, true = 숨김)

### 선택 항목
- `description`: 포스트 설명
- `thumbnail`: 썸네일 이미지 경로
- `tags`: 태그 배열

## 🖼️ 이미지 사용법

### 썸네일 이미지
```yaml
thumbnail: "/images/포스트제목/thumbnail.jpg"
```

### 본문 이미지
```markdown
![이미지 설명](/images/포스트제목/이미지명.jpg)
```

## 📝 마크다운 작성 팁

### 제목 구조
```markdown
# H1 - 포스트 메인 제목
## H2 - 섹션 제목
### H3 - 하위 섹션
```

### 코드 블록
````markdown
```javascript
function example() {
  console.log("Hello, World!");
}
```
````

### 인용구
```markdown
> 이것은 인용구입니다.
```

### 리스트
```markdown
- 순서 없는 리스트
- 아이템 2

1. 순서 있는 리스트
2. 아이템 2
```

### 링크
```markdown
[링크 텍스트](https://example.com)
```

### 강조
```markdown
**굵게** 또는 __굵게__
*기울임* 또는 _기울임_
`인라인 코드`
```

## 📂 카테고리 예시
- Frontend
- Backend
- DevOps
- JavaScript
- TypeScript
- React
- Node.js
- Database
- Tools
- Review

## 🏷️ 태그 예시
- javascript
- typescript
- react
- nextjs
- nodejs
- css
- html
- git
- database
- api
- tutorial
- review
- tips

## ✅ 체크리스트

포스트 작성 전:
- [ ] 파일명이 URL에 적합한지 확인
- [ ] 썸네일 이미지 준비
- [ ] 카테고리 결정

포스트 작성 중:
- [ ] Frontmatter 모든 필수 항목 작성
- [ ] 이미지 경로 확인
- [ ] 코드 블록 언어 지정
- [ ] 제목 구조 정리

포스트 작성 후:
- [ ] `draft: false`로 설정
- [ ] 로컬에서 미리보기 확인
- [ ] 배포 후 최종 확인

## 🚀 배포

1. 파일 저장
2. Git 커밋 & 푸시
3. Vercel 자동 배포
4. 블로그에서 확인

---

💡 **팁**: 이 가이드 파일은 `draft: true`로 설정되어 있어 블로그에 표시되지 않습니다.