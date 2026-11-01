import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { Mascot } from './components/Mascot';
import { GoalCard } from './components/GoalCard';
import { WeeklyChart } from './components/WeeklyChart';
import { playClickSound, playSuccessChime, playBreakEndChime } from './utils/audio';

// 기본 시간 설정 (초 단위)
export const FOCUS_TIME = 25 * 60; // 25분 = 1500초
export const BREAK_TIME = 5 * 60;  // 5분 = 300초

// 기본 주간 샘플 데이터 (월, 화, 수, 목, 금, 토, 일 - 분 단위)
const DEFAULT_WEEKLY_MINUTES = [100, 150, 175, 125, 150, 75, 50];

export default function App() {
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 오늘 요일 인덱스 (0: 월, 1: 화, ..., 6: 일)
  const todayIndex = (new Date().getDay() + 6) % 7;

  // 주간 집중 시간 데이터 (월~일, 분 단위)
  const [weeklyData, setWeeklyData] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('kodari_pomodoro_weekly_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 7) return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
    return DEFAULT_WEEKLY_MINUTES;
  });

  // 현재 모드의 총 시간
  const totalDuration = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;

  // 브라우저 탭 타이틀 실시간 업데이트
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const modeLabel = mode === 'focus' ? '🍅 집중 중' : '☕ 휴식 중';
    document.title = `(${formatted}) ${modeLabel} - 코다리 뽀모도로`;
  }, [timeLeft, mode]);

  // 타이머 인터벌 처리
  useEffect(() => {
    let timerId = null;

    if (isRunning) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            handleSessionComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning, mode]);

  // 세션 완료 시 처리 함수
  const handleSessionComplete = () => {
    setIsRunning(false);

    if (mode === 'focus') {
      // 1. 포커스 완료 축하 핫핑크 콘페티 폭죽 팡팡! 🎉💖
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#ff1493', '#ff007f', '#ff69b4', '#f472b6', '#fbcfe8', '#ffd1dc'],
      });

      // 2. 축하 사운드 재생
      playSuccessChime(soundEnabled);

      // 3. 달성 뽀모 카운트 증가
      setCompletedCount((prev) => prev + 1);

      // 4. 주간 집중 데이터 오늘 요일에 25분 누적! 📊💖
      setWeeklyData((prev) => {
        const updated = [...prev];
        updated[todayIndex] = (updated[todayIndex] || 0) + 25;
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('kodari_pomodoro_weekly_data', JSON.stringify(updated));
          }
        } catch (e) {
          // ignore
        }
        return updated;
      });

      // 5. 휴식 모드로 자동 전환 준비
      setMode('break');
      setTimeLeft(BREAK_TIME);
    } else {
      // 휴식 완료 알림음
      playBreakEndChime(soundEnabled);

      // 다시 집중 모드로 전환
      setMode('focus');
      setTimeLeft(FOCUS_TIME);
    }
  };

  // 타이머 토글 (시작 / 일시정지)
  const handleToggleTimer = () => {
    playClickSound(soundEnabled);
    setIsRunning((prev) => !prev);
  };

  // 타이머 초기화 (Reset)
  const handleResetTimer = () => {
    playClickSound(soundEnabled);
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  };

  // 세션 강제 건너뛰기 (Skip)
  const handleSkipSession = () => {
    playClickSound(soundEnabled);
    setIsRunning(false);
    if (mode === 'focus') {
      setMode('break');
      setTimeLeft(BREAK_TIME);
    } else {
      setMode('focus');
      setTimeLeft(FOCUS_TIME);
    }
  };

  // 모드 수동 전환
  const handleSwitchMode = (newMode) => {
    playClickSound(soundEnabled);
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  };

  // 사운드 켜기/끄기 토글
  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // 스페이스바 단축키 이벤트
  useEffect(() => {
    const handleKeyDown = (e) => {
      // input에 포커스가 있을 때는 단축키 무시
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleToggleTimer();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleResetTimer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, soundEnabled, mode]);

  return (
    <div className="min-h-screen bg-[#0d0f18] text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden selection:bg-pink-500 selection:text-white">
      {/* 배경 장식 은은한 핫핑크 & 딥바이올렛 글로우 */}
      <div 
        className={`absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[130px] pointer-events-none transition-colors duration-1000 ${
          mode === 'focus' ? 'bg-pink-600/25' : 'bg-emerald-900/20'
        }`}
      />
      <div 
        className={`absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full blur-[130px] pointer-events-none transition-colors duration-1000 ${
          mode === 'focus' ? 'bg-fuchsia-600/20' : 'bg-teal-900/15'
        }`}
      />

      {/* 헤더 */}
      <header className="w-full max-w-md flex items-center justify-between py-2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-400 flex items-center justify-center text-lg shadow-md shadow-pink-900/50">
            🍅
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
              <span>코다리 뽀모도로</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950/50 text-pink-300 border border-pink-500/30">
                💖 Hot Pink
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">1인 기업 대표님 전용 몰입 타이머</p>
          </div>
        </div>

        {/* 코다리 부장 뱃지 */}
        <div className="flex items-center gap-1 text-xs bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-full border border-pink-500/20 shadow-sm transition-transform hover:scale-105 select-none">
          <span>🐟</span>
          <span className="text-slate-300 font-medium text-[11px]">개발부장 코다리</span>
        </div>
      </header>

      {/* 메인 타이머 카드 컨테이너 */}
      <main className="w-full max-w-md flex flex-col items-center justify-center my-auto py-4 z-10">
        {/* 귀여운 토마토 마스코트 (인터랙티브) */}
        <Mascot 
          mode={mode} 
          isRunning={isRunning} 
          completedCycles={completedCount} 
        />

        {/* 대형 타이머 디스플레이 */}
        <TimerDisplay
          mode={mode}
          timeLeft={timeLeft}
          totalDuration={totalDuration}
          isRunning={isRunning}
        />

        {/* 조작 버튼 컨트롤러 */}
        <Controls
          isRunning={isRunning}
          mode={mode}
          soundEnabled={soundEnabled}
          onToggleTimer={handleToggleTimer}
          onResetTimer={handleResetTimer}
          onSkipSession={handleSkipSession}
          onSwitchMode={handleSwitchMode}
          onToggleSound={handleToggleSound}
        />

        {/* 목표 & 완료 뽀모 카드 */}
        <GoalCard
          completedCount={completedCount}
          onResetCount={() => setCompletedCount(0)}
        />

        {/* 📊 월화수목금토일 주간 집중 시간 시각화 차트 */}
        <WeeklyChart
          weeklyData={weeklyData}
          todayIndex={todayIndex}
        />
      </main>

      {/* 푸터 */}
      <footer className="w-full max-w-md text-center py-2 z-10 text-[11px] text-slate-500 font-medium">
        <p>충성! 대표님의 성공을 위해 코다리가 24시간 응원합니다 🫡✨</p>
      </footer>
    </div>
  );
}

