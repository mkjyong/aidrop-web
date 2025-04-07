# AiDrop-web

AiDrop은 블록체인 주소를 제출하고 관리하는 간단한 웹 애플리케이션입니다. 사용자가 다양한 블록체인의 지갑 주소를 제출할 수 있는 플랫폼을 제공합니다.

## 기능

- 다양한 블록체인 지원 (EVM 및 비EVM 체인)
- 사용자 지갑 주소 제출 및 저장
- 주소 유효성 검사
- 반응형 사용자 인터페이스

## 기술 스택

- **프론트엔드**: Next.js 15, React 19, TypeScript
- **스타일링**: Tailwind CSS
- **데이터베이스**: Supabase
- **배포**: Vercel

## 시작하기

### 사전 요구사항

- Node.js 20.x 이상
- npm 또는 yarn
- Supabase 계정 및 프로젝트

### 설치

1. 저장소 복제:
   ```bash
   git clone https://github.com/your-username/AiDrop-web.git
   cd AiDrop-web
   ```

2. 종속성 설치:
   ```bash
   npm install
   ```

3. 환경 변수 설정:
   `.env.local` 파일을 생성하고 다음 내용을 추가하세요:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. 개발 서버 실행:
   ```bash
   npm run dev
   ```

## 데이터베이스 설정

Supabase 프로젝트에서 다음 테이블을 생성하세요:

### user_submissions 테이블
- `id`: uuid (기본 키)
- `created_at`: timestamp with time zone
- `chain_id`: text
- `address`: text
- `ip_address`: text (선택 사항)

## 기여하기

기여는 언제나 환영합니다! 이슈를 열거나 풀 리퀘스트를 제출해주세요.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.