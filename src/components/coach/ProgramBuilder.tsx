import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassInput } from '../common/GlassInput';
import { GlassBadge } from '../common/GlassBadge';
import { ModalSheet } from '../common/ModalSheet';
import { SegmentedControl } from '../common/SegmentedControl';
import { api } from '../../services/api';
import { Movement, ProgramMovement } from '../../types';
import { Dumbbell, Plus, Trash2, ArrowRight, Save, Play, CheckCircle2, Video, Loader2, AlertCircle } from 'lucide-react';

interface ProgramBuilderProps {
  onBack: () => void;
  onSave?: (program: any) => void;
}

export const ProgramBuilder: React.FC<ProgramBuilderProps> = ({ onBack }) => {
  const [title, setTitle] = useState('دوره تخصصی هایپرتروفی و حجم عضلانی');
  const [description, setDescription] = useState('طراحی شده بر اساس ترکیب متدهای بدنسازی مدرن و حرکات قدرتی کالیستنیکس');
  const [activeDayIndex, setActiveDayIndex] = useState(1);
  const [isExercisePickerOpen, setIsExercisePickerOpen] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [availableMovements, setAvailableMovements] = useState<Movement[]>([]);
  const [programDays, setProgramDays] = useState<
    Array<{
      dayIndex: number;
      title: string;
      movements: ProgramMovement[];
    }>
  >([
    { dayIndex: 1, title: 'روز ۱: عضلات سینه و بازو', movements: [] },
    { dayIndex: 2, title: 'روز ۲: زیربغل و پا', movements: [] },
  ]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [movementsData, existingProg] = await Promise.allSettled([
        api.getMovements(),
        api.getProgram(1),
      ]);

      if (movementsData.status === 'fulfilled') {
        setAvailableMovements(movementsData.value);
      }

      if (existingProg.status === 'fulfilled' && existingProg.value) {
        const prog = existingProg.value;
        setTitle(prog.title || 'دوره تخصصی هایپرتروفی و حجم عضلانی');
        if (prog.description) setDescription(prog.description);
        if (prog.days && prog.days.length > 0) {
          setProgramDays(
            prog.days.map((d) => ({
              dayIndex: d.dayOfWeek ?? d.dayIndex ?? 1,
              title: d.title || `روز ${d.dayOfWeek ?? d.dayIndex ?? 1}`,
              movements: d.movements.map((m: any, idx: number) => ({
                id: m.id || Date.now() + idx,
                movementId: m.movementId || m.id,
                movement: m.movement,
                sortOrder: idx + 1,
                sets: m.sets || 4,
                reps: m.reps || 10,
                restSeconds: m.restSeconds || 90,
                tempo: m.tempo || '2-0-1-0',
                coachNote: m.coachNote || '',
              })),
            }))
          );
        }
      }
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری اطلاعات اولیه از سرور');
    } finally {
      setLoading(false);
    }
  };

  const activeDay = programDays.find((d) => d.dayIndex === activeDayIndex) || programDays[0] || {
    dayIndex: 1,
    title: 'روز ۱',
    movements: [],
  };

  const muscleFilters = [
    { id: 'all', label: 'همه عضلات' },
    { id: 'chest', label: 'سینه' },
    { id: 'back', label: 'زیربغل' },
    { id: 'legs', label: 'پا' },
    { id: 'shoulders', label: 'سرشانه' },
    { id: 'arms', label: 'بازو' },
  ];

  const filteredMovements = availableMovements.filter((m) =>
    selectedMuscle === 'all' ? true : m.muscleGroup?.includes(selectedMuscle)
  );

  const handleAddMovementToDay = (movement: Movement) => {
    const newProgMovement: ProgramMovement = {
      id: Date.now(),
      movementId: movement.id,
      movement,
      sortOrder: (activeDay.movements.length || 0) + 1,
      sets: 4,
      reps: '10',
      restSeconds: 90,
      tempo: '2-0-1-0',
      coachNote: 'دامنه حرکتی کامل و اضافه بار تدریجی',
    };

    setProgramDays((prev) =>
      prev.map((d) =>
        d.dayIndex === activeDayIndex
          ? { ...d, movements: [...d.movements, newProgMovement] }
          : d
      )
    );
    setIsExercisePickerOpen(false);
  };

  const handleRemoveMovement = (movementId: number) => {
    setProgramDays((prev) =>
      prev.map((d) =>
        d.dayIndex === activeDayIndex
          ? { ...d, movements: d.movements.filter((m) => m.id !== movementId) }
          : d
      )
    );
  };

  const handleSaveProgram = async () => {
    setSaving(true);
    setError(null);
    try {
      await api.createProgram({
        coachId: 1,
        title,
        description,
        days: programDays.map((d) => ({
          dayOfWeek: d.dayIndex,
          movements: d.movements.map((m) => ({
            movementId: m.movementId,
            title: m.movement?.title || 'حرکت ورزشی',
            sets: Number(m.sets) || 3,
            reps: m.reps,
            restSeconds: Number(m.restSeconds) || 60,
            tempo: m.tempo || '2-0-1-0',
            coachNote: m.coachNote || '',
          })),
        })),
      });

      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onBack();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'خطا در ذخیره‌سازی برنامه در دیتابیس سرور');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5 pb-24 text-right">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <GlassButton variant="ghost" size="sm" onClick={onBack} icon={<ArrowRight className="w-4 h-4" />}>
          بازگشت به داشبورد
        </GlassButton>
        <div className="flex items-center gap-2">
          <GlassButton
            variant="primary"
            size="md"
            onClick={handleSaveProgram}
            disabled={saving || loading}
            icon={
              saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : savedSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-white" />
              ) : (
                <Save className="w-4 h-4" />
              )
            }
          >
            {saving ? 'در حال ثبت در سرور...' : savedSuccess ? 'در سرور ذخیره شد' : 'ذخیره در سرور دیتابیس'}
          </GlassButton>
        </div>
      </div>

      {error && (
        <GlassCard className="p-4 border-red-200 bg-red-50/50 flex items-center gap-3 text-red-600 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </GlassCard>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-2 text-slate-500 text-sm">
          <Loader2 className="w-6 h-6 animate-spin text-[#0066FF]" />
          در حال دریافت اطلاعات برنامه از سرور .NET...
        </div>
      ) : (
        <>
          {/* Program Info Card */}
          <GlassCard className="p-4 md:p-5" variant="highlight">
            <div className="space-y-3">
              <GlassInput
                label="عنوان دوره تمرینی (ذخیره روی PostgreSQL)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: دوره افزایش حجم و تفکیک عضلانی"
                className="text-base font-bold text-slate-900"
              />
              <GlassInput
                label="توضیحات و اهداف دوره"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیحات دوره برای شاگرد..."
              />
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-1">
                <span>
                  تعداد روزهای تمرینی:{' '}
                  <strong className="text-slate-900">{programDays.length} روز</strong>
                </span>
                <span>
                  وضعیت اتصال:{' '}
                  <strong className="text-emerald-600 font-bold">متصل به بک‌اند زنده (Port 5062)</strong>
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Days Tabs (Segmented Control) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">انتخاب روز تمرینی:</span>
            <SegmentedControl
              value={activeDayIndex}
              onChange={(val) => setActiveDayIndex(Number(val))}
              options={programDays.map((d) => ({
                value: d.dayIndex,
                label: `روز ${d.dayIndex}`,
                badge: d.movements.length,
              }))}
            />
          </div>

          {/* Current Day Details & Movements List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{activeDay.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeDay.movements.length} حرکت ورزشی برای این روز در دیتابیس ثبت شده
                </p>
              </div>
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => setIsExercisePickerOpen(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                افزودن حرکت
              </GlassButton>
            </div>

            {/* Movements Roster */}
            {activeDay.movements.length === 0 ? (
              <GlassCard className="p-8 text-center border-dashed border-slate-300">
                <Dumbbell className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-bold text-slate-700">هنوز حرکتی برای این روز انتخاب نشده است</p>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  از بانک حرکات واقعی سرور، حرکات مورد نظرتان را اضافه کنید
                </p>
                <GlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => setIsExercisePickerOpen(true)}
                  icon={<Plus className="w-4 h-4" />}
                >
                  انتخاب حرکت از دیتابیس
                </GlassButton>
              </GlassCard>
            ) : (
              <div className="space-y-3">
                {activeDay.movements.map((pm, idx) => (
                  <GlassCard key={pm.id} className="p-4 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] border border-blue-200 flex items-center justify-center font-bold font-mono text-sm">
                          {idx + 1}
                        </div>
                        {pm.movement?.thumbnailUrl ? (
                          <img
                            src={pm.movement.thumbnailUrl}
                            alt={pm.movement.title}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#0066FF] border border-blue-100">
                            <Dumbbell className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{pm.movement?.title}</h4>
                          {pm.movement?.titleEn && (
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{pm.movement.titleEn}</p>
                          )}
                        </div>
                      </div>

                      {/* Actions & Delete */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleRemoveMovement(pm.id)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200"
                          title="حذف از روز"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Workout Execution Parameters Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-right">
                        <span className="text-[10px] text-slate-400 block">ست‌ها:</span>
                        <span className="font-bold text-slate-800 font-mono">{pm.sets} ست</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-right">
                        <span className="text-[10px] text-slate-400 block">تکرارها:</span>
                        <span className="font-bold text-slate-800 font-mono">{pm.reps}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-right">
                        <span className="text-[10px] text-slate-400 block">استراحت:</span>
                        <span className="font-bold text-[#0066FF] font-mono">{pm.restSeconds} ثانیه</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-right">
                        <span className="text-[10px] text-slate-400 block">تمپو:</span>
                        <span className="font-bold text-sky-600 font-mono">{pm.tempo || '2-0-1-0'}</span>
                      </div>
                    </div>

                    {pm.coachNote && (
                      <div className="mt-2 text-[11px] text-blue-900 bg-blue-50/80 p-2 rounded-xl border border-blue-200">
                        💡 <strong>توصیه مربی:</strong> {pm.coachNote}
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Movement Picker Modal Sheet */}
      <ModalSheet
        isOpen={isExercisePickerOpen}
        onClose={() => setIsExercisePickerOpen(false)}
        title="انتخاب حرکت از بانک دیتابیس جیبی‌جیم"
      >
        <div className="space-y-4 text-right">
          {/* Muscle Category Filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {muscleFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedMuscle(f.id)}
                className={`text-xs px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
                  selectedMuscle === f.id
                    ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] font-bold shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-black'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* List of Movements */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {filteredMovements.map((movement) => (
              <div
                key={movement.id}
                onClick={() => handleAddMovementToDay(movement)}
                className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#0066FF] hover:bg-blue-50/30 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF]">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{movement.title}</h5>
                    <p className="text-xs text-slate-400 font-mono">{movement.titleEn}</p>
                  </div>
                </div>
                <GlassButton size="sm" variant="secondary">
                  افزودن
                </GlassButton>
              </div>
            ))}
          </div>
        </div>
      </ModalSheet>
    </div>
  );
};
