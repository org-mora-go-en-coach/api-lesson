# API Lesson

Mora Go의 강의 정보와 사용자별 학습 상태를 제공하는 Next.js API입니다.

## 구현 내용

- 강의 목록과 단일 강의 조회
- 강의 진행률과 저장 여부 변경
- 최근 학습 및 사용자 활동 조회
- 버전 API와 비버전 호환 경로 제공
- Turso 영구 저장소와 로컬 메모리 저장소 지원

## 주요 API

- `GET /api/v1.0.2/lessons`
- `GET /api/v1.0.2/lessons/:id`
- `PATCH /api/v1.0.2/lessons/:id`
- `GET /api/v1.0.2/activity`

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버는 `http://localhost:4201`에서 실행됩니다.
