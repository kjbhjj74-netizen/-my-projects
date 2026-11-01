import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import App, { FOCUS_TIME, BREAK_TIME } from './App';

// canvas-confetti mock
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Web Audio API mock
vi.mock('./utils/audio', () => ({
  playClickSound: vi.fn(),
  playSuccessChime: vi.fn(),
  playBreakEndChime: vi.fn(),
}));

describe('뽀모도로 타이머 핵심 로직 및 UI 검증 (Pomodoro Timer Tests)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('1. 초기 화면: 25:00 표시 및 집중 모드 뱃지가 렌더링되어야 합니다.', () => {
    render(<App />);

    // 대형 타이머가 25:00인지 확인
    const timerDisplay = screen.getByTestId('timer-display');
    expect(timerDisplay).toHaveTextContent('25:00');

    // 집중 모드 텍스트 확인
    expect(screen.getByText(/집중 모드/i)).toBeInTheDocument();
  });

  it('2. 시작/일시정지: 버튼 클릭 시 타이머가 카운트다운되고 다시 누르면 멈춥니다.', () => {
    render(<App />);

    const startButton = screen.getByRole('button', { name: /시작/i });
    expect(startButton).toBeInTheDocument();

    // 시작 클릭
    fireEvent.click(startButton);

    // 1초 경과
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const timerDisplay = screen.getByTestId('timer-display');
    expect(timerDisplay).toHaveTextContent('24:59');

    // 일시정지 버튼으로 변경되었는지 확인
    const pauseButton = screen.getByRole('button', { name: /일시정지/i });
    expect(pauseButton).toBeInTheDocument();

    // 일시정지 클릭
    fireEvent.click(pauseButton);

    // 3초가 더 지나도 시간이 줄어들지 않아야 함
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(timerDisplay).toHaveTextContent('24:59');
  });

  it('3. 초기화 (Reset): 카운트다운 도중 리셋 시 초기 25:00으로 복원됩니다.', () => {
    render(<App />);

    const startButton = screen.getByRole('button', { name: /시작/i });
    fireEvent.click(startButton);

    act(() => {
      vi.advanceTimersByTime(5000); // 5초 경과
    });

    expect(screen.getByTestId('timer-display')).toHaveTextContent('24:55');

    // 리셋 버튼 클릭
    const resetButton = screen.getByRole('button', { name: /타이머 초기화/i });
    fireEvent.click(resetButton);

    expect(screen.getByTestId('timer-display')).toHaveTextContent('25:00');
  });

  it('4. 모드 전환: 5분 휴식 모드로 전환 시 타이머가 05:00이 되고 휴식 뱃지가 뜹니다.', () => {
    render(<App />);

    // 5분 휴식 버튼 클릭
    const breakTab = screen.getByRole('button', { name: /휴식 \(5분\)/i });
    fireEvent.click(breakTab);

    // 타이머 디스플레이가 05:00으로 갱신
    expect(screen.getByTestId('timer-display')).toHaveTextContent('05:00');
    expect(screen.getByText(/달콤한 휴식/i)).toBeInTheDocument();
  });

  it('5. 세션 건너뛰기: 건너뛰기 버튼을 누르면 다음 모드(휴식)로 즉시 전환됩니다.', () => {
    render(<App />);

    const skipButton = screen.getByRole('button', { name: /다음 세션으로 건너뛰기/i });
    fireEvent.click(skipButton);

    expect(screen.getByTestId('timer-display')).toHaveTextContent('05:00');
    expect(screen.getByText(/달콤한 휴식/i)).toBeInTheDocument();
  });

  it('6. 집중 세션 25분 만료 시: 자동으로 카운트가 올라가고 휴식 모드로 전환됩니다.', () => {
    render(<App />);

    const startButton = screen.getByRole('button', { name: /시작/i });
    fireEvent.click(startButton);

    // 25분(1500초) 가상 시간 진행
    act(() => {
      vi.advanceTimersByTime(FOCUS_TIME * 1000);
    });

    // 05:00 휴식 모드로 전환 확인
    expect(screen.getByTestId('timer-display')).toHaveTextContent('05:00');
    expect(screen.getByText(/달콤한 휴식/i)).toBeInTheDocument();
  });

  it('7. 마스코트 인터랙션: 마스코트 영역 클릭 시 응원 메시지 팝업이 표시됩니다.', () => {
    render(<App />);

    const mascot = screen.getByTitle(/코다리 부장의 마스코트를 클릭/i);
    expect(mascot).toBeInTheDocument();

    // 초기에는 말풍선이 없어야 함
    expect(screen.queryByTestId('speech-bubble')).not.toBeInTheDocument();

    // 마스코트 클릭
    fireEvent.click(mascot);

    // 응원 말풍선 엘리먼트 출현 확인
    const speechBubble = screen.getByTestId('speech-bubble');
    expect(speechBubble).toBeInTheDocument();
    expect(speechBubble.textContent).toMatch(/대표님|코다리|스트레칭|몰입력|신화/);
  });

  it('8. 주간 몰입 통계: 월화수목금토일 7개 요일 라벨 및 주간 통계 컴포넌트가 렌더링되어야 합니다.', () => {
    render(<App />);

    // 주간 몰입 통계 헤더 확인
    expect(screen.getByText('주간 몰입 통계')).toBeInTheDocument();

    // 월, 화, 수, 목, 금, 토, 일 요일 라벨이 모두 있는지 확인
    ['월', '화', '수', '목', '금', '토', '일'].forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });

    // 주간 요약 통계 요소 확인
    expect(screen.getByText('총 몰입')).toBeInTheDocument();
    expect(screen.getByText('일일 평균')).toBeInTheDocument();
    expect(screen.getByText('최고 요일')).toBeInTheDocument();
  });

  it('9. 주간 통계 접기/펼치기: 토글 헤더 클릭 시 차트 내용이 토글됩니다.', () => {
    render(<App />);

    const chartHeader = screen.getByText('주간 몰입 통계');

    // 초기에는 요일들이 표시됨
    expect(screen.getByText('월')).toBeInTheDocument();

    // 헤더 클릭 -> 접기
    fireEvent.click(chartHeader);
    expect(screen.queryByText('월')).not.toBeInTheDocument();

    // 다시 클릭 -> 펼치기
    fireEvent.click(chartHeader);
    expect(screen.getByText('월')).toBeInTheDocument();
  });
});
