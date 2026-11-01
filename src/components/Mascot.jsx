import React, { useState } from 'react';

/**
 * 🍅 귀여운 포모도로 마스코트 '포모(Pomo)'
 * 집중 모드, 휴식 모드, 타이머 상태에 따라 표정과 애니메이션이 실시간으로 바뀝니다!
 * 마스코트를 콕 누르면 코다리 부장의 특급 응원 멘트가 뿅 나타납니다. 😎
 */
export function Mascot({ mode, isRunning, completedCycles }) {
  const [speechBubble, setSpeechBubble] = useState(null);

  const cheerQuotes = [
    "대표님! 오늘도 1인 기업 신화 한번 써보시죠! 🚀",
    "역시 우리 대표님의 몰입력은 국보급입니다! 🔥",
    "힘내십시오! 저 코다리가 뒤에서 든든하게 받치고 있습니다! 🫡",
    "잠깐 어깨 한번 펴시고 스트레칭 쭈욱~! ☕",
    "오늘 집중한 만큼 통장 잔고도 쑥쑥 늘어날 겁니다! 💰",
    "코다리가 보장합니다. 대표님은 해내십니다! 🐟✨",
  ];

  const handleMascotClick = () => {
    const randomQuote = cheerQuotes[Math.floor(Math.random() * cheerQuotes.length)];
    setSpeechBubble(randomQuote);
    setTimeout(() => {
      setSpeechBubble(null);
    }, 3500);
  };

  const isFocus = mode === 'focus';

  return (
    <div className="relative flex flex-col items-center justify-center my-2 select-none">
      {/* 말풍선 (클릭 시 혹은 주기적 응원) */}
      {speechBubble && (
        <div 
          data-testid="speech-bubble"
          className="absolute -top-14 z-20 animate-bounce px-3.5 py-1.5 bg-white text-slate-900 rounded-2xl shadow-xl text-xs sm:text-sm font-semibold border-2 border-pink-400 whitespace-nowrap"
        >
          {speechBubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r-2 border-b-2 border-pink-400"></div>
        </div>
      )}

      {/* 마스코트 본체 (클릭 가능) */}
      <div 
        onClick={handleMascotClick}
        title="코다리 부장의 마스코트를 클릭해 응원을 받아보세요!"
        className={`cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 ${
          isRunning ? 'animate-bounce-gentle' : 'animate-float'
        }`}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 캐릭터 그림자 */}
          <ellipse cx="60" cy="112" rx="38" ry="6" fill="#000000" fillOpacity="0.25" />

          {/* 꼭지(잎사귀) */}
          <path
            d="M60 22 C60 12 55 6 48 4 C50 14 55 19 60 22 Z"
            fill="#10b981"
          />
          <path
            d="M60 22 C68 14 74 12 78 14 C73 19 68 21 60 22 Z"
            fill="#059669"
          />
          <path
            d="M60 22 C52 20 44 24 38 28 C45 28 53 26 60 22 Z"
            fill="#34d399"
          />
          <path
            d="M60 22 C66 23 75 28 82 30 C76 26 68 23 60 22 Z"
            fill="#10b981"
          />

          {/* 몸체 (토마토 / 말차 멜론 느낌) */}
          <circle
            cx="60"
            cy="66"
            r="44"
            fill={isFocus ? "url(#focusGrad)" : "url(#breakGrad)"}
            className="transition-colors duration-500"
          />

          {/* 하이라이트 광택 */}
          <ellipse cx="44" cy="46" rx="9" ry="5" transform="rotate(-30 44 46)" fill="#ffffff" fillOpacity="0.4" />
          <circle cx="36" cy="54" r="2.5" fill="#ffffff" fillOpacity="0.3" />

          {/* 뺨 홍조 (러블리 핫핑크 볼터치) */}
          <ellipse cx="34" cy="74" rx="7" ry="4" fill="#ff2d87" fillOpacity="0.75" />
          <ellipse cx="86" cy="74" rx="7" ry="4" fill="#ff2d87" fillOpacity="0.75" />

          {/* 눈 & 표정 (상태별) */}
          {isFocus ? (
            // 집중 모드 눈
            isRunning ? (
              // 열공 중! 반짝이는 불꽃 눈빛
              <g>
                {/* 왼쪽 눈: 반짝반짝 */}
                <circle cx="45" cy="62" r="5" fill="#1e1b4b" />
                <circle cx="43" cy="60" r="1.8" fill="#ffffff" />
                {/* 오른쪽 눈: 반짝반짝 */}
                <circle cx="75" cy="62" r="5" fill="#1e1b4b" />
                <circle cx="73" cy="60" r="1.8" fill="#ffffff" />
                {/* 열정의 앙다문 입 */}
                <path d="M55 72 Q60 76 65 72" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
                {/* 핫핑크 열정 이마 띠 */}
                <rect x="25" y="44" width="70" height="7" rx="3.5" fill="#ff1493" fillOpacity="0.95" />
                <circle cx="60" cy="47.5" r="2.5" fill="#ffffff" />
              </g>
            ) : (
              // 일시정지 / 대기 중: 똘망똘망 기다리는 눈
              <g>
                <circle cx="45" cy="62" r="5.5" fill="#1e1b4b" />
                <circle cx="43" cy="60" r="2" fill="#ffffff" />
                <circle cx="75" cy="62" r="5.5" fill="#1e1b4b" />
                <circle cx="73" cy="60" r="2" fill="#ffffff" />
                <path d="M54 71 Q60 75 66 71" stroke="#1e1b4b" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            )
          ) : (
            // 휴식 모드: 편안하고 나른한 힐링 눈 (∩ ∩)
            <g>
              <path d="M40 64 Q45 57 50 64" stroke="#064e3b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M70 64 Q75 57 80 64" stroke="#064e3b" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* 행복한 미소 입 */}
              <path d="M54 70 Q60 77 66 70" stroke="#064e3b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* 귀여운 찻잔 / 커피 한잔 아이콘 */}
              <g transform="translate(82, 70) scale(0.65)">
                <rect x="0" y="5" width="16" height="14" rx="3" fill="#ffffff" />
                <path d="M16 8 C20 8 20 14 16 14" stroke="#ffffff" strokeWidth="2" fill="none" />
                {/* 모락모락 김 */}
                <path d="M4 2 Q7 0 5 -4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M11 2 Q14 0 12 -4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </g>
            </g>
          )}

          {/* 그라데이션 정의 */}
          <defs>
            <radialGradient id="focusGrad" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#ff70ba" />
              <stop offset="50%" stopColor="#ff1493" />
              <stop offset="100%" stopColor="#c70068" />
            </radialGradient>
            <radialGradient id="breakGrad" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="70%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* 마스코트 안내 캡션 */}
      <span className="text-[11px] text-slate-400 mt-1 font-gaegu text-sm tracking-wide">
        {isFocus ? (isRunning ? "대표님 핫핑크 몰입 중! 파이팅 💖" : "핫핑크 포모가 기다리고 있어요 🍅✨") : "지금은 꿀맛 같은 휴식 시간 ☕✨"}
      </span>
    </div>
  );
}
