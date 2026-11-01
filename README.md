# 🍅 코다리 부장의 귀여운 뽀모도로 타이머 (Cute Pomodoro)

> 1인 기업 대표님의 폭풍 몰입과 달콤한 휴식을 지원하는 고효율 귀염뽀짝 뽀모도로 타이머 웹 애플리케이션입니다. 🫡🐟

---

## ✨ 핵심 기능 요약

1. **대형 디지털 타이머 및 원형 프로그레스 링**
   - 25분 집중(Focus) 및 5분 휴식(Break)을 한눈에 볼 수 있는 부드러운 네온 글래스모피즘 UI
   - 남은 시간 및 진행 퍼센트 실시간 표시
   - 브라우저 탭 타이틀 실시간 연동 `(24:59) 🍅 집중 중`

2. **귀염뽀짝 반응형 마스코트 '포모(Pomo)'**
   - 집중 모드와 휴식 모드, 타이머 동작 여부에 따라 실시간으로 표정이 변화
   - 마스코트를 클릭하면 코다리 부장의 찰진 응원 말풍선 등장!

3. **1인 기업가를 위한 몰입 목표 카드 & 달성 뽀모 카운터**
   - 이번 세션에 끝낼 단 하나의 목표를 설정하고 완료 체크
   - 달성한 뽀모 도로 🍅 누적 카운트 표시

4. **Web Audio API 자체 사운드 효과 & 축하 폭죽(Confetti)**
   - 별도 외부 음원 파일 없이 오프라인에서도 작동하는 청아한 알림 벨소리
   - 집중 세션 종료 시 축하 콘페티 폭죽 팡팡! 🎉

5. **편리한 단축키 지원**
   - `Space`: 시작 / 일시정지
   - `R`: 타이머 초기화

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: React 18, Vite 6
- **Styling**: Tailwind CSS, PostCSS, Lucide React (Cute Icons)
- **Effects**: canvas-confetti, Web Audio API
- **Testing**: Vitest, React Testing Library, JSDOM

---

## 🚀 실행 방법 (How to Run)

### 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:5173` 접속

### 테스트 실행
```bash
npm test
```

### 프로덕션 빌드
```bash
npm run build
```

