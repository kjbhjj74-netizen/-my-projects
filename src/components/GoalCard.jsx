import React, { useState } from 'react';
import { Target, CheckCircle2, Trophy, Plus, Check } from 'lucide-react';

/**
 * 🎯 대표님의 집중 목표 카드 (1인 기업가 맞춤)
 * 25분 동안 한 가지에만 몰입할 수 있도록 돕는 미니 투두 & 성취 카운터!
 */
export function GoalCard({ completedCount, onResetCount }) {
  const [goal, setGoal] = useState("오늘의 첫 번째 핵심 업무 끝내기 ✨");
  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal);

  const handleSave = (e) => {
    e.preventDefault();
    if (tempGoal.trim()) {
      setGoal(tempGoal.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-sm mt-4 p-4 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-lg">
      {/* 상단: 완료한 뽀모도로 세션 카운트 */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/70 text-xs text-slate-300">
        <div className="flex items-center gap-1.5 font-medium">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>오늘 달성한 뽀모</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(completedCount, 6) }).map((_, i) => (
              <span key={i} className="text-sm animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                🍅
              </span>
            ))}
            {completedCount > 6 && (
              <span className="text-xs font-bold text-pink-400">+{completedCount - 6}</span>
            )}
            {completedCount === 0 && (
              <span className="text-[11px] text-slate-500">아직 달린 뽀모가 없어요</span>
            )}
          </div>
          {completedCount > 0 && (
            <button
              onClick={onResetCount}
              title="카운트 리셋"
              className="text-[10px] text-slate-500 hover:text-slate-300 underline ml-2"
            >
              초기화
            </button>
          )}
        </div>
      </div>

      {/* 하단: 현재 집중 목표 입력 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 font-semibold text-pink-400">
            <Target className="w-3.5 h-3.5" />
            지금 몰입할 단 하나의 목표 💖
          </span>
          {!isEditing && (
            <button
              onClick={() => {
                setTempGoal(goal);
                setIsEditing(true);
              }}
              className="hover:text-slate-200 transition-colors"
            >
              수정
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="flex items-center gap-1.5 mt-1">
            <input
              type="text"
              value={tempGoal}
              onChange={(e) => setTempGoal(e.target.value)}
              placeholder="예: 결제 모듈 연동 완료하기"
              className="flex-1 bg-slate-800 text-xs text-white px-3 py-1.5 rounded-xl border border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-400"
              autoFocus
            />
            <button
              type="submit"
              className="p-1.5 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div 
            onClick={() => {
              setTempGoal(goal);
              setIsEditing(true);
            }}
            className="text-xs sm:text-sm text-slate-200 bg-slate-800/40 hover:bg-slate-800/70 p-2.5 rounded-2xl border border-slate-800 cursor-pointer transition-colors flex items-center justify-between"
          >
            <span className="truncate">{goal}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
          </div>
        )}
      </div>
    </div>
  );
}

