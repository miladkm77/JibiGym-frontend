import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { api } from '../../services/api';
import { Program, ProgramDay, ProgramMovement } from '../../types';
import { Check, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Trophy, Clock, Video, Volume2, Sparkles, Loader2 } from 'lucide-react';

interface WorkoutPlayerProps {
  onFinish: () => void;
  onExit: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ onFinish, onExit }) => {
  const [loading, setLoading] = useState(true);
  const [programDay, setProgramDay] = useState<ProgramDay | null>(null);
  const [currentMovementIndex, setCurrentMovementIndex] = useState(0);

  // Completed sets tracker: mapping movementId -> array of booleans
  const [completedSets, setCompletedSets] = useState<{ [key: number]: boolean[] }>({});

  // Rest Timer State
  const [restTimer, setRestTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isFinishedSheetOpen, setIsFinishedSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    loadWorkout();
  }, []);

  const loadWorkout = async () => {
    setLoading(true);
    try {
      const plans = await api.getAthletePlans(2);
      if (plans.length > 0 && plans[0].program?.days?.length > 0) {
        const day = plans[0].program.days[0];
        setProgramDay(day);
      } else {
        const prog = await api.getProgram(1);
        if (prog?.days?.length > 0) {
          setProgramDay(prog.days[0]);
        }
      }
    } catch {
      // Fallback program if empty
      const prog = await api.getProgram(1);
      if (prog?.days?.length > 0) {
        setProgramDay(prog.days[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const currentMovement = programDay?.movements?.[currentMovementIndex];

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
    if (!currentMovement) return;
    const currentList =
      completedSets[currentMovement.movementId] || new Array(currentMovement.sets).fill(false);
    const updated = [...currentList];
    const nextState = !updated[setIndex];
    updated[setIndex] = nextState;

    setCompletedSets({
      ...completedSets,
      [currentMovement.movementId]: updated,
    });

    if (nextState) {
      setRestTimer(currentMovement.restSeconds || 90);
      setIsTimerRunning(true);
    }
  };

  const handleNextMovement = () => {
    if (!programDay) return;
    if (currentMovementIndex < programDay.movements.length - 1) {
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

  if (loading || !currentMovement || !programDay) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#0066FF]" />
        <p className="text-sm">در حال بارگذاری جلسه تمرینی از دیتابیس...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-28 text-right">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <GlassButton variant="ghost" size="sm" onClick={onExit} icon={<ArrowRight className="w-4 h-4" />}>
          خروج از تمرین
        </GlassButton>
        <div className="flex items-center gap-2">
          <GlassBadge variant="blue" size="sm">
            حرکت {currentMovementIndex + 1} از {programDay.movements.length}
          </GlassBadge>
        </div>
      </div>

      {/* Movement Video & Info Card */}
      <GlassCard className="p-0 overflow-hidden" variant="highlight">
        {/* Video / Visual container */}
        <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
          {currentMovement.movement?.thumbnailUrl ? (
            <img
              src={currentMovement.movement.thumbnailUrl}
              alt={currentMovement.movement.title}
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <div className="text-slate-400 flex flex-col items-center">
              <Video className="w-12 h-12 mb-2" />
              <span className="text-xs">پخش مدل سه‌بعدی و انیمیشن اجرای حرکت</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Floating tags on video */}
          <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs">
            <span className="text-white font-bold bg-black/60 px-3 py-1 rounded-xl backdrop-blur-md border border-white/20">
              {currentMovement.movement?.muscleGroup}
            </span>
            <span className="text-sky-300 font-mono bg-black/60 px-2.5 py-1 rounded-xl backdrop-blur-md border border-white/20">
              تمپو: {currentMovement.tempo || '2-0-1-0'}
            </span>
          </div>
        </div>

        {/* Movement details */}
        <div className="p-4 space-y-2">
          <h2 className="text-lg font-black text-slate-900">{currentMovement.movement?.title}</h2>
          <p className="text-xs font-mono text-slate-500">{currentMovement.movement?.titleEn}</p>
          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            {currentMovement.movement?.description}
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
            const isDone = completedSets[currentMovement.movementId]?.[idx] || false;
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
                  <span className="text-xs font-bold font-mono">ست {idx + 1}</span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>تکرار هدف: <strong>{currentMovement.reps}</strong></span>
                  <span className="text-[#0066FF] font-bold">
                    {isDone ? 'انجام شد ✓' : 'در انتظار'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Floating Rest Timer bar if active */}
      {restTimer > 0 && (
        <div className="fixed bottom-20 left-4 right-4 max-w-lg mx-auto z-40 animate-in slide-in-from-bottom">
          <GlassCard className="p-3.5 bg-blue-600 text-white shadow-xl shadow-blue-500/30 flex items-center justify-between border-blue-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-blue-100 block">زمان استراحت بین ست‌ها</span>
                <span className="text-lg font-black font-mono tracking-wider">{restTimer} ثانیه</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <button
                onClick={() => {
                  setRestTimer(0);
                  setIsTimerRunning(false);
                }}
                className="text-xs bg-white text-[#0066FF] font-bold px-3 py-1.5 rounded-xl shadow-sm"
              >
                رد کردن
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Navigation Buttons: Previous / Next movement */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-200/80 z-30">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          {currentMovementIndex > 0 && (
            <GlassButton
              variant="secondary"
              size="lg"
              className="flex-1 justify-center"
              onClick={handlePrevMovement}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              حرکت قبلی
            </GlassButton>
          )}

          <GlassButton
            variant="primary"
            size="lg"
            className="flex-1 justify-center shadow-lg shadow-blue-500/25"
            onClick={handleNextMovement}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            {currentMovementIndex < programDay.movements.length - 1 ? 'حرکت بعدی' : 'اتمام تمرین امروز'}
          </GlassButton>
        </div>
      </div>

      {/* Workout Finished Celebration Modal */}
      {isFinishedSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <GlassCard className="p-6 max-w-sm w-full text-center space-y-4 animate-in zoom-in-95" variant="highlight">
            <div className="w-16 h-16 rounded-3xl bg-blue-100 text-[#0066FF] flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">تمرین امروز به پایان رسید! 🎉</h3>
              <p className="text-xs text-slate-600 mt-1">
                عالی بود! تمام حرکات جلسه با موفقیت ثبت شد و در تاریخچه تمرینی ذخیره گردید.
              </p>
            </div>

            <GlassButton
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-lg shadow-blue-500/25"
              onClick={onFinish}
            >
              ثبت و بازگشت به خانه
            </GlassButton>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
