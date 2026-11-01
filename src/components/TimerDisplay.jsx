import React from 'react';
import { Flame, Coffee, Sparkles } from 'lucide-react';

/**
 * ⏱️ 대형 디지털 타이머 및 원형 프로그레스 디스플레이
 * 집중(Focus) / 휴식(Break) 모드에 따라 테마 컬러와 은은한 네온 글로우가 전환됩니다.
 */
export function TimerDisplay({ 
  mode, 
  timeLeft, 
  totalDuration, 
  isRunning 
}) {
  // mm:ss 포맷팅 함수
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // 원형 프로그레스 계산
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  // 남은 시간 비율 (0 ~ 1)
  const progressRatio = totalDuration > 0 ? timeLeft / totalDuration : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const isFocus = mode === 'focus';

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* 모드 표시 뱃지 */}
      <div className="mb-4">
        <div 
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 shadow-md ${
            isFocus 
              ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-pink-950/40' 
              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-emerald-950/40'
          }`}
        >
          {isFocus ? (
            <>
              <Flame className={`w-4 h-4 text-pink-400 ${isRunning ? 'animate-bounce' : ''}`} />
              <span>집중 모드 (Focus Session) 💖</span>
            </>
          ) : (
            <>
              <Coffee className={`w-4 h-4 text-emerald-400 ${isRunning ? 'animate-pulse' : ''}`} />
              <span>달콤한 휴식 (Break Time)</span>
            </>
          )}
        </div>
      </div>

      {/* 원형 프로그레스 게이지 & 대형 타이머 */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* 부드러운 네온 백그라운드 글로우 */}
        <div 
          className={`absolute inset-4 rounded-full blur-2xl transition-all duration-700 pointer-events-none opacity-50 ${
            isFocus 
              ? 'bg-pink-500/40' 
              : 'bg-emerald-500/30'
          }`}
        />

        {/* SVG 원형 프로그레스 바 */}
        <svg 
          className="w-full h-full -rotate-90 transform"
          viewBox="0 0 280 280"
        >
          {/* 배경 트랙 */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="transparent"
            stroke="#1e2235"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* 진행 바 */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="transparent"
            stroke={isFocus ? "url(#focusStrokeGrad)" : "url(#breakStrokeGrad)"}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: isRunning ? 'stroke-dashoffset 1s linear' : 'stroke-dashoffset 0.3s ease',
            }}
          />

          <defs>
            <linearGradient id="focusStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff007f" />
              <stop offset="50%" stopColor="#ff1493" />
              <stop offset="100%" stopColor="#ff69b4" />
            </linearGradient>
            <linearGradient id="breakStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>

        {/* 타이머 시간 텍스트 (가운데 정렬) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none">
          <span 
            data-testid="timer-display"
            className={`font-timer text-5xl sm:text-6xl font-bold tracking-tight transition-colors duration-300 ${
              isFocus 
                ? 'text-pink-50 drop-shadow-[0_0_24px_rgba(255,20,147,0.45)]' 
                : 'text-emerald-50 drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]'
            }`}
          >
            {formattedTime}
          </span>

          {/* 소진 퍼센트 안내 */}
          <span className="text-xs text-slate-400 mt-2 font-medium">
            {Math.round((1 - progressRatio) * 100)}% 진행 완료
          </span>
        </div>
      </div>
    </div>
  );
}

