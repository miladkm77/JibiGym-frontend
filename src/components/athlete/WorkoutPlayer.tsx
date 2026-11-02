import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { MOCK_PROGRAMS } from '../../data/mockData';
import { Check, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Trophy, Clock, Video, Volume2, Sparkles } from 'lucide-react';

interface WorkoutPlayerProps {
  onFinish: () => void;
  onExit: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ onFinish, onExit }) => {
  const currentDay = MOCK_PROGRAMS[0].days[0];
  const [currentMovementIndex, setCurrentMovementIndex] = useState(0);
  const currentMovement = currentDay.movements[currentMovementIndex];

  // Completed sets tracker: mapping movementId -> array of booleans
  const [completedSets, setCompletedSets] = useState<{ [key: number]: boolean[] }>({
    [currentMovement.id]: new Array(currentMovement.sets).fill(false),
  });

  // Rest Timer State
  const [restTimer, setRestTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isFinishedSheetOpen, setIsFinishedSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((t) => {
          if (t <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, restTimer]);

  const toggleSetComplete = (setIndex: number) => {
    const currentList = completedSets[currentMovement.id] || new Array(currentMovement.sets).fill(false);
    const updated = [...currentList];
    const nextState = !updated[setIndex];
    updated[setIndex] = nextState;

    setCompletedSets({
      ...completedSets,
      [currentMovement.id]: updated,
    });

    // If set was marked as done, start the rest timer!
    if (nextState) {
      setRestTimer(currentMovement.restSeconds || 90);
      setIsTimerRunning(true);
    }
  };

  const handleNextMovement = () => {
    if (currentMovementIndex < currentDay.movements.length - 1) {
      setCurrentMovementIndex(currentMovementIndex + 1);
    } else {
      setIsFinishedSheetOpen(true);
    }
  };

  const handlePrevMovement = () => {
    if (currentMovementIndex > 0) {
      setCurrentMovementIndex(currentMovementIndex - 1);
    }
  };

  return (
    <div className="space-y-4 pb-28 text-right">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <GlassButton variant="ghost" size="sm" onClick={onExit} icon={<ArrowRight className="w-4 h-4" />}>
          خروج از تمرین
        </GlassButton>
        <div className="flex items-center gap-2">
          <GlassBadge variant="blue" size="sm">
            حرکت {currentMovementIndex + 1} از {currentDay.movements.length}
          </GlassBadge>
        </div>
      </div>

      {/* Movement Video & Info Card */}
      <GlassCard className="p-0 overflow-hidden" variant="highlight">
        {/* Video / Visual container */}
        <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
          {currentMovement.movement.thumbnailUrl ? (
            <img
              src={currentMovement.movement.thumbnailUrl}
              alt={currentMovement.movement.title}
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <div className="text-slate-400 flex flex-col items-center">
              <Video className="w-12 h-12 mb-2" />
              <span className="text-xs">ویدیو برای این حرکت ثبت نشده است</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Floating tags on video */}
          <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs">
            <span className="text-white font-bold bg-black/60 px-3 py-1 rounded-xl backdrop-blur-md border border-white/20">
              {currentMovement.movement.muscleGroup}
            </span>
            <span className="text-sky-300 font-mono bg-black/60 px-2.5 py-1 rounded-xl backdrop-blur-md border border-white/20">
              تمپو: {currentMovement.tempo || '2-0-1'}
            </span>
          </div>
        </div>

        {/* Movement details */}
        <div className="p-4 space-y-2">
          <h2 className="text-lg font-black text-slate-900">{currentMovement.movement.title}</h2>
          <p className="text-xs font-mono text-slate-500">{currentMovement.movement.titleEn}</p>
          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            {currentMovement.movement.description}
          </p>

          {currentMovement.coachNote && (
            <div className="mt-2 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800">
              💡 <strong>یادداشت مربی:</strong> {currentMovement.coachNote}
            </div>
          )}
        </div>
      </GlassCard>

      {/* Sets & Reps Execution Table */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-900">ثبت ست‌های انجام‌شده</h3>
          <span className="text-[11px] text-slate-500">روی هر ست کلیک کنید تا تیک بخورد</span>
        </div>

        <div className="space-y-2">
          {Array.from({ length: currentMovement.sets }).map((_, idx) => {
            const isDone = completedSets[currentMovement.id]?.[idx] || false;
            return (
              <div
                key={idx}
                onClick={() => toggleSetComplete(idx)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isDone
                    ? 'bg-blue-50 border-blue-400 text-slate-900 shadow-sm'
                    : 'bg-white border-slate-200/90 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isDone ? 'bg-[#0066FF] text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900">ست {idx + 1}</span>
                    <span className="text-[11px] text-slate-500 mr-2 font-mono">
                      (هدف: {currentMovement.reps} تکرار)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold font-mono ${isDone ? 'text-[#0066FF]' : 'text-slate-400'}`}>
                    {isDone ? 'تکمیل شد ✓' : 'ثبت انجام'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <GlassButton
          variant="glass"
          fullWidth
          onClick={handlePrevMovement}
          disabled={currentMovementIndex === 0}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          حرکت قبلی
        </GlassButton>
        <GlassButton
          variant="primary"
          fullWidth
          onClick={handleNextMovement}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          {currentMovementIndex < currentDay.movements.length - 1 ? 'حرکت بعدی' : 'پایان تمرین'}
        </GlassButton>
      </div>

      {/* FLOATING REST TIMER (White & Athletic Blue Edition) */}
      {restTimer > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-sm mx-auto bg-white/95 backdrop-blur-2xl border border-blue-400/80 rounded-3xl p-3 shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom">
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0066FF] border border-blue-200 flex items-center justify-center font-mono font-black text-base animate-pulse">
              {restTimer}s
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">استراحت بین ست‌ها</span>
              <span className="text-[10px] text-slate-500">تنفس عمیق و ریکاوری عضلانی</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRestTimer((t) => t + 30)}
              className="text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold"
            >
              +30s
            </button>
            <button
              onClick={() => {
                setRestTimer(0);
                setIsTimerRunning(false);
              }}
              className="text-[11px] px-2.5 py-1.5 rounded-xl bg-[#0066FF] text-white font-bold"
            >
              پایان
            </button>
          </div>
        </div>
      )}

      {/* Workout Completion Sheet */}
      {isFinishedSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <GlassCard className="p-6 max-w-sm w-full text-center space-y-4" variant="highlight">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0066FF] border border-blue-200 flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-8 h-8 text-[#0066FF]" />
            </div>

            <h3 className="text-xl font-black text-slate-900">خسته نباشی قهرمان! 💪</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              جلسه تمرینی امروز با موفقیت به پایان رسید. آمار این جلسه برای استادت ارسال و در پروفایل شما ثبت شد.
            </p>

            <div className="grid grid-cols-2 gap-2 text-right p-3 rounded-2xl bg-white border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">حرکات انجام‌شده:</span>
                <span className="font-bold text-slate-900 font-mono">{currentDay.movements.length} حرکت</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">امتیاز انگیزه:</span>
                <span className="font-bold text-[#0066FF] font-mono">+120 XP</span>
              </div>
            </div>

            <GlassButton variant="primary" fullWidth size="lg" onClick={onFinish}>
              ثبت نهایی و بازگشت به خانه
            </GlassButton>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
