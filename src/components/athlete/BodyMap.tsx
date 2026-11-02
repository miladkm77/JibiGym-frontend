import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { ShieldAlert, Check, Plus, AlertCircle } from 'lucide-react';

interface InjuryItem {
  id: number;
  part: string;
  side: 'راست' | 'چپ' | 'هر دو';
  severity: 'کم' | 'متوسط' | 'شدید';
  note: string;
}

export const BodyMap: React.FC = () => {
  const [injuries, setInjuries] = useState<InjuryItem[]>([
    { id: 1, part: 'مچ دست', side: 'چپ', severity: 'کم', note: 'کمی درد در انتهای اکستنشن پرس سینه' },
    { id: 2, part: 'زانو (مینیسک)', side: 'راست', severity: 'متوسط', note: 'احتیاط در اسکات عمیق زیر ۹۰ درجه' },
  ]);

  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const bodyPartsFront = [
    { id: 'neck', name: 'گردن', x: 50, y: 15 },
    { id: 'shoulder_r', name: 'سرشانه راست', x: 30, y: 22 },
    { id: 'shoulder_l', name: 'سرشانه چپ', x: 70, y: 22 },
    { id: 'chest', name: 'سینه', x: 50, y: 28 },
    { id: 'elbow_r', name: 'آرنج راست', x: 22, y: 36 },
    { id: 'elbow_l', name: 'آرنج چپ', x: 78, y: 36 },
    { id: 'core', name: 'عضلات شکم و کور', x: 50, y: 40 },
    { id: 'wrist_r', name: 'مچ دست راست', x: 18, y: 48 },
    { id: 'wrist_l', name: 'مچ دست چپ', x: 82, y: 48 },
    { id: 'quad_r', name: 'چهارسر ران راست', x: 40, y: 62 },
    { id: 'quad_l', name: 'چهارسر ران چپ', x: 60, y: 62 },
    { id: 'knee_r', name: 'زانو راست', x: 40, y: 74 },
    { id: 'knee_l', name: 'زانو چپ', x: 60, y: 74 },
    { id: 'ankle_r', name: 'مچ پا راست', x: 42, y: 92 },
    { id: 'ankle_l', name: 'مچ پا چپ', x: 58, y: 92 },
  ];

  return (
    <div className="space-y-4 text-right">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            نقشه تعاملی آسیب‌دیدگی‌های بدن (Body Map)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            مربی هنگام نوشتن برنامه این نواحی را می‌بیند تا حرکات آسیب‌رسان را جایگزین کند.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Interactive Visual Anatomy Canvas */}
        <GlassCard className="p-4 flex flex-col items-center justify-center relative min-h-[340px]">
          {/* Front / Back Toggle */}
          <div className="absolute top-3 right-3 flex gap-1 bg-black/50 p-1 rounded-xl border border-white/10 z-10 text-xs">
            <button
              onClick={() => setActiveSide('front')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeSide === 'front' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400'
              }`}
            >
              نمای جلو
            </button>
            <button
              onClick={() => setActiveSide('back')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeSide === 'back' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400'
              }`}
            >
              نمای پشت
            </button>
          </div>

          {/* Stylized Futuristic Body Wireframe */}
          <div className="relative w-48 h-72 border border-white/10 rounded-3xl bg-black/40 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

            {/* Silhouette Representation */}
            <div className="w-24 h-56 border-2 border-emerald-400/30 rounded-full opacity-60 flex flex-col items-center pt-2">
              <div className="w-8 h-10 border border-emerald-400/50 rounded-full mb-1" />
              <div className="w-16 h-20 border border-emerald-400/40 rounded-2xl mb-1" />
              <div className="flex gap-2">
                <div className="w-6 h-24 border border-emerald-400/30 rounded-lg" />
                <div className="w-6 h-24 border border-emerald-400/30 rounded-lg" />
              </div>
            </div>

            {/* Tap Hotspots */}
            {bodyPartsFront.map((part) => {
              const hasInjury = injuries.some((inj) => inj.part.includes(part.name.split(' ')[0]));
              return (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part.name)}
                  style={{ top: `${part.y}%`, left: `${part.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border transition-transform hover:scale-125 cursor-pointer flex items-center justify-center ${
                    hasInjury
                      ? 'bg-red-500 border-red-300 shadow-lg shadow-red-500/50 animate-pulse'
                      : 'bg-white/20 border-white/40 hover:bg-emerald-400 hover:border-emerald-300'
                  }`}
                  title={part.name}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </button>
              );
            })}
          </div>

          {selectedPart && (
            <div className="mt-3 text-xs text-center text-slate-300 bg-white/5 py-1.5 px-3 rounded-xl border border-white/10">
              ناحیه انتخاب‌شده: <strong className="text-emerald-400">{selectedPart}</strong>
            </div>
          )}
        </GlassCard>

        {/* Reported Injuries List */}
        <div className="space-y-2">
          {injuries.map((inj) => (
            <GlassCard key={inj.id} className="p-3.5 border-orange-500/30">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                  <h4 className="text-xs font-bold text-white">
                    {inj.part} ({inj.side})
                  </h4>
                </div>
                <GlassBadge
                  variant={inj.severity === 'شدید' ? 'orange' : 'cyan'}
                  size="sm"
                >
                  شدت: {inj.severity}
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{inj.note}</p>
            </GlassCard>
          ))}

          <GlassButton
            variant="glass"
            size="md"
            fullWidth
            icon={<Plus className="w-4 h-4" />}
            onClick={() => {
              if (selectedPart) {
                setInjuries([
                  ...injuries,
                  {
                    id: Date.now(),
                    part: selectedPart,
                    side: 'راست',
                    severity: 'متوسط',
                    note: 'حساسیت موضعی گزارش شده',
                  },
                ]);
              }
            }}
          >
            افزودن ناحیه حساس / آسیب‌دیده جدید
          </GlassButton>
        </div>
      </div>
    </div>
  );
};
