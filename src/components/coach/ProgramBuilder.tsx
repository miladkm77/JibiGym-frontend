import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassInput } from '../common/GlassInput';
import { GlassBadge } from '../common/GlassBadge';
import { ModalSheet } from '../common/ModalSheet';
import { SegmentedControl } from '../common/SegmentedControl';
import { MOCK_MOVEMENTS, MOCK_PROGRAMS } from '../../data/mockData';
import { Movement, ProgramMovement } from '../../types';
import { Dumbbell, Plus, Trash2, ArrowRight, Save, Play, CheckCircle2, Video } from 'lucide-react';

interface ProgramBuilderProps {
  onBack: () => void;
  onSave?: (program: any) => void;
}

export const ProgramBuilder: React.FC<ProgramBuilderProps> = ({ onBack }) => {
  const [title, setTitle] = useState('دوره تخصصی حجم و قدرت (۴ روزه)');
  const [activeDayIndex, setActiveDayIndex] = useState(1);
  const [isExercisePickerOpen, setIsExercisePickerOpen] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string>('همه');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Preloaded Program movements
  const [programDays, setProgramDays] = useState(MOCK_PROGRAMS[0].days);

  const activeDay = programDays.find((d) => d.dayIndex === activeDayIndex) || programDays[0];

  const muscleGroups = ['همه', 'سینه (پکتورالیس)', 'چهارسر ران و باسن', 'زیربغل، کول، پشت‌بازو', 'کل بدن (Full Body)', 'دلتوئید قدامی، عضلات مرکزی کور'];

  const filteredMovements = selectedMuscle === 'همه'
    ? MOCK_MOVEMENTS
    : MOCK_MOVEMENTS.filter((m) => m.muscleGroup.includes(selectedMuscle));

  const handleAddMovementToDay = (movement: Movement) => {
    const newProgMovement: ProgramMovement = {
      id: Date.now(),
      movementId: movement.id,
      movement,
      sortOrder: (activeDay.movements.length || 0) + 1,
      sets: 4,
      reps: '10-8-6-4',
      restSeconds: 90,
      tempo: '2-0-1',
      coachNote: 'دامنه حرکتی کامل و اضافه بار تدریجی'
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

  const handleSaveProgram = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onBack();
    }, 1500);
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
            icon={savedSuccess ? <CheckCircle2 className="w-4 h-4 text-black" /> : <Save className="w-4 h-4" />}
          >
            {savedSuccess ? 'برنامه ذخیره شد' : 'ذخیره و ثبت نهایی'}
          </GlassButton>
        </div>
      </div>

      {/* Program Info Card */}
      <GlassCard className="p-4 md:p-5" variant="highlight">
        <div className="space-y-3">
          <GlassInput
            label="عنوان دوره تمرینی"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: دوره افزایش حجم و تفکیک عضلانی"
            className="text-base font-bold"
          />
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-300 pt-1">
            <span>تعداد جلسات در هفته: <strong className="text-white">۴ جلسه</strong></span>
            <span>مدت دوره: <strong className="text-emerald-400 font-mono">۴ هفته</strong></span>
            <span>نوع برنامه: <strong className="text-cyan-400">هایپرتروفی و قدرت</strong></span>
          </div>
        </div>
      </GlassCard>

      {/* Days Tabs (Segmented Control) */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-300 block">انتخاب روز تمرینی:</span>
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
            <h3 className="text-base font-bold text-white">{activeDay.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeDay.movements.length} حرکت ورزشی برای این روز تنظیم شده است
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
          <GlassCard className="p-8 text-center border-dashed border-white/20">
            <Dumbbell className="w-10 h-10 mx-auto text-slate-500 mb-2" />
            <p className="text-sm font-medium text-slate-300">هنوز حرکتی برای این روز انتخاب نشده است</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">از کتابخانه حرکات جیبی‌جیم حرکات مورد نظرتان را اضافه کنید</p>
            <GlassButton
              variant="primary"
              size="sm"
              onClick={() => setIsExercisePickerOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              انتخاب حرکت از کتابخانه
            </GlassButton>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {activeDay.movements.map((pm, idx) => (
              <GlassCard key={pm.id} className="p-4 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold font-mono text-emerald-400 text-sm">
                      {idx + 1}
                    </div>
                    {pm.movement.thumbnailUrl ? (
                      <img
                        src={pm.movement.thumbnailUrl}
                        alt={pm.movement.title}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/10">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-white">{pm.movement.title}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{pm.movement.titleEn}</p>
                      <GlassBadge variant="cyan" size="sm" className="mt-1">
                        {pm.movement.muscleGroup}
                      </GlassBadge>
                    </div>
                  </div>

                  {/* Actions & Delete */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleRemoveMovement(pm.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="حذف از روز"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Workout Execution Parameters Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/10 text-xs">
                  <div className="p-2 rounded-xl bg-white/5 text-right">
                    <span className="text-[10px] text-slate-400 block">ست‌ها:</span>
                    <span className="font-bold text-white font-mono">{pm.sets} ست</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 text-right">
                    <span className="text-[10px] text-slate-400 block">تکرارها:</span>
                    <span className="font-bold text-white font-mono">{pm.reps}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 text-right">
                    <span className="text-[10px] text-slate-400 block">استراحت:</span>
                    <span className="font-bold text-emerald-400 font-mono">{pm.restSeconds} ثانیه</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 text-right">
                    <span className="text-[10px] text-slate-400 block">تمپو اجرای تکرار:</span>
                    <span className="font-bold text-cyan-400 font-mono">{pm.tempo || '2-0-1'}</span>
                  </div>
                </div>

                {pm.coachNote && (
                  <div className="mt-2 text-[11px] text-slate-300 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                    💡 <strong>توصیه مربی:</strong> {pm.coachNote}
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Movement Picker Modal Sheet */}
      <ModalSheet
        isOpen={isExercisePickerOpen}
        onClose={() => setIsExercisePickerOpen(false)}
        title="کتابخانه حرکات و تمرینات جیبی‌جیم"
      >
        <div className="space-y-4 text-right">
          {/* Muscle Category Filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {muscleGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedMuscle(group)}
                className={`text-xs px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
                  selectedMuscle === group
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          {/* Exercise list */}
          <div className="space-y-2.5 max-h-96 overflow-y-auto">
            {filteredMovements.map((movement) => (
              <div
                key={movement.id}
                onClick={() => handleAddMovementToDay(movement)}
                className="p-3 rounded-2xl liquid-glass hover:border-emerald-400/50 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                    {movement.thumbnailUrl ? (
                      <img
                        src={movement.thumbnailUrl}
                        alt={movement.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Video className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{movement.title}</h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{movement.titleEn}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-emerald-400">{movement.muscleGroup}</span>
                      {movement.equipment && (
                        <span className="text-[10px] text-slate-500">• {movement.equipment}</span>
                      )}
                    </div>
                  </div>
                </div>

                <GlassButton variant="glass" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                  انتخاب
                </GlassButton>
              </div>
            ))}
          </div>
        </div>
      </ModalSheet>
    </div>
  );
};
