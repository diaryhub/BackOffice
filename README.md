# Game BackOffice

게임 서비스 운영을 위한 관리자 백오피스 시스템입니다.
**Kotlin + Spring Boot** 기반 REST API 서버와 **React** 관리자 대시보드를 단일 애플리케이션으로 제공합니다.

> 관련 프로젝트: [ServerAPI](https://github.com/diaryhub/ServerAPI) · [WebLauncher](https://github.com/diaryhub/demo_launcher)

---

## 데모

| 항목 | 주소 |
|------|------|
| 관리자 대시보드 | http://demolauncher.duckdns.org:8081 |
| Swagger UI | http://demolauncher.duckdns.org:8081/swagger |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 언어 | Kotlin 2.x |
| 프레임워크 | Spring Boot 4.0.4 |
| 보안 | Spring Security · JJWT 0.12.6 · BCrypt |
| ORM | Spring Data JPA · Hibernate |
| DB | PostgreSQL (ServerAPI와 공유) |
| 빌드 | Gradle Kotlin DSL |
| 프론트엔드 | React 19 · TypeScript · Vite · Tailwind CSS v4 |
| 컨테이너 | Docker (멀티스테이지 빌드) |
| CI/CD | GitHub Actions → Docker Hub |
| 배포 | AWS EC2 · Docker Compose |

---

## 주요 기능

### 관리자 인증
- BCrypt 비밀번호 해싱
- JWT 발급 및 검증 (Spring Security Filter Chain)
- Stateless 세션 관리

### 배너 관리
- 가챠 배너 CRUD (배너명 · 기간 · 비용 · 이미지 URL)
- 등록된 배너는 ServerAPI를 통해 WebLauncher에 실시간 반영

### 공지사항 관리
- 공지 CRUD
- 등록된 공지는 WebLauncher에 즉시 노출

### 버전 관리
- 게임 버전 · 패치노트 · 출시일 CRUD
- ServerAPI가 DB에서 최신 버전을 조회해 런처에 표시

### 사용자 관리
- 전체 유저 조회
- 재화 지급 / 회수

---

## 아키텍처

```
[React 대시보드]
      ↓ 빌드 결과물 → Spring Boot static 서빙
[Spring Boot API]  ←→  [PostgreSQL]
      ↑
[JWT Filter (Spring Security)]
```

### 패키지 구조 (도메인 중심)

```
src/main/kotlin/com/project/backoffice/
├── config/
│   ├── SecurityConfig.kt      # Spring Security · CORS 설정
│   ├── JwtProvider.kt         # JWT 생성 · 검증
│   └── JwtFilter.kt           # OncePerRequestFilter
└── domain/
    ├── admin/                 # 관리자 인증 (로그인)
    ├── banner/                # 배너 관리
    ├── notice/                # 공지사항 관리
    ├── version/               # 버전 관리
    └── user/                  # 유저 · 재화 관리
```

### 프론트엔드 빌드 통합

Docker 멀티스테이지 빌드로 프론트엔드와 백엔드를 단일 이미지로 패키징합니다.

```dockerfile
# Stage 1: Node (React 빌드)
FROM node:22-alpine AS frontend
...

# Stage 2: Gradle (Spring Boot 빌드)
FROM gradle:8.14-jdk17 AS backend
COPY --from=frontend /app/src/main/resources/static ./src/main/resources/static
...

# Stage 3: JRE (실행)
FROM eclipse-temurin:17-jre
```

Vite의 `outDir`을 `src/main/resources/static`으로 설정해 Spring Boot가 정적 파일을 직접 서빙합니다.
SPA 라우팅은 `SpaForwardingConfig`에서 `forward:/index.html`로 처리합니다.

---

## CI/CD

`main` 브랜치 push 시 GitHub Actions가 자동으로 Docker 이미지를 빌드해 Docker Hub에 푸시합니다.

```
push (main)
  → GitHub Actions
    → docker build (멀티스테이지: React 빌드 → Gradle 빌드)
    → docker push → Docker Hub
```

EC2 배포는 의도적으로 수동으로 진행합니다 (운영 서버 실수 방지).

```bash
docker-compose pull && docker-compose up -d
```

---

## 로컬 실행

### 사전 조건
- JDK 17
- Docker (PostgreSQL 실행용)

### 환경변수 설정

```env
POSTGRES_ROOT_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_USERNAME=
JWT_SECRET=
```

### 실행

```bash
# DB 실행 (ServerAPI의 docker-compose 활용)
docker-compose up -d postgres

# BackOffice 서버 실행
./gradlew bootRun
```

프론트엔드 개발 서버:

```bash
cd frontend
npm install
npm run dev   # localhost:5174
```

---

## ServerAPI 연동 구조

BackOffice와 ServerAPI는 **동일한 PostgreSQL DB**를 바라봅니다.

```
BackOffice (관리자)          ServerAPI (게임 서버)
    ↓ 배너 등록                   ↓ 배너 조회
    ↓ 공지 작성          →  PostgreSQL  ←   ↓ 공지 조회
    ↓ 버전 등록                   ↓ 버전 조회
```

ServerAPI는 런처용 데이터를 Redis에 캐싱하므로, BackOffice에서 데이터를 변경한 뒤 캐시 만료(최대 1시간) 또는 Redis flush 후 반영됩니다.
