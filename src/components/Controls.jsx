import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, Sparkles } from 'lucide-react';

/**
 * 🎮 타이머 조작 컨트롤러 컴포넌트
 * 시작(Start), 일시정지(Pause), 초기화(Reset), 건너뛰기(Skip) 및 사운드 설정
 */
export function Controls({
  isRunning,
  mode,
  soundEnabled,
  onToggleTimer,
  onResetTimer,
  onSkipSession,
  onSwitchMode,
  onToggleSound,
}) {
  const isFocus = mode === 'focus';

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm px-4">
      {/* 1. 메인 조작 버튼 (Start / Pause / Reset / Skip) */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
        {/* 초기화 (Reset) */}
        <button
          onClick={onResetTimer}
          title="타이머 초기화 (Reset)"
          aria-label="타이머 초기화"
          className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:scale-95 text-slate-300 hover:text-white border border-slate-700 transition-all duration-200 shadow-lg hover:shadow-slate-800/50"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* 시작 / 일시정지 (Start / Pause) - 대형 주요 액션 버튼 */}
        <button
          onClick={onToggleTimer}
          aria-label={isRunning ? "일시정지" : "시작"}
          className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-2.5 transition-all duration-200 transform active:scale-95 shadow-xl ${
            isFocus
              ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 hover:from-pink-400 hover:to-fuchsia-400 text-white shadow-pink-950/60 ring-2 ring-pink-400/30'
              : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-emerald-950/60 ring-2 ring-emerald-400/20'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-6 h-6 fill-current" />
              <span>잠깐 멈춤</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6 fill-current ml-0.5" />
              <span>{isFocus ? "집중 시작! 💖" : "휴식 시작! ☕"}</span>
            </>
          )}
        </button>

        {/* 세션 건너뛰기 (Skip) */}
        <button
          onClick={onSkipSession}
          title="다음 세션으로 건너뛰기"
          aria-label="다음 세션으로 건너뛰기"
          className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:scale-95 text-slate-300 hover:text-white border border-slate-700 transition-all duration-200 shadow-lg hover:shadow-slate-800/50"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* 2. 빠른 모드 전환 탭 (25분 집중 / 5분 휴식 직접 선택) */}
      <div className="flex items-center justify-between p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 w-full shadow-inner">
        <button
          onClick={() => onSwitchMode('focus')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            isFocus
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-950/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          💖 집중 (25분)
        </button>
        <button
          onClick={() => onSwitchMode('break')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            !isFocus
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          ☕ 휴식 (5분)
        </button>
      </div>

      {/* 3. 부가 설정 바: 사운드 토글 */}
      <div className="flex items-center justify-between w-full px-2 text-xs text-slate-400">
        <button
          onClick={onToggleSound}
          className="flex items-center gap-1.5 hover:text-slate-200 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800/60"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>알림음 켜짐</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-500" />
              <span>알림음 꺼짐</span>
            </>
          )}
        </button>

        <span className="flex items-center gap-1 text-[11px] text-slate-500">
          <Sparkles className="w-3 h-3 text-amber-400" />
          단축키: 스페이스바(시작/정지)
        </span>
      </div>
    </div>
  );
}

