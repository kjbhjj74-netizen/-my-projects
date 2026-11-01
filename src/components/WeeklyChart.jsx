import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Flame, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

/**
 * 📊 월화수목금토일 주간 집중 시간 시각화 컴포넌트
 * 대표님이 요일별로 얼마나 몰입하셨는지 한눈에 쏙 들어오는 핫핑크 바 차트!
 */
export function WeeklyChart({ weeklyData, todayIndex }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  // 주간 총 집중 시간(분) 계산
  const totalMinutes = weeklyData.reduce((acc, curr) => acc + curr, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const averageMinutes = Math.round(totalMinutes / 7);

  // 최고 몰입 요일 찾기
  const maxMinutes = Math.max(...weeklyData, 1);
  const bestDayIndex = weeklyData.indexOf(Math.max(...weeklyData));
  const bestDay = days[bestDayIndex];

  // 시간 포맷 헬퍼 (분 -> "X시간 Y분" or "X분")
  const formatTime = (mins) => {
    if (mins === 0) return '0분';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h}시간 ${m}분`;
    if (h > 0) return `${h}시간`;
    return `${m}분`;
  };

  return (
    <div className="w-full max-w-sm mt-4 p-4 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-xl transition-all duration-300">
      {/* 상단 헤더 & 접기/펼치기 토글 */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>주간 몰입 통계</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950/60 text-pink-300 border border-pink-500/30 font-medium">
                월~일 요일별
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-pink-300 transition-colors">
          <span className="font-semibold text-pink-400">{totalHours}h</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* 펼쳐졌을 때 내용 */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-slate-800/70 animate-fadeIn">
          {/* 1. 요일별 막대 차트 (월화수목금토일) */}
          <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-36 pt-6 pb-2 px-1">
            {weeklyData.map((mins, idx) => {
              const isToday = idx === todayIndex;
              const isBest = idx === bestDayIndex && mins > 0;
              // 최대치 기준 높이 비율 (최소 8% 보장)
              const heightPercent = maxMinutes > 0 ? Math.max((mins / maxMinutes) * 100, 8) : 8;

              return (
                <div 
                  key={days[idx]}
                  onMouseEnter={() => setHoveredDay(idx)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end relative group cursor-pointer"
                >
                  {/* 호버 시 툴팁 말풍선 */}
                  {hoveredDay === idx && (
                    <div className="absolute -top-10 z-30 px-2.5 py-1 rounded-xl bg-slate-800 border border-pink-400/60 text-[10px] text-white shadow-xl whitespace-nowrap animate-bounce-gentle">
                      <p className="font-bold text-pink-300">{days[idx]}요일: {formatTime(mins)}</p>
                      <p className="text-[9px] text-slate-400">{Math.floor(mins / 25)} 뽀모 달성 🍅</p>
                    </div>
                  )}

                  {/* 오늘 표시 뱃지 */}
                  {isToday && (
                    <span className="absolute -top-4 text-[9px] font-bold text-pink-400 animate-pulse">
                      오늘
                    </span>
                  )}

                  {/* 세로 바 (Bar) */}
                  <div className="w-full bg-slate-800/60 rounded-xl overflow-hidden flex flex-col justify-end h-full p-0.5 border border-slate-800">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-lg transition-all duration-700 relative ${
                        isToday
                          ? 'bg-gradient-to-t from-pink-600 via-pink-500 to-rose-400 shadow-lg shadow-pink-500/40 ring-1 ring-pink-300'
                          : isBest
                          ? 'bg-gradient-to-t from-fuchsia-600 to-pink-500 shadow-md shadow-fuchsia-900/30'
                          : 'bg-gradient-to-t from-slate-700 to-pink-500/70 group-hover:from-pink-600 group-hover:to-pink-400'
                      }`}
                    >
                      {/* 최고 기록 반짝이 */}
                      {isBest && (
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[0.5px] animate-ping" />
                      )}
                    </div>
                  </div>

                  {/* 요일 라벨 */}
                  <span className={`text-[11px] font-medium transition-colors ${
                    isToday 
                      ? 'text-pink-400 font-bold scale-110' 
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {days[idx]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 2. 주간 요약 통계 카드 */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/60 text-center">
            {/* 총 시간 */}
            <div className="p-2 rounded-2xl bg-slate-800/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-pink-400" /> 총 몰입
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-100 mt-0.5">{totalHours}시간</p>
            </div>

            {/* 일일 평균 */}
            <div className="p-2 rounded-2xl bg-slate-800/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> 일일 평균
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-100 mt-0.5">{averageMinutes}분</p>
            </div>

            {/* 최고 몰입 요일 */}
            <div className="p-2 rounded-2xl bg-slate-800/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> 최고 요일
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-100 mt-0.5">
                {bestDay}요일 🔥
              </p>
            </div>
          </div>

          {/* 3. 코다리 부장의 한 줄 코멘트 */}
          <div className="mt-2.5 p-2 rounded-xl bg-pink-950/30 border border-pink-500/20 flex items-center gap-2 text-[11px] text-pink-200">
            <span className="text-sm">🐟</span>
            <span className="truncate">
              {totalMinutes >= 300 
                ? "대표님! 이번 주 열정이 아주 불타오르고 계십니다! 존경합니다! 🚀"
                : "대표님, 오늘 뽀모 몇 개 더 달리면 이번 주 목표 달성입니다! 파이팅! 💖"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

