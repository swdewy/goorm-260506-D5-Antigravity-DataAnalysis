# 📊 자동화된 데이터 분석 AI 에이전트 (Auto EDA Agent)

본 프로젝트는 CSV 데이터를 업로드하면 **데이터 개요 파악 → EDA 탐색적 데이터 분석 → 자동 통계 시각화 → OpenAI 기반 인사이트 도출**에 이르는 전체 파이프라인을 자동으로 수행해주는 웹 애플리케이션입니다.

## ✨ 주요 기능 (MVP)

1. **간편한 파일 업로드 (Drag & Drop)**
   - 대시보드에서 클릭 혹은 드래그 앤 드롭으로 `.csv` 파일을 업로드할 수 있습니다.
2. **자동 데이터 개요 (Data Summary)**
   - 총 데이터 행(Rows), 컬럼(Columns) 수, 수치형 변수 개수, 결측치(Missing Values)를 자동으로 계산하여 시각화된 카드로 보여줍니다.
3. **EDA 기초 분석 패널 (EDA Panel)**
   - 머신러닝/분석을 위해 데이터셋 내에서 가장 중요한 **타겟(Target) 변수**를 자동 식별합니다.
   - 주요 수치형 변수와 범주형 변수를 분류하여 제공합니다.
4. **자동 시각화 (2x2 차트 구조)**
   - 식별된 타겟의 분포(Target Distribution)
   - 주요 수치형 변수의 분포 히스토그램 (최대 2개)
   - 수치형 변수들 간의 상관관계 히트맵(Correlation Heatmap)
   - 총 4개의 차트가 `Matplotlib` / `Seaborn`에 의해 서버에서 자동 생성되어 브라우저에 표시됩니다.
5. **AI 인사이트 도출 (LLM 기반)**
   - 데이터 요약 정보와 EDA 통계 데이터를 바탕으로 **OpenAI GPT** 모델을 호출하여 5개의 핵심적인 인사이트를 한국어로 요약해 제공합니다.

---

## 🛠 시스템 아키텍처 및 기술 스택

### Frontend
- **React + Vite** (빠른 빌드와 모던 개발 환경)
- **TypeScript** (안정적인 타입 시스템)
- **Tailwind CSS** (프리미엄 UI/UX 스타일링)
- **Lucide-React** (직관적인 아이콘 지원)
- **React Dropzone** (파일 업로드 처리)

### Backend
- **Python + FastAPI** (비동기 기반의 빠른 API 구축)
- **Pandas / NumPy** (데이터 조작 및 연산)
- **Matplotlib / Seaborn** (데이터 시각화, Base64 이미지 변환)
- **OpenAI API** (비동기 `AsyncOpenAI` 호출로 AI 인사이트 획득)

---

## 🚀 실행 가이드 (로컬 환경)

### 1. 백엔드 (Backend)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# OpenAI API 키 설정 (선택 사항)
export OPENAI_API_KEY="sk-..."
# FastAPI 서버 실행
uvicorn main:app --reload --port 8000
```

### 2. 프론트엔드 (Frontend)
```bash
cd frontend
npm install
# Vite 프론트엔드 서버 실행 (기본 포트: 3000번)
npm run dev
```

---

## ☁️ 배포(Deployment) 전략

- **Frontend:** Vercel에 GitHub 저장소를 연동하여 즉시 배포 가능합니다. 빌드 명령어는 `npm run build`를 사용합니다.
- **Backend:** Railway 혹은 Render 플랫폼에 배포하여 Python Web Server 환경을 구성합니다. 환경 변수(`OPENAI_API_KEY`)를 설정하여 AI 기능을 실제 서비스에 통합할 수 있습니다.
